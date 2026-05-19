import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY || '';

let genAI = null;

const getClient = () => {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
  }
  return genAI;
};

/**
 * Generates a therapeutic, holistic response from the AI Yoga Therapy Assistant.
 */
const generateTherapyResponse = async (userMessage, history = []) => {
  try {
    if (!API_KEY) {
      throw new Error("GEMINI_API_KEY is missing");
    }

    const client = getClient();

    const model = client.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000
      }
    });

    const systemPrompt = `
You are the AI Therapy Assistant for Yoganjali Global Institute of Applied Yogic Sciences.

Guidelines:
1. Be compassionate, professional, and soothing.
2. Suggest relevant Asanas, Pranayama, and Dhyana.
3. If severe physical or mental distress is mentioned, advise consulting a medical professional.
4. Philosophy: "Classical Wisdom, Modern Application."
5. Keep responses under 200 words unless asked otherwise.
`.trim();

    const contents = [
      { role: "user", parts: [{ text: systemPrompt }] },

      ...(Array.isArray(history)
        ? history
            .filter(m => m?.text)
            .map(m => ({
              role: "user",
              parts: [{ text: String(m.text) }]
            }))
        : []),

      { role: "user", parts: [{ text: String(userMessage) }] }
    ];

    const result = await model.generateContent({ contents });
    return result.response.text();

  } catch (error) {
    console.error("Gemini Therapy Error:", error);
    return "I apologize. I’m unable to respond at the moment. Please try again shortly.";
  }
};

/**
 * Generates a detailed, structured analysis of a yoga asana.
 */
// services/geminiService.js — REPLACE THE WHOLE FUNCTION
export const generateAsanaAnalysis = async (asanaName) => {
  if (!API_KEY) return null;

  try {
    const client = getClient();
    const model = client.getGenerativeModel({
      model: "gemini-2.0-flash", // or gemini-2.5-flash — both rock-solid
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 8192,
        responseMimeType: "application/json"
      },
      systemInstruction: "You are a yoga scientist. Always return complete, valid JSON with no omissions or extra text."
    });

    const prompt = `Return ONLY a valid JSON object (no markdown, no code blocks) for the yoga asana "${asanaName}". 
Use this EXACT structure and NEVER omit any field — use empty arrays [] if needed:

{
  "sanskritName": "string",
  "englishName": "string",
  "etymology": "string",
  "scientificBenefits": ["string", "string", "..."],
  "anatomyFocus": ["string", "..."],
  "contraindications": ["string", "..."],
  "steps": ["step 1", "step 2", "..."],
  "breathAwareness": "string"
}

Asana: "${asanaName}"`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Final safety net — fix any tiny formatting issues
    let cleaned = text.trim();
    if (cleaned.startsWith("```json")) cleaned = cleaned.replace(/^```json\s?/, "").replace(/```$/, "");
    if (cleaned.startsWith("```")) cleaned = cleaned.replace(/^```/, "").replace(/```$/, "");

    const parsed = JSON.parse(cleaned);
    console.log("Final parsed JSON →", parsed); // you will see this in server terminal
    return parsed;

  } catch (error) {
    console.error("Gemini failed completely:", error);
    return null;
  }
};