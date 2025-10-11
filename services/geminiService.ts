// geminiService.ts — phiên bản dùng Hugging Face API

import {
  DictationExercise,
  TestData,
  SpeakingPartEvaluationResult,
  WritingPartEvaluationResult,
  VocabItem,
} from "../types";

import { getRandomVocabularyWords } from "./vocabularyLibrary";

// 🔹 API Key lấy từ Hugging Face (Settings → Access Tokens)
const HF_API_KEY = process.env.HF_API_KEY as string;

// 🔹 Hàm gọi API Hugging Face
async function queryHuggingFace(model: string, input: string) {
  const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ inputs: input }),
  });

  if (!response.ok) {
    throw new Error(`Hugging Face API error: ${response.status}`);
  }

  const data = await response.json();
  // Trả về kết quả text từ model
  if (Array.isArray(data) && data[0]?.generated_text) {
    return data[0].generated_text;
  }
  return JSON.stringify(data);
}

// 🔹 Ví dụ hàm xử lý Speaking Evaluation
export async function evaluateSpeaking(prompt: string): Promise<SpeakingPartEvaluationResult> {
  const model = "mistralai/Mixtral-8x7B-Instruct-v0.1"; // bạn có thể đổi sang model khác
  const result = await queryHuggingFace(model, `Evaluate the speaking answer: ${prompt}`);

  return {
    taskScore: 85,
    estimatedScoreBand: "B2",
    proficiencyLevel: "Intermediate",
    pronunciationFeedback: { summary: result, examples: [] },
    intonationAndStressFeedback: { summary: "Good effort" },
  };
}

// 🔹 Ví dụ hàm sinh từ vựng ngẫu nhiên (nếu bạn dùng)
export async function getVocabularyExercise(): Promise<VocabItem[]> {
  return getRandomVocabularyWords();
}
