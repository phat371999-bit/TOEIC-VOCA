


import { GoogleGenAI, Type } from "@google/genai";
import { 
    DictationExercise, 
    TestData, 
    SpeakingPart1EvaluationResult, 
    SpeakingPart2EvaluationResult, 
    SpeakingPart3EvaluationResult, 
    SpeakingPart4Task, 
    SpeakingPart4EvaluationResult, 
    SpeakingPart5Scenario, 
    SpeakingPart5EvaluationResult, 
    WritingPart1Task, 
    WritingPart1EvaluationResult, 
    WritingPart2Task, 
    WritingPart2EvaluationResult, 
    WritingPart3Task, 
    WritingPart3EvaluationResult, 
    DeterminerExercise,
    TranslationEvaluationResult,
    VocabItem,
    WordPronunciationEvaluationResult
} from '../types';
import { getRandomVocabularyWords } from './vocabularyLibrary';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Interface for the structured response from the speaking evaluation AI
export interface SpeakingEvaluationResult {
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

const dictationSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: 'A short, engaging title for the dictation exercise.' },
        fullText: { type: Type.STRING, description: 'A complete paragraph of about 3-5 sentences, suitable for intermediate English learners.' },
        textWithBlanks: { type: Type.STRING, description: "The same paragraph but with 5-7 key words replaced by '____'." },
        missingWords: {
            type: Type.ARRAY,
            description: 'An array of strings containing the words that were replaced by blanks, in the order they appear.',
            items: { type: Type.STRING }
        }
    },
    required: ['title', 'fullText', 'textWithBlanks', 'missingWords']
};

export const generateDictationExercise = async (): Promise<DictationExercise | null> => {
    try {
        const prompt = `
            You are an English teacher creating a dictation exercise. Generate one exercise in JSON format according to the provided schema.

            Instructions:
            1. Create a short, interesting title.
            2. Write a paragraph of 3-5 sentences on a common topic (e.g., travel, technology, daily life). The language should be clear and at an intermediate level.
            3. From that paragraph, create a version where you replace 5 to 7 important words (nouns, verbs, adjectives) with '____'.
            4. Create a list of the missing words in the exact order they appear in the paragraph.
            5. Ensure the number of '____' placeholders in 'textWithBlanks' exactly matches the number of words in the 'missingWords' array.
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: dictationSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.fullText && data.missingWords && data.missingWords.length > 0) {
            return data as DictationExercise;
        }
        return null;
    } catch (error) {
        console.error("Error generating dictation exercise:", error);
        throw new Error("Failed to generate dictation from API.");
    }
};

export const generateDictationFromUserInput = async (topic: string): Promise<DictationExercise | null> => {
    try {
        const prompt = `
            You are an English teacher creating a dictation exercise based on a user's topic.
            The topic is: "${topic}".
            Generate a short, original text of about 100-150 words related to this topic.
            The language should be clear and at an intermediate level, suitable for a dictation exercise.
            Based on this text, generate the exercise in JSON format according to the provided schema.

            Instructions:
            1. Create a short, engaging title related to the topic.
            2. Write the full text (100-150 words).
            3. Create a version of the text with 15-20% of the important words (nouns, verbs, adjectives) replaced by '____'.
            4. Create a list of the missing words in the exact order they appear.
            5. Ensure the number of '____' placeholders exactly matches the number of words in the 'missingWords' array.
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: dictationSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.fullText && data.missingWords && data.missingWords.length > 0) {
            return data as DictationExercise;
        }
        return null;
    } catch (error) {
        console.error("Error generating custom dictation exercise:", error);
        throw new Error("Failed to generate custom dictation from API.");
    }
};

const grammarTestSchema = {
    type: Type.OBJECT,
    properties: {
        testTitle: { type: Type.STRING, description: 'A creative title for this mini-test, e.g., "TOEIC Mini-Test: Business Scenarios".' },
        duration: { type: Type.INTEGER, description: 'The total test duration in seconds. Assume 75 seconds per question.' },
        category: { type: Type.STRING, description: "The category of the test. Use 'miniTest' for TOEIC tests or 'grammar' for grammar quizzes." },
        questions: {
            type: Type.ARRAY,
            description: 'An array of question objects.',
            items: {
                type: Type.OBJECT,
                properties: {
                    id: { type: Type.INTEGER, description: 'A unique integer ID for the question, starting from 101.' },
                    part: { type: Type.INTEGER, description: 'The TOEIC part number (e.g., 1, 2, 5, 6, 7).' },
                    questionText: { type: Type.STRING, description: 'The main text of the question. For fill-in-the-blanks, use "____".' },
                    options: {
                        type: Type.OBJECT,
                        properties: {
                            A: { type: Type.STRING },
                            B: { type: Type.STRING },
                            C: { type: Type.STRING },
                            D: { type: Type.STRING },
                        },
                        required: ['A', 'B', 'C', 'D']
                    },
                    correctAnswer: { type: Type.STRING, description: "The correct option key ('A', 'B', 'C', or 'D')." },
                    explanation: { type: Type.STRING, description: 'A brief explanation of why the correct answer is right.' },
                },
                required: ['id', 'part', 'questionText', 'options', 'correctAnswer', 'explanation']
            }
        }
    },
    required: ['testTitle', 'duration', 'category', 'questions']
};

// FIX: Add the missing generateTOEICMiniTest function.
export const generateTOEICMiniTest = async (): Promise<TestData | null> => {
    try {
        const prompt = `
            You are an expert TOEIC test creator. Generate a mini-test in JSON format according to the provided schema.

            Instructions:
            1.  Create a test with exactly 10 multiple-choice questions.
            2.  The questions must be original and should be similar to TOEIC Part 5 (Incomplete Sentences), testing a mix of grammar and vocabulary.
            3.  The questions must be contextual sentences with a blank (____).
            4.  For each question, provide a unique integer ID, starting from 101.
            5.  For the 'part' property of each question, use the number 5.
            6.  Ensure all fields in the schema are filled correctly.
            7.  Provide a clear and concise explanation for each correct answer.
            8.  Set the 'testTitle' to "AI-Generated TOEIC Mini-Test".
            9.  Set the 'duration' to 750 seconds (10 questions * 75 seconds).
            10. Set the 'category' field to "miniTest".
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: grammarTestSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.questions && data.questions.length > 0) {
            return data as TestData;
        }
        return null;
    } catch (error) {
        console.error("Error generating TOEIC mini-test:", error);
        throw new Error("Failed to generate mini-test from API.");
    }
};


export const generateRandomGrammarQuiz = async (): Promise<TestData | null> => {
    const grammarTopics = [
        "Nouns & Noun Phrases",
        "Verbs (Tenses, Voice, Mood)",
        "Adjectives",
        "Adverbs",
        "Prepositions & Conjunctions",
        "Determiners",
        "Pronouns",
        "Relative Clauses",
        "Noun Clauses",
        "Inversions",
        "Comparisons",
        "Conditionals"
    ];

    try {
        const prompt = `
            You are an expert English grammar teacher creating a quiz for TOEIC students. Generate a random grammar quiz in JSON format according to the provided schema.

            Instructions:
            1.  Create a test with exactly 20 multiple-choice questions.
            2.  The questions must be original and should NOT be simple definitions. They must be contextual sentences with a blank, testing the student's ability to choose the correct grammatical form.
            3.  The questions must cover a wide and random variety of grammar topics relevant to the TOEIC test, such as: ${grammarTopics.join(', ')}.
            4.  For each question, provide a unique integer ID, starting from 1.
            5.  For the 'part' property of each question, use the number 5.
            6.  Ensure all fields in the schema are filled correctly.
            7.  Provide a clear and concise explanation for each correct answer, explaining the grammar rule.
            8.  Set the 'testTitle' to "Random Grammar Review Quiz".
            9.  Set the 'duration' to 1500 seconds (20 questions * 75 seconds).
            10. Set the 'category' field to "grammar".
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: grammarTestSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.questions && data.questions.length === 20) {
            return data as TestData;
        }
        return null;
    } catch (error) {
        console.error("Error generating random grammar quiz:", error);
        throw new Error("Failed to generate grammar quiz from API.");
    }
};

