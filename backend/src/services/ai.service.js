const { GoogleGenAI } = require('@google/generative-ai');
const { z } = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');

// Initialize Gemini Client using the environment variable
const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);