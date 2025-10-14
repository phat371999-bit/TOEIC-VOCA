import { VocabularyPart, VocabularyTest, VocabItem } from '../types';
import { listeningPart1Vocabulary } from './vocabulary/listeningPart1Vocabulary';
import { listeningComprehensiveVocabulary } from './vocabulary/listeningComprehensiveVocabulary';
import { readingPart7Vocabulary } from './vocabulary/readingPart7Vocabulary';
import { readingComprehensiveVocabulary } from './vocabulary/readingVoca';

let allWordsCache: string[] | null = null;

export const vocabularyData: VocabularyPart[] = [
    listeningPart1Vocabulary,
    listeningComprehensiveVocabulary,
    readingPart7Vocabulary,
    readingComprehensiveVocabulary
];

export const getVocabularyPart = (partId: number): VocabularyPart | null => {
    return vocabularyData.find(part => part.id === partId) || null;
}

export const getVocabularyTest = (partId: number, testId: number): VocabularyTest | null => {
    const part = getVocabularyPart(partId);
    return part?.tests.find(test => test.id === testId) || null;
}

function getAllWords(): string[] {
    if (allWordsCache) return allWordsCache;

    const words = new Set<string>();
    vocabularyData.forEach(part => {
        part.tests.forEach(test => {
            test.words.forEach(vocabItem => {
                words.add(vocabItem.word);
            });
        });
    });
    allWordsCache = Array.from(words);
    return allWordsCache;
}

export function getRandomVocabularyWords(count: number): string[] {
    const allWords = getAllWords();
    if (allWords.length === 0) return [];
    const shuffled = allWords.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}