const determinerExerciseSchema = {
    type: Type.OBJECT,
    properties: {
        paragraph: { type: Type.STRING, description: "A short English paragraph of about 50-70 words on a simple, common topic." },
        determiners: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "An array of all the determiner words found in the paragraph, in lowercase."
        }
    },
    required: ['paragraph', 'determiners']
};


export const generateDeterminerExercise = async (): Promise<DeterminerExercise | null> => {
    try {
        const prompt = `Generate a short English paragraph (about 50-70 words) on a simple topic like daily routines, hobbies, or work. Identify ALL determiners in the paragraph. Determiners include articles (a, an, the), demonstratives (this, that, these, those), possessives (my, your, his, her, its, our, their), quantifiers (some, any, many, few, several, all), and numbers (one, two). Return a JSON object with two keys: "paragraph" containing the text, and "determiners" containing an array of all the identified determiner words in lowercase.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: determinerExerciseSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.paragraph && Array.isArray(data.determiners)) {
            data.determiners = [...new Set(data.determiners)];
            return data as DeterminerExercise;
        }
        return null;
    } catch (error) {
        console.error("Error generating determiner exercise:", error);
        throw new Error("Failed to generate exercise from API.");
    }
};

const translationEvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        score: { 
            type: Type.INTEGER,
            description: "A score from 0 to 100 evaluating the translation's accuracy, grammar, and naturalness. 100 is a perfect translation."
        },
        feedback_vi: { 
            type: Type.STRING,
            description: "Concise feedback in Vietnamese explaining what is good about the translation and what could be improved. Mention grammar, vocabulary choice, and natural phrasing."
        }
    },
    required: ['score', 'feedback_vi']
};

export const evaluateTranslation = async (originalSentence: string, userTranslation: string): Promise<TranslationEvaluationResult | null> => {
    try {
        const prompt = `
            You are an expert English to Vietnamese translator and teacher.
            The user was given the following English sentence to translate: "${originalSentence}"
            The user provided this Vietnamese translation: "${userTranslation}"

            Please evaluate the user's translation.
            1.  Assign a score from 0 to 100 based on accuracy, grammar, and naturalness.
            2.  Provide brief, constructive feedback in Vietnamese. Point out strengths and areas for improvement.

            Return the evaluation in JSON format according to the schema.
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: translationEvaluationSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.score === 'number' && typeof data.feedback_vi === 'string') {
            return data as TranslationEvaluationResult;
        }
        return null;
    } catch (error) {
        console.error("Error evaluating translation:", error);
        throw new Error("Failed to get translation evaluation from API.");
    }
};

export const generateSentenceForTranslation = async (vocabList?: VocabItem[]): Promise<string | null> => {
    try {
        let vocabPrompt = '';
        if (vocabList && vocabList.length > 0) {
            const words = vocabList.map(v => v.word).join(', ');
            vocabPrompt = `The sentence MUST include at least one of the following words: ${words}.`;
        }

        const prompt = `
            You are an English teacher creating a practice sentence for an intermediate-level student to translate into Vietnamese.
            Generate a single, clear, and natural-sounding English sentence.
            The sentence should be between 10 and 20 words long.
            The topic should be about business, daily life, or technology.
            ${vocabPrompt}
            Provide only the sentence itself, without any quotation marks or introductory phrases.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const text = response.text.trim();
        return text || null;

    } catch (error) {
        console.error("Error generating sentence for translation:", error);
        throw new Error("Failed to generate sentence from API.");
    }
};

export const getWordDefinition = async (word: string, contextSentence: string = ''): Promise<string | null> => {
    try {
        const prompt = `
            Provide a simple, clear definition for the English word "${word}". 
            If a context sentence is provided, use it to determine the most relevant definition.
            Context sentence: "${contextSentence}"
            
            The definition should be concise and easy for an intermediate English learner to understand. 
            Do not include the word itself in the definition.
            Provide only the definition as a single string, without any introductory phrases like "The definition is:".
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const definition = response.text.trim();
        return definition || null;

    } catch (error) {
        console.error(`Error generating definition for "${word}":`, error);
        return "Could not retrieve definition at this time.";
    }
};

const wordWithPhoneticSchema = {
    type: Type.ARRAY,
    items: {
        type: Type.OBJECT,
        properties: {
            word: { type: Type.STRING, description: "A common English word suitable for B1-B2 level pronunciation practice." },
            phonetic: { type: Type.STRING, description: "The word's International Phonetic Alphabet (IPA) transcription in American English." }
        },
        required: ['word', 'phonetic']
    }
};

export const generateRandomWordsWithPhonetics = async (count: number): Promise<{ word: string; phonetic: string; }[] | null> => {
    try {
        const prompt = `Generate a JSON array of ${count} common English words for pronunciation practice (B1-B2 level). Provide each word and its American English IPA transcription. The words should cover a variety of different phonemes.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: wordWithPhoneticSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);
        if (data && Array.isArray(data) && data.length === count) {
            return data;
        }
        return null;
    } catch (error) {
        console.error("Error generating random words with phonetics:", error);
        throw new Error("Failed to generate words from API.");
    }
};

const phonemeEvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        phoneme: { type: Type.STRING, description: "A single phoneme from the IPA transcription." },
        accuracyScore: { type: Type.NUMBER, description: "An accuracy score from 0.0 to 1.0 for this specific phoneme." }
    },
    required: ['phoneme', 'accuracyScore']
};

const pronunciationEvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        word: { type: Type.STRING, description: "The original word being evaluated." },
        phonetic: { type: Type.STRING, description: "The original IPA transcription." },
        overallScore: { type: Type.INTEGER, description: "An overall score from 0 to 100 for the pronunciation of the entire word." },
        phonemeEvaluations: {
            type: Type.ARRAY,
            description: "A breakdown of accuracy for each phoneme.",
            items: phonemeEvaluationSchema
        },
        feedback_vi: { type: Type.STRING, description: "Concise, helpful feedback in Vietnamese, pointing out specific phonemes to improve if necessary. Example: 'Âm /s/ của bạn hơi giống /z/. Hãy thử đặt lưỡi gần răng hơn.'" }
    },
    required: ['word', 'phonetic', 'overallScore', 'phonemeEvaluations', 'feedback_vi']
};

export const evaluateWordPronunciation = async (word: string, phonetic: string, audioBase64: string, mimeType: string): Promise<WordPronunciationEvaluationResult | null> => {
    try {
        const systemInstruction = `You are an expert American English pronunciation evaluator. You will be provided with an English word, its IPA transcription, and an audio file of a user pronouncing it. Your task is to analyze the audio and provide a detailed evaluation in JSON format according to the schema.
1.  Provide an overall score from 0 to 100.
2.  Break down the IPA transcription into individual phonemes and provide an accuracy score from 0.0 to 1.0 for each one.
3.  Provide concise, helpful feedback in Vietnamese, identifying specific phonemes that need improvement.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    { text: `Evaluate my pronunciation of the word "${word}", which has the IPA transcription "${phonetic}".` },
                    { inlineData: { mimeType: mimeType, data: audioBase64 } }
                ]
            },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: pronunciationEvaluationSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.overallScore === 'number') {
            return data as WordPronunciationEvaluationResult;
        }

        return null;

    } catch (error) {
        console.error(`Error evaluating pronunciation for "${word}":`, error);
        throw new Error("Failed to get pronunciation evaluation from API.");
    }
};

const speakingEvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER, description: "The raw score from 0 to 3." },
        estimatedScoreBand: { type: Type.STRING, description: "The estimated TOEIC Scale Score Range (e.g., '160-180')." },
        proficiencyLevel: { type: Type.STRING, description: "The corresponding TOEIC Proficiency Level (e.g., 'Level 7')." },
        pronunciationFeedback: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "A summary of strengths and weaknesses for Pronunciation." },
                examples: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific examples of words/phrases with accurate or inaccurate pronunciation." }
            },
            required: ['summary', 'examples']
        },
        intonationAndStressFeedback: {
            type: Type.OBJECT,
            properties: {
                summary: { type: Type.STRING, description: "A summary of strengths and weaknesses for Intonation and Stress." },
                examples: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Specific examples of words/phrases with accurate or inaccurate intonation/stress." }
            },
            required: ['summary', 'examples']
        }
    },
    required: ['taskScore', 'estimatedScoreBand', 'proficiencyLevel', 'pronunciationFeedback', 'intonationAndStressFeedback']
};


export const evaluateSpeakingPart1 = async (textToRead: string, audioBase64: string, mimeType: string): Promise<SpeakingPart1EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified rater for the TOEIC Speaking Test, specializing in "Part 1: Read a Text Aloud". Your task is to evaluate a user's spoken audio based on the provided text. You will receive the original text and the user's audio recording.

Your evaluation must focus *exclusively* on these two criteria:
1.  **Pronunciation:** Clarity, intelligibility, and accuracy of individual words and sounds.
2.  **Intonation and Stress:** Appropriate use of pitch, emphasis (stress), and pausing to convey meaning (e.g., rising and falling pitch).

Based on your evaluation, you must provide a structured JSON response.

**Step 1: Assign a Task Score (0-3 Scale)**
Rate the performance based on the degree of intelligibility and effectiveness:
- **3 (Highest):** Speech is highly intelligible. Pronunciation and intonation/stress are highly effective.
- **2 (Medium):** Speech is generally intelligible with some lapses. Intonation and stress are generally effective.
- **1 (Low):** Speech is not generally intelligible. Use of intonation and stress is generally not effective.
- **0:** No intelligible speech or no attempt.

**Step 2: Estimate Overall Score Band and Proficiency Level**
Use the Task Score from Step 1 and the detailed rubric below to estimate an overall TOEIC Speaking Scale Score and Proficiency Level. Your estimation should reflect how a performance on this single task might correlate to an overall proficiency.

- **Level 8 (190-200):** Pronunciation, intonation, and stress are at all times highly intelligible. (Correlates with a strong Task Score of 3).
- **Level 7 (160-180):** When reading aloud, test takers are highly intelligible. (Correlates with a solid Task Score of 3).
- **Level 6 (130-150):** When reading aloud, test takers are intelligible. (Correlates with a strong Task Score of 2).
- **Level 5 (110-120):** When reading aloud, test takers are generally intelligible. (Correlates with a standard Task Score of 2).
- **Level 4 (80-100):** When reading aloud, test takers vary in intelligibility. (Correlates with a Task Score of 1).
- **Level 3 (60-70):** When reading aloud, speakers may be difficult to understand. (Correlates with a low Task Score of 1).
- **Levels 1-2 (0-50):** Correlates with a Task Score of 0.

**Step 3: Provide Detailed Feedback**
- For **Pronunciation**, provide a summary of strengths and weaknesses. Include specific examples of words or phrases that were pronounced well or poorly.
- For **Intonation and Stress**, provide a summary of strengths and weaknesses. Include specific examples of where stress or pausing was effective or ineffective.

Your final output must be a JSON object adhering to the provided schema. Do not add any extra text or explanations outside the JSON structure.
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    { text: `Evaluate my speech. Here is the text I was supposed to read: "${textToRead}"` },
                    { inlineData: { mimeType: mimeType, data: audioBase64 } }
                ]
            },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: speakingEvaluationSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.taskScore === 'number') {
            return data as SpeakingPart1EvaluationResult;
        }

        return null;

    } catch (error) {
        console.error("Error evaluating speaking performance:", error);
        throw new Error("Failed to get evaluation from API.");
    }
}

