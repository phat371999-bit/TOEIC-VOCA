// FIX: Imported LibraryDictationExercise type.
import { LibraryDictationExercise } from '../types';
import { dictationTest1Data } from './dictation/dictationTest1';
import { dictationTest2Data } from './dictation/dictationTest2';
import { dictationTest3Data } from './dictation/dictationTest3';
import { dictationTest4Data } from './dictation/dictationTest4';
import { dictationTest5Data } from './dictation/dictationTest5';
import { dictationTest6Data } from './dictation/dictationTest6';
import { dictationTest7Data } from './dictation/dictationTest7';
import { dictationTest8Data } from './dictation/dictationTest8';
import { dictationTest9Data } from './dictation/dictationTest9';
import { dictationTest10Data } from './dictation/dictationTest10';

export interface DictationTestSet {
    id: number;
    title: string;
    description: string;
    parts: {
        part1: LibraryDictationExercise[];
        part2: LibraryDictationExercise[];
        part3: LibraryDictationExercise[];
        part4: LibraryDictationExercise[];
    }
}

export const allDictationTests: DictationTestSet[] = [
    {
        id: 1,
        title: `ETS 2024 Test 1`,
        description: "Complete dictation test with Part 1, 2, 3, and 4.",
        parts: dictationTest1Data
    },
    {
        id: 2,
        title: `ETS 2024 Test 2`,
        description: "Complete dictation test with Part 1, 2, 3, and 4.",
        parts: dictationTest2Data
    },
    {
        id: 3,
        title: `ETS 2024 Test 3`,
        description: "Complete dictation test with Part 1, 2, 3, and 4.",
        parts: dictationTest3Data
    },
    {
        id: 4,
        title: `ETS 2024 Test 4`,
        description: "Complete dictation test with Part 1, 2, 3, and 4.",
        parts: dictationTest4Data
    },
    {
        id: 5,
        title: `ETS 2024 Test 5`,
        description: "Complete dictation test with Part 1, 2, 3, and 4.",
        parts: dictationTest5Data
    },
    {
        id: 6,
        title: `ETS 2024 Test 6`,
        description: "Complete dictation test with Part 1, 2, 3, and 4.",
        parts: dictationTest6Data
    },
    {
        id: 7,
        title: `ETS 2024 Test 7`,
        description: "Complete dictation test with Part 1, 2, 3, and 4.",
        parts: dictationTest7Data
    },
    {
        id: 8,
        title: `ETS 2024 Test 8`,
        description: "Complete dictation test with Part 1, 2, 3, and 4.",
        parts: dictationTest8Data
    },
    {
        id: 9,
        title: `ETS 2024 Test 9`,
        description: "Complete dictation test with Part 1, 2, 3, and 4.",
        parts: dictationTest9Data
    },
    {
        id: 10,
        title: `ETS 2024 Test 10`,
        description: "Complete dictation test with Part 1, 2, 3, and 4.",
        parts: dictationTest10Data
    },
];

export const getDictationExercisesForParts = (testId: number, parts: number[]): LibraryDictationExercise[] => {
    const testSet = allDictationTests.find(t => t.id === testId);
    if (!testSet) return [];

    let exercises: LibraryDictationExercise[] = [];
    if (parts.includes(1)) exercises = exercises.concat(testSet.parts.part1);
    if (parts.includes(2)) exercises = exercises.concat(testSet.parts.part2);
    if (parts.includes(3)) exercises = exercises.concat(testSet.parts.part3);
    if (parts.includes(4)) exercises = exercises.concat(testSet.parts.part4);
    
    return exercises;
}
