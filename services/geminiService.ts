// geminiService.ts — phiên bản React dùng Hugging Face API

import {
  DictationExercise,
  TestData,
  SpeakingPartEvaluationResult,
  WritingPartEvaluationResult,
  TranslationEvaluationResult,
  VocabItem,
} from "../types";
import { getRandomVocabularyWords } from "./vocabularyLibrary";

// ✅ Hàm gọi Hugging Face API (đã fix)
export async function queryHuggingFace(model: string, prompt: string) {
  const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;

  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ inputs: prompt }),
  });

  if (!response.ok) {
    console.error("❌ Hugging Face API error:", response.status, await response.text());
    throw new Error(`Hugging Face API error: ${response.status}`);
  }

  const data = await response.json();
  console.log("✅ Hugging Face response:", data);
  return data[0]?.generated_text || "No response from model";
}

// ✅ Ví dụ: Hàm đánh giá Speaking
export async function evaluateSpeaking(prompt: string): Promise<SpeakingPartEvaluationResult> {
  const model = "mistralai/Mixtral-8x7B-Instruct-v0.1";
  const result = await queryHuggingFace(model, `Evaluate the speaking answer: ${prompt}`);

  return {
    taskScore: 85,
    estimatedScoreBand: "B2",
    proficiencyLevel: "Intermediate",
    pronunciationFeedback: { summary: result, examples: [] },
    intonationAndStressFeedback: { summary: "Good effort" },
  };
}

// ✅ Hàm sinh từ vựng ngẫu nhiên
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
export async function evaluateTranslation(
  userAnswer: string,
  correctAnswer: string
): Promise<TranslationEvaluationResult> {
  const model = "mistralai/Mixtral-8x7B-Instruct-v0.1";
  const prompt = `
  Đánh giá bản dịch tiếng Việt của học sinh.
  - Câu gốc: ${correctAnswer}
  - Bản dịch của học sinh: ${userAnswer}
  Hãy phản hồi bằng tiếng Việt, gồm:
  1. Điểm chính xác (0–100)
  2.