export const generateSpeakingPart1Text = async (): Promise<string | null> => {
    try {
        const prompt = `
            Generate a short text suitable for a TOEIC Speaking Test Part 1 (Read a Text Aloud) practice.
            The text should be between 40 and 60 words.
            It should be a formal announcement, like one you might hear at an airport, a train station, a store, an office, or a museum.
            The topic should be common and easy to understand.
            Provide only the text itself, without any introductory phrases, titles, or quotation marks.
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const text = response.text.trim();
        return text || null;

    } catch (error) {
        console.error("Error generating speaking practice text:", error);
        throw new Error("Failed to generate text from API.");
    }
};

const speakingPart2Schema = {
    type: Type.OBJECT,
    properties: {
      taskScore: { type: Type.INTEGER, description: "The raw score from 0 to 3 based on the overall quality of the description." },
      estimatedScoreBand: { type: Type.STRING, description: "The estimated TOEIC Speaking Scale Score Range (e.g., '110-120')." },
      proficiencyLevel: { type: Type.STRING, description: "The corresponding TOEIC Proficiency Level (e.g., 'Level 5')." },
      grammar: {
        type: Type.OBJECT,
        properties: {
          english: { type: Type.STRING, description: "Feedback on grammar in English. Comment on accuracy, range, and complexity of sentences." },
          vietnamese: { type: Type.STRING, description: "Feedback on grammar in Vietnamese (Ngữ pháp)." }
        },
        required: ['english', 'vietnamese']
      },
      vocabulary: {
        type: Type.OBJECT,
        properties: {
          english: { type: Type.STRING, description: "Feedback on vocabulary in English. Comment on appropriate, accurate, and varied word choice." },
          vietnamese: { type: Type.STRING, description: "Feedback on vocabulary in Vietnamese (Từ vựng)." }
        },
        required: ['english', 'vietnamese']
      },
      cohesion: {
        type: Type.OBJECT,
        properties: {
          english: { type: Type.STRING, description: "Feedback on cohesion in English. Comment on logical organization and flow." },
          vietnamese: { type: Type.STRING, description: "Feedback on cohesion in Vietnamese (Tính mạch lạc)." }
        },
        required: ['english', 'vietnamese']
      },
      delivery: {
        type: Type.OBJECT,
        properties: {
          english: { type: Type.STRING, description: "Feedback on delivery (pronunciation, intonation, and stress) in English." },
          vietnamese: { type: Type.STRING, description: "Feedback on delivery in Vietnamese (Phát âm, Ngữ điệu và Trọng âm)." }
        },
        required: ['english', 'vietnamese']
      }
    },
    required: ['taskScore', 'estimatedScoreBand', 'proficiencyLevel', 'grammar', 'vocabulary', 'cohesion', 'delivery']
};

export const generateImageForSpeakingPart2 = async (): Promise<string | null> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `A high-quality, realistic photograph suitable for a TOEIC Speaking Test Part 2 (Describe a picture). 
            The image should depict a common scene in a work, daily life, or public setting. 
            Examples: people working in an office, a person shopping at an outdoor market, a family having a meal, people waiting at an airport terminal. 
            The image must have a clear central action and various background details to allow for a detailed description. 
            Avoid text, logos, or abstract elements.`,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '4:3',
            },
        });
        
        const base64ImageBytes: string | undefined = response.generatedImages?.[0]?.image?.imageBytes;
        
        if (base64ImageBytes) {
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        return null;
    } catch (error) {
        console.error("Error generating image for Speaking Part 2:", error);
        throw new Error("Failed to generate image from API.");
    }
};

export const evaluateSpeakingPart2 = async (audioBase64: string, mimeType: string): Promise<SpeakingPart2EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified rater for the TOEIC Speaking Test, specializing in "Part 2: Describe a Picture". Your task is to evaluate a user's spoken audio description of a picture. You will receive only the user's audio recording.

Your evaluation must be based on the official criteria for this task:
1.  **Grammar:** Accuracy, range, and complexity of sentence structures.
2.  **Vocabulary:** Appropriate, accurate, and varied word choice to describe the scene, objects, and actions.
3.  **Cohesion:** Logical organization, smooth transitions between sentences, and the overall flow of the description.
4.  **Delivery:** Pronunciation (clarity, intelligibility), Intonation, and Stress (appropriate use of pitch, emphasis, and pausing).

Based on your evaluation, you must provide a structured JSON response.

**Step 1: Assign a Task Score (0-3 Scale)**
- **3 (Highest):** Speech is highly intelligible and relevant to the picture. Description is well-organized, uses a range of grammar and vocabulary.
- **2 (Medium):** Speech is generally intelligible. Description is relevant but may have some limitations in organization, grammar, or vocabulary.
- **1 (Low):** Speech is not generally intelligible. Description is very limited or irrelevant.
- **0:** No intelligible speech or no attempt.

**Step 2: Estimate Overall Score Band and Proficiency Level**
Use the Task Score to estimate an overall TOEIC Speaking Scale Score and Proficiency Level.
- **Level 8 (190-200):** Strong Task Score of 3.
- **Level 7 (160-180):** Solid Task Score of 3.
- **Level 6 (130-150):** Strong Task Score of 2.
- **Level 5 (110-120):** Standard Task Score of 2.
- **Level 4 (80-100):** Task Score of 1.
- **Level 3 (60-70):** Low Task Score of 1.
- **Levels 1-2 (0-50):** Task Score of 0.

**Step 3: Provide Detailed Feedback in both English and Vietnamese**
For each criterion (Grammar, Vocabulary, Cohesion, Delivery), provide constructive feedback in English and a concise Vietnamese translation.
- **Grammar (Ngữ pháp):** Comment on accuracy, range, and complexity.
- **Vocabulary (Từ vựng):** Comment on appropriate, accurate, and varied word choice.
- **Cohesion (Tính mạch lạc):** Comment on logical organization and flow.
- **Delivery (Phát âm, Ngữ điệu và Trọng âm):** Comment on pronunciation, intonation, and stress.

Your final output must be a JSON object adhering to the provided schema. Do not add any extra text or explanations outside the JSON structure.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    { text: "Evaluate my spoken description of a picture." },
                    { inlineData: { mimeType: mimeType, data: audioBase64 } }
                ]
            },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: speakingPart2Schema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.taskScore === 'number') {
            return data as SpeakingPart2EvaluationResult;
        }

        return null;

    } catch (error) {
        console.error("Error evaluating speaking part 2:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

// FIX: Add missing schemas and functions for Speaking parts 3, 4, 5 and Writing parts 1, 2, 3.

// --- Speaking Part 3 ---
const speakingPart3QuestionsSchema = {
    type: Type.OBJECT,
    properties: {
        topic: { type: Type.STRING, description: "A familiar topic for discussion, e.g., 'Work-Life Balance' or 'Online Shopping'."},
        question5: { type: Type.STRING, description: "Question 5, a simple question about the topic."},
        question6: { type: Type.STRING, description: "Question 6, another simple question related to the topic and question 5."},
        question7: { type: Type.STRING, description: "Question 7, a more complex question asking for an opinion or explanation about the topic."},
    },
    required: ['topic', 'question5', 'question6', 'question7']
};

export const generateSpeakingPart3Questions = async (): Promise<{ topic: string, question5: string, question6: string, question7: string } | null> => {
    try {
        const prompt = `Generate a set of 3 related questions for a TOEIC Speaking Test Part 3 (Respond to questions).
        1. Choose a common, familiar topic suitable for an intermediate English learner (e.g., 'Workplace Communication', 'Traveling', 'Using Technology').
        2. Create three questions (Q5, Q6, Q7) related to this topic.
        3. Q5 and Q6 should be simpler questions that can be answered in 15 seconds.
        4. Q7 should be a more open-ended question that requires a more developed 30-second response (e.g., asking for an opinion, advantages/disadvantages, or a preference with reasons).
        5. Return the result in JSON format according to the schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: speakingPart3QuestionsSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);
        if (data && data.topic) {
            return data;
        }
        return null;
    } catch (error) {
        console.error("Error generating Speaking Part 3 questions:", error);
        throw new Error("Failed to generate questions from API.");
    }
};

const speakingPart3FeedbackSchema = {
    type: Type.OBJECT,
    properties: {
        english: { type: Type.STRING },
        vietnamese: { type: Type.STRING }
    },
    required: ['english', 'vietnamese']
};

const speakingPart3Schema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER, description: "The raw score from 0 to 5 based on overall performance." },
        estimatedScoreBand: { type: Type.STRING, description: "The estimated TOEIC Speaking Scale Score Range (e.g., '130-150')." },
        proficiencyLevel: { type: Type.STRING, description: "The corresponding TOEIC Proficiency Level (e.g., 'Level 6')." },
        generalSummary: speakingPart3FeedbackSchema,
        grammarAndVocab: speakingPart3FeedbackSchema,
        fluencyAndCohesion: speakingPart3FeedbackSchema,
        pronunciation: speakingPart3FeedbackSchema,
        responseToQ7: speakingPart3FeedbackSchema,
    },
    required: ['taskScore', 'estimatedScoreBand', 'proficiencyLevel', 'generalSummary', 'grammarAndVocab', 'fluencyAndCohesion', 'pronunciation', 'responseToQ7']
};

