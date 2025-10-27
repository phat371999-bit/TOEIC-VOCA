




export interface User {
    username: string;
    password?: string;
}

export enum AppState {
    PracticeHub = 'PRACTICE_HUB',
    VocabularyHome = 'VOCABULARY_HOME',
    VocabularyPartHome = 'VOCABULARY_PART_HOME',
    VocabularyTest = 'VOCABULARY_TEST',
    PronunciationHub = 'PRONUNCIATION_HUB',
    PronunciationPractice = 'PRONUNCIATION_PRACTICE',
}

// For Listening & Translation (within Vocabulary)
export interface TranslationEvaluationResult {
    score: number;
    feedback_vi: string;
}

// For Vocabulary Review (SRS)
export interface VocabularyWord {
    id: string; // The word in lowercase
    word: string; // The original word casing
    definition: string;
    srsLevel: number; // 0-8, where 0 is new
    nextReviewDate: number; // timestamp
    lastReviewedDate: number | null; // timestamp
    sourceText?: string; // a sentence where the word was found
}

// For Pre-defined Vocabulary Lists
export interface VocabItem {
    word: string;
    definition: string;
    example: string;
}

export interface VocabularyTest {
    id: number;
    title: string;
    words: VocabItem[];
}

export interface VocabularyPart {
    id: number;
    title: string;
    description: string;
    tests: VocabularyTest[];
}

// --- Unified API Configuration ---
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// In a real-world scenario, this would be set by environment variables during the build process.
// For this simulation, we'll use the hostname to decide the correct API endpoint.
export const API_BASE_URL = isDevelopment 
    ? 'http://localhost:3001' // Assumes a local backend server for development
    : 'https://your-production-api-domain.com'; // **IMPORTANT**: Replace with your actual production API domain

// --- Added missing type definitions ---

export type QuestionOption = 'A' | 'B' | 'C' | 'D';

export interface UserAnswers {
  [questionId: string]: QuestionOption | null;
}

// For TOEIC Mini-Test and Grammar Quizzes
export interface Question {
  id: number | string;
  part: number;
  image?: string;
  audioScript?: string;
  questionText: string;
  options: { [key in QuestionOption]?: string };
  correctAnswer: QuestionOption;
  explanation: string;
}

export interface TestData {
  testTitle: string;
  duration: number;
  category: 'miniTest' | 'grammar';
  questions: Question[];
}

// For Dictation
export interface DictationExercise {
    title: string;
    fullText: string;
    textWithBlanks: string;
    missingWords: string[];
}

export interface LibraryDictationExercise extends DictationExercise {
    id: number;
    audioSrc: string;
}

// For Determiner Exercise
export interface DeterminerExercise {
    paragraph: string;
    determiners: string[];
}

// For Grammar Practice
export interface GrammarTopicContent {
    title: string;
    explanation: string[];
    examples: { sentence: string; translation: string }[];
    interactiveExercise?: string;
}

export interface GrammarQuestion {
    id: string;
    questionText: string;
    options: { [key in QuestionOption]?: string };
    correctAnswer: QuestionOption;
    explanation: string;
}

// For Reading Practice
export interface ReadingQuestion {
    id: string;
    questionText: string;
    options: { [key in QuestionOption]: string };
    correctAnswer: QuestionOption;
    explanation?: string;
}

export interface ReadingPassage {
    id: string;
    text?: string;
    questions: ReadingQuestion[];
}

export interface ReadingTestData {
    id: number;
    title: string;
    part: number;
    passages: ReadingPassage[];
}

// For Speaking Practice
interface FeedbackDetail {
    english: string;
    vietnamese: string;
}

export interface SpeakingPart1EvaluationResult {
    taskScore: number;
    estimatedScoreBand: string;
    proficiencyLevel: string;
    pronunciationFeedback: {
        summary: string;
        examples: string[];
    };
    intonationAndStressFeedback: {
        summary: string;
        examples: string[];
    };
}

// For Pronunciation Practice
export interface PhonemeEvaluation {
    phoneme: string;
    accuracyScore: number; // 0.0 to 1.0
}

