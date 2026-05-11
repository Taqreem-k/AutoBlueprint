const { GoogleGenAI } = require('@google/generative-ai');
const { z } = require('zod');
const { zodToJsonSchema } = require('zod-to-json-schema');

const ai = new GoogleGenAI(process.env.GEMINI_API_KEY);

const blueprintSchema = z.object({
    systemOverview: z.string().describe("A high-level executive summary of the system architecture."),
    techStack: z.object({
        frontend: z.array(z.string()).describe("List of frontend technologies"),
        backend: z.array(z.string()).describe("List of backend technologies"),
        database: z.array(z.string()).describe("List of databases and caching layers"),
        infrastructure: z.array(z.string()).describe("Cloud, DevOps, or hosting tools")
    }),
    requiredImports: z.array(z.object({
        technology: z.string(),
        installCommand: z.string().describe("The terminal command, e.g., npm install express"),
        importStatement: z.string().describe("The code import, e.g., const express = require('express');")
    })).describe("List of essential packages and their installation commands")
});

const generateArchitectureBlueprint = async (transcript) => {
    const prompt = `You are a Principal Cloud Architect. Analyze the following audio transcript from a client describing an application they want to build.
    Based on their description, generate a complete, highly scalable system architecture blueprint.
    
    Client Transcript:
    "${transcript}"`;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
            responseSchema: zodToJsonSchema(blueprintSchema),
        }
    });

    return JSON.parse(response.text());
};