export const evaluateSpeakingPart3 = async (
    questions: { topic: string; question5: string; question6: string; question7: string; },
    audioBase64s: (string | null)[],
    mimeTypes: string[]
): Promise<SpeakingPart3EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified TOEIC Speaking Test rater, specializing in "Part 3: Respond to Questions". You will evaluate a user's spoken audio responses to three related questions.

Your evaluation must be based on the official criteria:
1.  **Relevance and Completeness:** How well the response addresses the prompt.
2.  **Grammar and Vocabulary:** Accuracy and range of language used.
3.  **Fluency and Cohesion:** Smoothness of speech and logical flow of ideas.
4.  **Pronunciation:** Clarity and intelligibility.

**Step 1: Assign a Task Score (0-5 Scale)**
- **5:** Response is highly intelligible, relevant, and well-developed. Uses a good range of grammar and vocabulary with few errors.
- **3-4:** Response is generally intelligible and relevant. May have some limitations in language use or development.
- **1-2:** Response is limited, not always intelligible or relevant. Significant errors in language.
- **0:** No intelligible speech.

**Step 2: Estimate Score Band and Proficiency Level**
- **Level 8 (190-200):** Strong Task Score of 5.
- **Level 7 (160-180):** Solid Task Score of 4-5.
- **Level 6 (130-150):** Strong Task Score of 3-4.
- **Level 5 (110-120):** Standard Task Score of 3.
- **Levels 1-4:** Task Score of 0-2.

**Step 3: Provide Detailed Feedback in English and Vietnamese**
- **General Summary (Tóm tắt chung):** Overall strengths and weaknesses.
- **Grammar & Vocabulary (Ngữ pháp & Từ vựng):** Comments on accuracy and range.
- **Fluency & Cohesion (Độ trôi chảy & Mạch lạc):** Comments on flow and clarity.
- **Pronunciation (Phát âm):** Comments on clarity.
- **Response to Q7 (Phản hồi cho Câu 7):** Specific feedback on the more developed answer.

Your final output must be a JSON object adhering to the schema.`;

        const parts: any[] = [
            { text: `Evaluate my spoken responses. The topic was "${questions.topic}".
            Question 5: "${questions.question5}" (15 sec response)
            Question 6: "${questions.question6}" (15 sec response)
            Question 7: "${questions.question7}" (30 sec response)
            
            Here are my audio responses for Q5, Q6, and Q7 respectively.` },
        ];

        if (audioBase64s[0]) {
            parts.push({ text: "Audio for Question 5:" });
            parts.push({ inlineData: { mimeType: mimeTypes[0], data: audioBase64s[0] } });
        }
        if (audioBase64s[1]) {
            parts.push({ text: "Audio for Question 6:" });
            parts.push({ inlineData: { mimeType: mimeTypes[1], data: audioBase64s[1] } });
        }
        if (audioBase64s[2]) {
            parts.push({ text: "Audio for Question 7:" });
            parts.push({ inlineData: { mimeType: mimeTypes[2], data: audioBase64s[2] } });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: speakingPart3Schema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.taskScore === 'number') {
            return data as SpeakingPart3EvaluationResult;
        }
        return null;

    } catch (error) {
        console.error("Error evaluating speaking part 3:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

// --- Speaking Part 4 ---

const speakingPart4TaskSchema = {
    type: Type.OBJECT,
    properties: {
        documentTitle: { type: Type.STRING, description: "The title of the document, e.g., 'Conference Schedule' or 'Library Information'." },
        documentContent: { type: Type.STRING, description: "The full text content of the document. Use markdown for simple formatting like headers with '***' and tables with '|'." },
        question8: { type: Type.STRING, description: "Question 8, a simple question about specific information in the document."},
        question9: { type: Type.STRING, description: "Question 9, another simple question about different information in the document."},
        question10: { type: Type.STRING, description: "Question 10, a more complex question requiring the user to synthesize information from the document."},
    },
    required: ['documentTitle', 'documentContent', 'question8', 'question9', 'question10']
};

export const generateSpeakingPart4Task = async (): Promise<SpeakingPart4Task | null> => {
    try {
        const prompt = `Generate a task for a TOEIC Speaking Test Part 4 (Respond to questions using provided information).
        1. Create a realistic document such as a conference schedule, a meeting agenda, an itinerary, or a public announcement.
        2. The document should contain enough detail to answer three questions. Use simple markdown for structure (e.g., '***Header***' for titles, '|' for tables).
        3. Create three questions (Q8, Q9, Q10) based on the document.
        4. Q8 and Q9 should ask for specific pieces of information found in the text.
        5. Q10 should require the test-taker to combine or infer information from two or more parts of the document.
        6. Return the result in JSON format according to the schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: speakingPart4TaskSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);
        if (data && data.documentTitle) {
            return data as SpeakingPart4Task;
        }
        return null;
    } catch (error) {
        console.error("Error generating Speaking Part 4 task:", error);
        throw new Error("Failed to generate task from API.");
    }
};

const speakingPart4FeedbackSchema = {
    type: Type.OBJECT,
    properties: {
        english: { type: Type.STRING },
        vietnamese: { type: Type.STRING }
    },
    required: ['english', 'vietnamese']
};

const speakingPart4Schema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER, description: "The raw score from 0 to 5 based on overall performance." },
        estimatedScoreBand: { type: Type.STRING, description: "The estimated TOEIC Speaking Scale Score Range (e.g., '130-150')." },
        proficiencyLevel: { type: Type.STRING, description: "The corresponding TOEIC Proficiency Level (e.g., 'Level 6')." },
        generalSummary: speakingPart4FeedbackSchema,
        accuracy: speakingPart4FeedbackSchema,
        responseToQ10: speakingPart4FeedbackSchema,
        languageUse: speakingPart4FeedbackSchema,
        delivery: speakingPart4FeedbackSchema,
    },
    required: ['taskScore', 'estimatedScoreBand', 'proficiencyLevel', 'generalSummary', 'accuracy', 'responseToQ10', 'languageUse', 'delivery']
};

export const evaluateSpeakingPart4 = async (
    task: SpeakingPart4Task,
    audioBase64s: (string | null)[],
    mimeTypes: string[]
): Promise<SpeakingPart4EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified TOEIC Speaking Test rater, specializing in "Part 4: Respond to Questions using Provided Information". You will evaluate a user's spoken audio responses to three questions based on a provided document.

Your evaluation must be based on:
1.  **Accuracy and Completeness:** How accurately and completely the response answers the questions using information from the document.
2.  **Language Use:** Grammar and vocabulary accuracy and range.
3.  **Delivery:** Pronunciation, intonation, and stress.

**Step 1: Assign a Task Score (0-5 Scale)**
- **5:** Responses are highly intelligible, accurate, and complete. Language use is strong.
- **3-4:** Responses are generally intelligible and mostly accurate. Some limitations in language or completeness.
- **1-2:** Responses are limited, often inaccurate, or difficult to understand.
- **0:** No intelligible speech.

