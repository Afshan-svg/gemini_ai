const PORT = 8000;

const express = require('express');
const cors = require('cors');
const app = express();
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Middleware
app.use(cors());
app.use(express.json());
require('dotenv').config();

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

// POST endpoint to interact with the AI model
app.post('/gemini', async (req, res) => {
    console.log("Received request with history:", req.body.history);
    console.log("Message:", req.body.message);

    try {
        const structuredHistory = req.body.history.map(item => ({
            role: item.role,
            parts: item.parts
        }));

        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const chat = model.startChat({ history: structuredHistory });

        const msg = req.body.message;
        const result = await chat.sendMessage(msg);
        const response = await result.response;
        const text = await response.text();

        res.json({ message: text });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get response from Google Generative AI' });
    }
});

// Start server
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