export interface WordPronunciationEvaluationResult {
    word: string;
    phonetic: string;
    overallScore: number; // 0 to 100
    phonemeEvaluations: PhonemeEvaluation[];
    feedback_vi: string;
}


export interface SpeakingPart2EvaluationResult {
    taskScore: number;
    estimatedScoreBand: string;
    proficiencyLevel: string;
    grammar: FeedbackDetail;
    vocabulary: FeedbackDetail;
    cohesion: FeedbackDetail;
    delivery: FeedbackDetail;
}

export interface SpeakingPart3EvaluationResult {
    taskScore: number;
    estimatedScoreBand: string;
    proficiencyLevel: string;
    generalSummary: FeedbackDetail;
    grammarAndVocab: FeedbackDetail;
    fluencyAndCohesion: FeedbackDetail;
    pronunciation: FeedbackDetail;
    responseToQ7: FeedbackDetail;
}

export interface SpeakingPart4Task {
    documentTitle: string;
    documentContent: string;
    question8: string;
    question9: string;
    question10: string;
}

export interface SpeakingPart4EvaluationResult {
    taskScore: number;
    estimatedScoreBand: string;
    proficiencyLevel: string;
    generalSummary: FeedbackDetail;
    accuracy: FeedbackDetail;
    responseToQ10: FeedbackDetail;
    languageUse: FeedbackDetail;
    delivery: FeedbackDetail;
}

export interface SpeakingPart5Scenario {
    callerName: string;
    problem: string;
}

export interface SpeakingPart5EvaluationResult {
    taskScore: number;
    estimatedScoreBand: string;
    proficiencyLevel: string;
    generalSummary: FeedbackDetail;
    solutionStructure: FeedbackDetail;
    languageUse: FeedbackDetail;
    fluencyAndCohesion: FeedbackDetail;
    intonationAndTone: FeedbackDetail;
}

// For Writing Practice
export interface WritingPart1Task {
    picture: string; // base64 image data
    keywords: [string, string];
}

export interface WritingPart1SingleEvaluation {
    score: number;
    grammar: FeedbackDetail;
    relevance: FeedbackDetail;
}

export interface WritingPart1EvaluationResult {
    totalRawScore: number;
    estimatedScoreBand: string;
    proficiencyLevel: string;
    overallSummary: FeedbackDetail;
    questionFeedback: WritingPart1SingleEvaluation[];
}

export interface WritingPart2Request {
    title: string;
    requestText: string;
}

export interface WritingPart2Task {
    question6: WritingPart2Request;
    question7: WritingPart2Request;
}

export interface WritingPart2SingleEvaluation {
    score: number;
    requestSummary: string;
    completeness: FeedbackDetail;
    languageUse: FeedbackDetail;
    organization?: FeedbackDetail;
    tone?: FeedbackDetail;
}

export interface WritingPart2EvaluationResult {
    totalRawScore: number;
    estimatedScoreBand: string;
    overallSummary: FeedbackDetail;
    question6Feedback: WritingPart2SingleEvaluation;
    question7Feedback: WritingPart2SingleEvaluation;
}

export interface WritingPart3Task {
    question: string;
}

export interface WritingPart3EvaluationResult {
    taskScore: number;
    estimatedScoreBand: string;
    overallSummary: FeedbackDetail;
    ideaDevelopment: FeedbackDetail;
    organization: FeedbackDetail;
    grammarAndSyntax: FeedbackDetail;
    vocabulary: FeedbackDetail;
}
// FIX: Added missing type definitions for Progress and Settings
export interface TestResult {
    id: string;
    title: string;
    score: number;
    total: number;
    date: number; // timestamp
}

export type ProgressCategory = 'vocabulary' | 'reading' | 'grammar' | 'listening' | 'speaking' | 'writing';

export type UserProgress = {
    [key in ProgressCategory]?: TestResult[];
};

export interface UserSettings {
    name: string;
    email: string;
    scoreTarget: string;
    examDate: string; // YYYY-MM-DD
    darkMode: boolean;
}