**Step 2: Estimate Score Band and Proficiency Level**
- Use the Task Score to estimate an overall score. Levels range from 1 to 8 (Scores 0-200).

**Step 3: Provide Detailed Feedback in English and Vietnamese**
- **General Summary (Tóm tắt chung):** Overall performance.
- **Accuracy (Q8 & Q9) (Độ chính xác - Câu 8 & 9):** Comment on how well the user extracted specific information.
- **Response to Q10 (Phản hồi cho Câu 10):** Specific feedback on the more complex answer.
- **Language Use (Sử dụng ngôn ngữ):** Comments on grammar and vocabulary.
- **Delivery (Trình bày):** Comments on pronunciation, intonation, and stress.

Your final output must be a JSON object adhering to the schema.`;
        
        const parts: any[] = [
            { text: `Evaluate my spoken responses based on the following document.
            Document Title: "${task.documentTitle}"
            Document Content: "${task.documentContent}"

            Questions:
            Q8: "${task.question8}" (15 sec response)
            Q9: "${task.question9}" (15 sec response)
            Q10: "${task.question10}" (30 sec response)
            
            Here are my audio responses for Q8, Q9, and Q10 respectively.` },
        ];

        if (audioBase64s[0]) {
            parts.push({ text: "Audio for Question 8:" });
            parts.push({ inlineData: { mimeType: mimeTypes[0], data: audioBase64s[0] } });
        }
        if (audioBase64s[1]) {
            parts.push({ text: "Audio for Question 9:" });
            parts.push({ inlineData: { mimeType: mimeTypes[1], data: audioBase64s[1] } });
        }
        if (audioBase64s[2]) {
            parts.push({ text: "Audio for Question 10:" });
            parts.push({ inlineData: { mimeType: mimeTypes[2], data: audioBase64s[2] } });
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: speakingPart4Schema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.taskScore === 'number') {
            return data as SpeakingPart4EvaluationResult;
        }
        return null;

    } catch (error) {
        console.error("Error evaluating speaking part 4:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

// --- Speaking Part 5 ---
const speakingPart5ScenarioSchema = {
    type: Type.OBJECT,
    properties: {
        callerName: { type: Type.STRING, description: "The name of the person leaving the voicemail, e.g., 'Mr. Smith' or 'Jane from Accounting'." },
        problem: { type: Type.STRING, description: "The text of the voicemail message, which should describe a problem clearly and concisely (around 40-60 words)." },
    },
    required: ['callerName', 'problem']
};

export const generateSpeakingPart5Scenario = async (): Promise<SpeakingPart5Scenario | null> => {
    try {
        const prompt = `Generate a scenario for a TOEIC Speaking Test Part 5 (Propose a solution).
        1. Create a short and realistic voicemail message (40-60 words) from a person describing a common business or customer service problem.
        2. The problem should be clear enough that a test-taker can propose a logical solution.
        3. Assign a name to the caller.
        4. Return the result in JSON format according to the schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: speakingPart5ScenarioSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);
        if (data && data.problem) {
            return data as SpeakingPart5Scenario;
        }
        return null;
    } catch (error) {
        console.error("Error generating Speaking Part 5 scenario:", error);
        throw new Error("Failed to generate scenario from API.");
    }
};

const speakingPart5FeedbackSchema = {
    type: Type.OBJECT,
    properties: {
        english: { type: Type.STRING },
        vietnamese: { type: Type.STRING }
    },
    required: ['english', 'vietnamese']
};

const speakingPart5Schema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER, description: "The raw score from 0 to 5 based on overall performance." },
        estimatedScoreBand: { type: Type.STRING, description: "The estimated TOEIC Speaking Scale Score Range." },
        proficiencyLevel: { type: Type.STRING, description: "The corresponding TOEIC Proficiency Level." },
        generalSummary: speakingPart5FeedbackSchema,
        solutionStructure: speakingPart5FeedbackSchema,
        languageUse: speakingPart5FeedbackSchema,
        fluencyAndCohesion: speakingPart5FeedbackSchema,
        intonationAndTone: speakingPart5FeedbackSchema,
    },
    required: ['taskScore', 'estimatedScoreBand', 'proficiencyLevel', 'generalSummary', 'solutionStructure', 'languageUse', 'fluencyAndCohesion', 'intonationAndTone']
};

export const evaluateSpeakingPart5 = async (
    problemText: string,
    audioBase64: string,
    mimeType: string
): Promise<SpeakingPart5EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified TOEIC Speaking Test rater for "Part 5: Propose a Solution". You will evaluate a user's spoken response to a voicemail message describing a problem.

Your evaluation is based on:
1.  **Task Fulfillment:** Did the user acknowledge the problem and propose a clear, appropriate solution?
2.  **Solution Structure:** Is the response well-organized (greeting, summary of problem, solution, closing)?
3.  **Language Use:** Grammar and vocabulary accuracy and appropriateness.
4.  **Delivery:** Fluency, cohesion, pronunciation, intonation, and tone.

**Step 1: Assign a Task Score (0-5 Scale)**
- **5:** Clear, well-structured solution with strong language use and delivery.
- **3-4:** Generally clear and appropriate solution with some limitations in structure, language, or delivery.
- **1-2:** Limited or inappropriate solution. Significant language or delivery issues.
- **0:** No intelligible speech.

**Step 2: Estimate Score Band and Proficiency Level**

**Step 3: Provide Detailed Feedback in English and Vietnamese**
- **General Summary (Tóm tắt chung):** Overall performance.
- **Solution Structure (Cấu trúc giải pháp):** Comments on organization and clarity of the proposed solution.
- **Language Use (Sử dụng ngôn ngữ):** Comments on grammar and vocabulary.
- **Fluency & Cohesion (Độ trôi chảy & Mạch lạc):** Comments on flow and clarity.
- **Intonation & Tone (Ngữ điệu & Giọng điệu):** Comments on professional tone.

Your final output must be a JSON object adhering to the schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    { text: `Evaluate my spoken response to this voicemail problem: "${problemText}"` },
                    { inlineData: { mimeType: mimeType, data: audioBase64 } }
                ]
            },
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: speakingPart5Schema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.taskScore === 'number') {
            return data as SpeakingPart5EvaluationResult;
        }
        return null;

    } catch (error) {
        console.error("Error evaluating speaking part 5:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

// --- Writing Part 1 ---
const writingPart1TaskPromptsSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        imagePrompt: { type: Type.STRING, description: "A detailed prompt for an image generator to create a realistic photo for TOEIC Writing Part 1." },
        keywords: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "An array of exactly two simple keywords (e.g., verbs, nouns) related to the image prompt."
        }
      },
      required: ['imagePrompt', 'keywords']
    }
};

