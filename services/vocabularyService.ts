
import { VocabularyWord, VocabItem, API_BASE_URL } from '../types';
import { mockFetch } from './apiMock';

/*
--- BACKEND API NOTE ---
The backend should handle CRUD operations for a user's vocabulary list.

Example Database Schema (Vocabulary):
- id (PK)
- user_id (FK to users table)
- word_id (string, unique per user)
- word (string)
- definition (string)
- srsLevel (integer)
- nextReviewDate (timestamp)
- lastReviewedDate (timestamp, nullable)
- sourceText (string, nullable)

API Endpoints:
- GET /api/vocabulary/:username -> Returns all vocabulary words for a user.
- POST /api/vocabulary/word -> Adds or updates a word.
- DELETE /api/vocabulary/word/:wordId -> Deletes a word.
- POST /api/vocabulary/srs -> Updates a word's SRS level based on performance. Backend handles the logic.
*/

const getAuthToken = (): string | null => {
    // No login, return a dummy token for mock API
    return 'dummy-token-for-guest';
}

function getCurrentUsername(): string | null {
    // No login, so we use a default guest username.
    return 'Guest';
}

export const getVocabularyList = async (): Promise<VocabularyWord[]> => {
    const username = getCurrentUsername();
    const token = getAuthToken();
    if (!username || !token) return [];

    try {
        console.log(`[CLIENT] Fetching vocabulary for ${username}`);
        const response = await mockFetch(`${API_BASE_URL}/api/vocabulary/${username}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error("[CLIENT] Network error fetching vocabulary. This is expected in a simulated environment. Returning empty list.", error);
        return [];
    }
};

export const addOrUpdateVocabularyWord = async (word: VocabularyWord): Promise<void> => {
    const username = getCurrentUsername();
    const token = getAuthToken();
    if (!username || !token) return;

    try {
        console.log(`[CLIENT] Saving word "${word.word}" for ${username}`);
        await mockFetch(`${API_BASE_URL}/api/vocabulary/word`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username, word })
        });
    } catch (error) {
        console.error("[CLIENT] Network error saving word. This is expected in a simulated environment.", error);
    }
};

export const deleteVocabularyWord = async (wordId: string): Promise<void> => {
    const username = getCurrentUsername();
    const token = getAuthToken();
    if (!username || !token) return;

    try {
        console.log(`[CLIENT] Deleting word ID "${wordId}" for ${username}`);
        await mockFetch(`${API_BASE_URL}/api/vocabulary/word/${encodeURIComponent(wordId)}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ username }) // Send username for backend authorization
        });
    } catch (error) {
        console.error("[CLIENT] Network error deleting word. This is expected in a simulated environment.", error);
    }
};

export const updateWordSrsLevel = async (wordId: string, performance: 'hard' | 'good' | 'easy', wordDetails?: VocabItem, source?: string): Promise<VocabularyWord | null> => {
    const username = getCurrentUsername();
    const token = getAuthToken();
    if (!username || !token) return null;

    try {
        console.log(`[CLIENT] Updating SRS for word ID "${wordId}" for ${username} with performance: ${performance}`);
        const response = await mockFetch(`${API_BASE_URL}/api/vocabulary/srs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            // The backend will handle the SRS logic (calculating new level, next review date, etc.)
            // It also handles creating the word if it doesn't exist.
            body: JSON.stringify({ username, wordId, performance, wordDetails, source })
        });
        if (!response.ok) throw new Error(`API Error: ${response.status}`);
        return await response.json(); // Backend should return the updated word
    } catch (error) {
        console.error("[CLIENT] Network error updating SRS level. This is expected in a simulated environment.", error);
        return null;
    }
};

// This client-side function is kept for filtering already-fetched data in the UI.
export const getWordsForReview = (allWords: VocabularyWord[]): VocabularyWord[] => {
    const now = new Date();
    now.setHours(23, 59, 59, 999); // End of today
    return allWords.filter(w => w.nextReviewDate <= now.getTime());
};
