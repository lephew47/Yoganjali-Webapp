import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateAsanaAnalysis} from './services/geminiService.js';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.GEMINI_API_KEY || process.env.API_KEY || '';


let genAI = null;

const getClient = () => {
  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
  }
  return genAI;
};


const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
const frontendPath = path.join(__dirname, 'dist');
console.log("Serving frontend from:", frontendPath);
app.use(express.static(frontendPath));


// Add debugging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health check with detailed info
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    geminiKey: process.env.GEMINI_API_KEY ? 'Present' : 'Missing'
  });
});

// server.js
app.post('/api/analyze', async (req, res) => {
  try {
    const { name } = req.body;
    console.log('Analyze request body:', req.body);

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing asana name' });
    }

    console.log('Calling Gemini for:', name);
    const analysis = await generateAsanaAnalysis(name.trim());

    if (!analysis) {
      console.error('Gemini returned null');
      return res.status(500).json({ error: 'Failed to generate analysis' });
    }

    console.log('SUCCESS! Sending back:', analysis);
    res.json(analysis);   // ← THIS LINE MUST BE HERE

  } catch (err) {
    console.error('Unexpected error in /api/analyze:', err);
    res.status(500).json({ error: 'Server error' });
  }
});
// Temporary test route — open this in browser to confirm server works
app.get('/api/test', (req, res) => {
  res.json({ message: "Server is working perfectly!", time: new Date().toISOString() });
});
app.post('/api/therapy', async (req, res) => {
  try {
    console.log('Therapy request body:', req.body);
    const { message, history = [] } = req.body;
    const reply = await generateTherapyResponse(message, history);
    if (!message) {
      return res.status(400).json({ error: 'Missing message' });
    }

    const response = await generateTherapyResponse(message, history);
        res.json({ response: reply });

  } catch (error) {
    console.error('Therapy route error:', error);
    res.status(500).json({ 
      error: 'Server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
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
      },
      systemInstruction: `
You are the AI Therapy Assistant. Always start the conversation with a welcoming greeting:
"Namaste. I am your AI Yoga Therapy Assistant. How is your body and mind feeling today?"

Guidelines:
1. Be compassionate, professional, and soothing.
2. Suggest relevant Asanas, Pranayama, and Dhyana.
3. If severe physical or mental distress is mentioned, advise consulting a medical professional.
4. Philosophy: "Classical Wisdom, Modern Application."
5. Keep responses under 200 words unless asked otherwise.
      `.trim()
    });

    // Ensure first message is always 'user'
    const chatHistory = [];

    // 1️⃣ Add user message first
    chatHistory.push({
      role: 'user',
      parts: [{ text: String(userMessage) }]
    });

    // 2️⃣ Add previous history after the user message
    if (Array.isArray(history)) {
      for (const msg of history) {
        if (!msg?.text) continue;
        chatHistory.push({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: String(msg.text) }]
        });
      }
    }

    const chat = model.startChat({ history: chatHistory });

    const result = await chat.sendMessage(userMessage);
    return result.response.text();

  } catch (error) {
    console.error("Gemini Therapy Error:", error.message);
    return "I apologize. I’m unable to respond at the moment. Please try again shortly.";
  }
};

app.get('/debug', (req, res) => {
  res.json({
    geminiApiKey: process.env.GEMINI_API_KEY ? 'Present' : 'Missing',
    apiKey: process.env.API_KEY ? 'Present' : 'Missing',
    nodeEnv: process.env.NODE_ENV,
    allEnvVars: Object.keys(process.env)
  });
});

// Catch-all route for React Router
// This works in Express 4 + ESM + Cloud Run + locally — 100% safe
app.get(/^(?!.*\.).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Gemini API Key: ${process.env.GEMINI_API_KEY ? 'Present' : 'MISSING'}`);
});