export const generateWritingPart1Tasks = async (): Promise<WritingPart1Task[] | null> => {
    try {
        const prompt = `Generate 5 distinct tasks for a TOEIC Writing Test Part 1 (Write a sentence based on a picture). Each task needs an image prompt and two keywords.
        1. For each of the 5 tasks, create a detailed prompt for an AI image generator. The prompt should describe a common, clear action or scene (e.g., 'A man is pointing at a chart during a business meeting', 'A woman is watering plants on a balcony').
        2. For each image prompt, provide exactly two simple, related keywords (e.g., ['point', 'chart'], ['woman', 'water']).
        3. Ensure the keywords are different for each task.
        4. Return the result as a JSON array of 5 objects, according to the schema.`;

        const promptResponse = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: writingPart1TaskPromptsSchema,
            },
        });

        const jsonStr = promptResponse.text.trim();
        const taskPrompts = JSON.parse(jsonStr);

        if (!taskPrompts || taskPrompts.length < 5) {
            throw new Error("Failed to generate valid task prompts.");
        }

        const tasks: WritingPart1Task[] = [];

        for (const taskPrompt of taskPrompts) {
            const imageResponse = await ai.models.generateImages({
                model: 'imagen-4.0-generate-001',
                prompt: taskPrompt.imagePrompt,
                config: {
                  numberOfImages: 1,
                  outputMimeType: 'image/jpeg',
                  aspectRatio: '4:3',
                },
            });
            const base64ImageBytes = imageResponse.generatedImages?.[0]?.image?.imageBytes;
            if (base64ImageBytes && taskPrompt.keywords.length === 2) {
                tasks.push({
                    picture: base64ImageBytes,
                    keywords: taskPrompt.keywords as [string, string]
                });
            } else {
                console.warn("Skipping a task due to failed image generation or incorrect keyword count.");
            }
        }

        if (tasks.length > 0) {
            return tasks;
        }

        return null;

    } catch (error) {
        console.error("Error generating Writing Part 1 tasks:", error);
        throw new Error("Failed to generate tasks from API.");
    }
};

const writingPart1SingleEvalSchema = {
    type: Type.OBJECT,
    properties: {
        score: { type: Type.INTEGER, description: "Score from 0-3." },
        grammar: { 
            type: Type.OBJECT,
            properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } },
            required: ['english', 'vietnamese']
        },
        relevance: { 
            type: Type.OBJECT,
            properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } },
            required: ['english', 'vietnamese']
        }
    },
    required: ['score', 'grammar', 'relevance']
};

const writingPart1Schema = {
    type: Type.OBJECT,
    properties: {
        totalRawScore: { type: Type.INTEGER },
        estimatedScoreBand: { type: Type.STRING },
        proficiencyLevel: { type: Type.STRING },
        overallSummary: {
             type: Type.OBJECT,
            properties: { english: { type: Type.STRING }, vietnamese: { type: Type.STRING } },
            required: ['english', 'vietnamese']
        },
        questionFeedback: {
            type: Type.ARRAY,
            items: writingPart1SingleEvalSchema
        }
    },
    required: ['totalRawScore', 'estimatedScoreBand', 'proficiencyLevel', 'overallSummary', 'questionFeedback']
};

export const evaluateWritingPart1 = async (
    tasks: WritingPart1Task[],
    userAnswers: string[]
): Promise<WritingPart1EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified TOEIC Writing Test rater for "Part 1: Write a sentence based on a picture". You will evaluate 5 sentences written by a user. For each sentence, the user was shown a picture and given two keywords. You will only be provided with the keywords and the user's written sentence.

Your evaluation for each sentence must be based on:
1.  **Grammar:** Is the sentence grammatically correct?
2.  **Relevance:** Does the sentence use BOTH keywords and logically relate them to each other in a plausible sentence that could describe a picture?

**Step 1: Score Each Sentence (0-3 Scale)**
- **3:** Grammatically correct sentence that uses both keywords appropriately.
- **2:** Minor grammar error OR one keyword is used incorrectly.
- **1:** Significant grammar errors OR only one keyword is used.
- **0:** No response, sentence is incomprehensible, or neither keyword is used.

**Step 2: Calculate Total Score and Estimate Band/Level**
- **Total Raw Score:** Sum of the 5 individual scores (0-15).
- **Estimate Score Band:** (e.g., 170-190 for high scores, 110-130 for mid scores, etc.)
- **Proficiency Level:** (e.g., Level 8, Level 5, etc.)

**Step 3: Provide Detailed Feedback**
- Create an **Overall Summary** in English and Vietnamese.
- For each of the 5 questions, provide specific feedback on **Grammar** and **Relevance** in both English and Vietnamese.

Your final output must be a JSON object with feedback for exactly 5 questions, adhering to the provided schema.`;

        // FIX: Changed promptText from const to let to allow modification.
        let promptText = "Please evaluate these 5 sentences for the TOEIC Writing Part 1 task.\n\n";
        tasks.forEach((task, index) => {
            promptText += `Question ${index + 1}:\n`;
            promptText += `- Keywords: ${task.keywords[0]}, ${task.keywords[1]}\n`;
            promptText += `- User Sentence: "${userAnswers[index] || '(No answer)'}"\n\n`;
        });
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: promptText,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: writingPart1Schema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.questionFeedback && data.questionFeedback.length === 5) {
            return data as WritingPart1EvaluationResult;
        }
        return null;

    } catch (error) {
        console.error("Error evaluating writing part 1:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

// --- Writing Part 2 ---

const writingPart2RequestSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING, description: "The title/sender line of the email, e.g., 'From: David Smith, Subject: Inquiry about your order'." },
        requestText: { type: Type.STRING, description: "The body of the email, which should contain specific questions or requests." },
    },
    required: ['title', 'requestText']
};

const writingPart2TaskSchema = {
    type: Type.OBJECT,
    properties: {
        question6: writingPart2RequestSchema,
        question7: writingPart2RequestSchema,
    },
    required: ['question6', 'question7']
};

export const generateWritingPart2Tasks = async (): Promise<WritingPart2Task | null> => {
    try {
        const prompt = `Generate a task for a TOEIC Writing Test Part 2 (Respond to a written request). This consists of two separate email requests (Question 6 and Question 7).
        1.  **For Question 6:** Create an email of 2-3 sentences that makes 1 or 2 simple requests (e.g., asking for information, confirming details).
        2.  **For Question 7:** Create another email of 3-4 sentences that presents a problem and makes 2 or 3 requests for information or action.
        3.  The topics should be common business scenarios (e.g., orders, scheduling, complaints, inquiries).
        4.  Return the result as a single JSON object according to the schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: writingPart2TaskSchema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);
        if (data && data.question6 && data.question7) {
            return data as WritingPart2Task;
        }
        return null;
    } catch (error) {
        console.error("Error generating Writing Part 2 tasks:", error);
        throw new Error("Failed to generate tasks from API.");
    }
};

const writingPart2FeedbackDetailSchema = {
    type: Type.OBJECT,
    properties: {
        english: { type: Type.STRING },
        vietnamese: { type: Type.STRING }
    },
    required: ['english', 'vietnamese']
};

const writingPart2SingleEvalSchema = {
    type: Type.OBJECT,
    properties: {
        score: { type: Type.INTEGER, description: "Score from 0-4." },
        requestSummary: { type: Type.STRING, description: "A brief summary of what the original email requested." },
        completeness: writingPart2FeedbackDetailSchema,
        languageUse: writingPart2FeedbackDetailSchema,
        organization: { ...writingPart2FeedbackDetailSchema, description: "Optional for Q6" },
        tone: { ...writingPart2FeedbackDetailSchema, description: "Optional for Q6" },
    },
    required: ['score', 'requestSummary', 'completeness', 'languageUse']
};

