import express from 'express';
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateAsanaAnalysis, generateTherapyResponse } from './services/geminiService.js';

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

// Single analyze route with proper error handling
app.post('/api/analyze', async (req, res) => {
  try {
    console.log('Analyze request body:', req.body);
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ error: 'Missing name parameter' });
    }

    const analysis = await generateAsanaAnalysis(name);
    
    if (!analysis) {
      return res.status(500).json({ error: 'Analysis failed' });
    }

    res.json(analysis);
  } catch (error) {
    console.error('Analyze route error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
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
    
    if (!message) {
      return res.status(400).json({ error: 'Missing message' });
    }

    const response = await generateTherapyResponse(message, history);
    res.json({ text: response });
  } catch (error) {
    console.error('Therapy route error:', error);
    res.status(500).json({ 
      error: 'Server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});


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