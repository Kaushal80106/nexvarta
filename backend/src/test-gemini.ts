import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenAI } from "@google/genai";

async function main() {
  console.log("Gemini API key loaded:", !!process.env.GEMINI_API_KEY);

  if (!process.env.GEMINI_API_KEY) {
    console.error("Missing GEMINI_API_KEY in .env");
    return;
  }

  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello in one sentence.",
    });

    console.log("Success! Gemini responded with:");
    console.log(response.text);
  } catch (error) {
    console.error("Gemini test failed:");
    console.error(error);
  }
}

main();

