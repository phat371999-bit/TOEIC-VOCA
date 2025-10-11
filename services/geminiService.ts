// geminiService.ts — phiên bản React dùng Hugging Face API

import {
  DictationExercise,
  TestData,
  SpeakingPartEvaluationResult,
  WritingPartEvaluationResult,
  VocabItem,
} from "../types";
import { getRandomVocabularyWords } from "./vocabularyLibrary";

// 🚀 Đặt API Key trực tiếp từ biến môi trường Vite (VITE_HF_API_KEY)
const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;

// ✅ Hàm gọi Hugging Face API
export async function queryHuggingFace(model: string, input: string) {
  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ inputs: input }),
  });

  if (!response.ok) {
    console.error("❌ Hugging Face API error:", response.status);
    throw new Error(`Hugging Face API error: ${response.status}`);
  }

  const data = await response.json();
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
