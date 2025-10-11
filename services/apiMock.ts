import { VocabularyWord, VocabItem } from '../types';

// Helper to create a successful JSON response
const createJsonResponse = (data: any, status = 200) => {
    return new Response(JSON.stringify(data), {
        status,
        headers: { 'Content-Type': 'application/json' },
    });
};

// Use localStorage as a simple key-value database
const db = {
    getItem: (key: string) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error(`[API MOCK] Error reading from localStorage key "${key}":`, error);
            return null;
        }
    },
    setItem: (key: string, value: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`[API MOCK] Error writing to localStorage key "${key}":`, error);
        }
    },
    removeItem: (key: string) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`[API MOCK] Error removing from localStorage key "${key}":`, error);
        }
    }
};

const originalFetch = window.fetch;

export const mockFetch = async (url: RequestInfo | URL, config?: RequestInit): Promise<Response> => {
    const urlString = url.toString();
    const method = config?.method?.toUpperCase() || 'GET';
    const body = config?.body ? JSON.parse(config.body as string) : {};
    
    console.log(`[API MOCK] Intercepted ${method} ${urlString}`);

    // --- Vocabulary API ---
    const vocabListMatch = urlString.match(/\/api\/vocabulary\/([a-zA-Z0-9_.@-]*)$/);
    if (vocabListMatch && method === 'GET') {
        const username = vocabListMatch[1];
        const vocabList: VocabularyWord[] = db.getItem(`vocabulary_${username}`) || [];
        return createJsonResponse(vocabList);
    }
    
    const vocabWordMatch = urlString.match(/\/api\/vocabulary\/word\/(.*)$/);
    if (vocabWordMatch && method === 'DELETE') {
        const { username } = body;
        const wordId = decodeURIComponent(vocabWordMatch[1]);
        let vocabList: VocabularyWord[] = db.getItem(`vocabulary_${username}`) || [];
        vocabList = vocabList.filter(w => w.id !== wordId);
        db.setItem(`vocabulary_${username}`, vocabList);
        return createJsonResponse({ message: 'Word deleted' });
    }

    if (urlString.endsWith('/api/vocabulary/word') && method === 'POST') {
        const { username, word } = body as { username: string, word: VocabularyWord };
        let vocabList: VocabularyWord[] = db.getItem(`vocabulary_${username}`) || [];
        const existingIndex = vocabList.findIndex(w => w.id === word.id);
        if (existingIndex > -1) {
            vocabList[existingIndex] = word; // Update
        } else {
            vocabList.unshift(word); // Add new
        }
        db.setItem(`vocabulary_${username}`, vocabList);
        return createJsonResponse(word);
    }
    
    if (urlString.endsWith('/api/vocabulary/srs') && method === 'POST') {
        const { username, wordId, performance, wordDetails, source } = body as { username: string, wordId: string, performance: 'hard' | 'good' | 'easy', wordDetails?: VocabItem, source?: string };
        let vocabList: VocabularyWord[] = db.getItem(`vocabulary_${username}`) || [];
        let wordIndex = vocabList.findIndex(w => w.id === wordId);
        
        let word: VocabularyWord;
        if (wordIndex > -1) {
            word = vocabList[wordIndex];
        } else if (wordDetails) {
             // Create new word if it doesn't exist
             word = {
                id: wordId,
                word: wordDetails.word,
                definition: wordDetails.definition,
                srsLevel: 0,
                nextReviewDate: Date.now(),
                lastReviewedDate: null,
                sourceText: source
             };
             vocabList.unshift(word);
             wordIndex = 0;
        } else {
             return createJsonResponse({ error: 'Word not found and no details to create it' }, 404);
        }

        // Simulate SRS logic
        let newLevel = word.srsLevel;
        if (performance === 'easy') newLevel = Math.min(8, newLevel + 2);
        else if (performance === 'good') newLevel = Math.min(8, newLevel + 1);
        else if (performance === 'hard') newLevel = Math.max(0, newLevel - 1);

        const srsIntervals = [0, 1, 2, 4, 8, 15, 30, 60, 120]; // days
        const nextReview = new Date();
        nextReview.setDate(nextReview.getDate() + srsIntervals[newLevel]);

        word.srsLevel = newLevel;
        word.nextReviewDate = nextReview.getTime();
        word.lastReviewedDate = Date.now();
        
        if (wordIndex > -1) {
            vocabList[wordIndex] = word;
        }
        
        db.setItem(`vocabulary_${username}`, vocabList);
        return createJsonResponse(word);
    }
    
    // Fallback for unmocked routes (like loading external scripts)
    console.log(`[API MOCK] Unhandled route: ${method} ${urlString}. Calling original fetch.`);
    return originalFetch(url, config);
};