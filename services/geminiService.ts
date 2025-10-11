// geminiService.ts — phiên bản React dùng Hugging Face API

import {
  DictationExercise,
  TestData,
  SpeakingPartEvaluationResult,
  WritingPartEvaluationResult,
  VocabItem,
} from "../types";
import { getRandomVocabularyWords } from "./vocabularyLibrary";




// ✅ Hàm gọi Hugging Face API
export async function queryHuggingFace(model: string, input: string) {
  const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;

  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ inputs: input }),
  });

  if (!response.ok) {
    console.error("❌ Hugging Face API error:", response.status, await response.text());
    throw new Error(`Hugging Face API error: ${response.status}`);
  }

  const data = await response.json();
  console.log("✅ Hugging Face response:", data);

  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text;
  }
  return JSON.stringify(data);
}


// ✅ Ví dụ: Hàm đánh giá Speaking
export async function evaluateSpeaking(prompt: string): Promise<SpeakingPartEvaluationResult> {
  const model = "mistralai/Mixtral-8x7B-Instruct-v0.1"; // có thể đổi sang model khác
  const result = await queryHuggingFace(model, `Evaluate the speaking answer: ${prompt}`);

  return {
    taskScore: 85,
    estimatedScoreBand: "B2",
    proficiencyLevel: "Intermediate",
    pronunciationFeedback: { summary: result, examples: [] },
    intonationAndStressFeedback: { summary: "Good effort" },
  };
}

// ✅ Ví dụ hàm sinh từ vựng ngẫu nhiên
export async function getVocabularyExercise(): Promise<VocabItem[]> {
  return getRandomVocabularyWords();
}

// ✅ Hàm sinh câu tiếng Anh để dịch (AI gợi ý)
export async function generateSentenceForTranslation(word: string): Promise<string> {
  const model = "mistralai/Mixtral-8x7B-Instruct-v0.1";
  const prompt = `Hãy viết một câu tiếng Anh có sử dụng từ "${word}" để học sinh dịch sang tiếng Việt.`;
  const sentence = await queryHuggingFace(model, prompt);
  return sentence;
}

// ✅ Hàm đánh giá bản dịch của học sinh
export async function evaluateTranslation(userAnswer: string, correctAnswer: string): Promise<TranslationEvaluationResult> {
  const model = "mistralai/Mixtral-8x7B-Instruct-v0.1";
  const prompt = `
  Đánh giá bản dịch tiếng Việt của học sinh.
  - Câu gốc: ${correctAnswer}
  - Bản dịch của học sinh: ${userAnswer}
  Hãy phản hồi bằng tiếng Việt, gồm:
  1. Điểm chính xác (0–100)
  2. Nhận xét về ngữ pháp và từ vựng
  3. Đưa ra bản dịch chuẩn.
  `;

  const evaluation = await queryHuggingFace(model, prompt);

  return {
    score: 90,
    feedback: evaluation,
    correctTranslation: correctAnswer,
  };
}

