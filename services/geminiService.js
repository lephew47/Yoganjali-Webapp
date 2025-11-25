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
export const generateTherapyResponse = async (userMessage, history = []) => {
  if (!API_KEY) {
    console.error('API Key missing. Available env vars:', Object.keys(process.env));
    return "Configuration Error: API Key is missing. Please set the GEMINI_API_KEY environment variable.";
  }

  try {
    const client = getClient();
    const model = client.getGenerativeModel({ 
      
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
      systemInstruction: `You are the 'AI Therapy Assistant' for Yoganjali Global Institute of Applied Yogic Sciences. 
Your goal is to provide holistic, safe, and scientifically-grounded advice based on Yoga Therapy, Ayurveda, and Mindfulness.

Guidelines:
1. Always be compassionate, professional, and soothing.
2. Suggest specific Asanas (poses), Pranayama (breathing), and Dhyana (meditation) techniques relevant to the user's query.
3. If a user mentions severe physical pain or mental distress, strictly advise them to consult a medical professional immediately, while offering gentle supportive practices.
4. Maintain the institute's philosophy: "Classical Wisdom, Modern Application."
5. Keep responses concise (under 200 words) unless asked for a detailed routine.`
    });

    const chat = model.startChat({
      history: history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }))
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text() || "Namaste. I am taking a moment to meditate on your request. Please try again.";
    
  } catch (error) {
    console.error("Gemini API Error:", error);
    console.error("Error details:", error.message);
    return "I apologize, but I am having trouble connecting to the universal consciousness (server error). Please try again later.";
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