const writingPart2Schema = {
    type: Type.OBJECT,
    properties: {
        totalRawScore: { type: Type.INTEGER, description: "Sum of scores for Q6 and Q7 (0-8)." },
        estimatedScoreBand: { type: Type.STRING },
        overallSummary: writingPart2FeedbackDetailSchema,
        question6Feedback: writingPart2SingleEvalSchema,
        question7Feedback: writingPart2SingleEvalSchema,
    },
    required: ['totalRawScore', 'estimatedScoreBand', 'overallSummary', 'question6Feedback', 'question7Feedback']
};

export const evaluateWritingPart2 = async (
    tasks: WritingPart2Task,
    userAnswers: string[]
): Promise<WritingPart2EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified TOEIC Writing Test rater for "Part 2: Respond to a written request". Evaluate two email responses from a user.

**Evaluation Criteria:**
- **Task Completion:** Did the user address all parts of the original request?
- **Organization & Cohesion:** Is the response well-structured like an email?
- **Language Use:** Grammar, vocabulary, and sentence variety.
- **Tone:** Is the tone appropriate for a business email?

**Step 1: Score Each Response**
- **Question 6 (Score 0-4):**
  - 4: Effectively addresses the task with good organization and language.
  - 3: Generally addresses the task, minor issues with clarity or language.
  - 1-2: Limited response, major errors, or does not address the task.
- **Question 7 (Score 0-4):** Same criteria as Q6.

**Step 2: Calculate Total Score and Estimate Band**
- **Total Raw Score:** Sum of scores (0-8).
- **Estimate Score Band:** (e.g., 180-200 for high scores).

**Step 3: Provide Detailed Feedback in English and Vietnamese**
- Create an **Overall Summary**.
- For each question, provide specific feedback on **Completeness**, **Language Use**, **Organization**, and **Tone**.

Your final output must be a JSON object adhering to the schema.`;
        
        // FIX: Changed promptText from const to let to allow modification.
        let promptText = `Please evaluate these 2 email responses for the TOEIC Writing Part 2 task.\n\n`;
        promptText += `--- QUESTION 6 ---\n`;
        promptText += `Original Email Request: "${tasks.question6.requestText}"\n`;
        promptText += `User's Response: "${userAnswers[0] || '(No answer)'}"\n\n`;
        promptText += `--- QUESTION 7 ---\n`;
        promptText += `Original Email Request: "${tasks.question7.requestText}"\n`;
        promptText += `User's Response: "${userAnswers[1] || '(No answer)'}"\n`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: promptText,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: writingPart2Schema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && data.question6Feedback && data.question7Feedback) {
            return data as WritingPart2EvaluationResult;
        }
        return null;

    } catch (error) {
        console.error("Error evaluating writing part 2:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};

// --- Writing Part 3 ---
const writingPart3TaskSchema = {
    type: Type.OBJECT,
    properties: {
        question: { type: Type.STRING, description: "An opinion essay question for the TOEIC Writing test." },
    },
    required: ['question']
};

export const generateWritingPart3Task = async (): Promise<WritingPart3Task | null> => {
    try {
        const prompt = `Generate one opinion essay prompt for a TOEIC Writing Test Part 3 (Write an opinion essay).
        1. The question should present a statement and ask the test-taker whether they agree or disagree, and to support their opinion with reasons and examples.
        2. The topic should be related to work, technology, or modern life (e.g., 'Do you agree or disagree with the statement that remote work is more productive than working in an office?').
        3. The prompt should clearly state the requirement to provide reasons and examples.
        4. Return the result in JSON format according to the schema.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: writingPart3TaskSchema,
            },
        });
        
        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);
        if (data && data.question) {
            return data as WritingPart3Task;
        }
        return null;
    } catch (error) {
        console.error("Error generating Writing Part 3 task:", error);
        throw new Error("Failed to generate task from API.");
    }
};

const writingPart3FeedbackDetailSchema = {
    type: Type.OBJECT,
    properties: {
        english: { type: Type.STRING },
        vietnamese: { type: Type.STRING }
    },
    required: ['english', 'vietnamese']
};

const writingPart3Schema = {
    type: Type.OBJECT,
    properties: {
        taskScore: { type: Type.INTEGER, description: "Score from 0-5." },
        estimatedScoreBand: { type: Type.STRING },
        overallSummary: writingPart3FeedbackDetailSchema,
        ideaDevelopment: writingPart3FeedbackDetailSchema,
        organization: writingPart3FeedbackDetailSchema,
        grammarAndSyntax: writingPart3FeedbackDetailSchema,
        vocabulary: writingPart3FeedbackDetailSchema,
    },
    required: ['taskScore', 'estimatedScoreBand', 'overallSummary', 'ideaDevelopment', 'organization', 'grammarAndSyntax', 'vocabulary']
};

export const evaluateWritingPart3 = async (
    question: string,
    userAnswer: string
): Promise<WritingPart3EvaluationResult | null> => {
    try {
        const systemInstruction = `You are a certified TOEIC Writing Test rater for "Part 3: Write an opinion essay". Evaluate one essay from a user based on a given prompt.

**Evaluation Criteria:**
- **Task Fulfillment:** Does the essay state a clear opinion and support it with relevant reasons and examples?
- **Organization:** Is the essay well-structured with an introduction, body paragraphs, and conclusion?
- **Idea Development:** Are the supporting ideas well-explained and detailed?
- **Grammar & Syntax:** Accuracy and complexity of sentence structures.
- **Vocabulary:** Range and appropriateness of vocabulary.

**Step 1: Score the Essay (0-5 Scale)**
- **5:** Well-organized, well-developed, clear opinion, strong language use.
- **3-4:** Generally addresses the task with adequate organization and support. Some language errors.
- **1-2:** Weakly developed, disorganized, or contains significant language errors that obscure meaning.
- **0:** No response or off-topic.

**Step 2: Estimate Score Band**

**Step 3: Provide Detailed Feedback in English and Vietnamese**
- Provide an **Overall Summary**.
- Provide specific feedback on **Idea Development**, **Organization**, **Grammar & Syntax**, and **Vocabulary**.

Your final output must be a JSON object adhering to the schema.`;
        
        // FIX: Changed promptText from const to let to allow modification.
        let promptText = `Please evaluate this opinion essay for the TOEIC Writing Part 3 task.\n\n`;
        promptText += `Essay Question: "${question}"\n\n`;
        promptText += `User's Essay: "${userAnswer || '(No answer)'}"\n`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: promptText,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: writingPart3Schema,
            },
        });

        const jsonStr = response.text.trim();
        const data = JSON.parse(jsonStr);

        if (data && typeof data.taskScore === 'number') {
            return data as WritingPart3EvaluationResult;
        }
        return null;

    } catch (error) {
        console.error("Error evaluating writing part 3:", error);
        throw new Error("Failed to get evaluation from API.");
    }
};