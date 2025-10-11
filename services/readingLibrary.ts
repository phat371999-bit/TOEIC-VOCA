import { ReadingTestData } from '../types';
import { test1Data } from './reading/test1';
import { test2Data } from './reading/test2';
import { test3Data } from './reading/test3';
import { test4Data } from './reading/test4';
import { test5Data } from './reading/test5';
import { test6Data } from './reading/test6';
import { test7Data } from './reading/test7';
import { test8Data } from './reading/test8';
import { test9Data } from './reading/test9';
import { test10Data } from './reading/test10';

export interface ReadingTestSet {
    id: number;
    title: string;
    description: string;
    parts: {
        part5: ReadingTestData;
        part6: ReadingTestData;
        part7: ReadingTestData;
    }
}

export const allReadingTests: ReadingTestSet[] = [
    { 
        id: 1, 
        title: "ETS 2024 Test 1",
        description: "Complete reading test with Part 5, 6, and 7.",
        parts: test1Data
    },
    { 
        id: 2, 
        title: "ETS 2024 Test 2",
        description: "Complete reading test with Part 5, 6, and 7.",
        parts: test2Data
    },
    { 
        id: 3, 
        title: "ETS 2024 Test 3",
        description: "Complete reading test with Part 5, 6, and 7.",
        parts: test3Data
    },
    { 
        id: 4, 
        title: "ETS 2024 Test 4",
        description: "Complete reading test with Part 5, 6, and 7.",
        parts: test4Data
    },
    { 
        id: 5, 
        title: "ETS 2024 Test 5",
        description: "Complete reading test with Part 5, 6, and 7.",
        parts: test5Data
    },
    { 
        id: 6, 
        title: "ETS 2024 Test 6",
        description: "Complete reading test with Part 5, 6, and 7.",
        parts: test6Data
    },
    { 
        id: 7, 
        title: "ETS 2024 Test 7",
        description: "Complete reading test with Part 5, 6, and 7.",
        parts: test7Data
    },
    { 
        id: 8, 
        title: "ETS 2024 Test 8",
        description: "Complete reading test with Part 5, 6, and 7.",
        parts: test8Data
    },
    { 
        id: 9, 
        title: "ETS 2024 Test 9",
        description: "Complete reading test with Part 5, 6, and 7.",
        parts: test9Data
    },
    { 
        id: 10, 
        title: "ETS 2024 Test 10",
        description: "Complete reading test with Part 5, 6, and 7.",
        parts: test10Data
    },
];


export const getReadingTest = (testId: number, part: number): ReadingTestData | null => {
    const testSet = allReadingTests.find(t => t.id === testId);
    if (!testSet) return null;
    
    switch (part) {
        case 5: return testSet.parts.part5;
        case 6: return testSet.parts.part6;
        case 7: return testSet.parts.part7;
        default: return null;
    }
}