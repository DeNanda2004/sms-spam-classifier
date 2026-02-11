
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from 'fs';
import path from 'path';

// Read .env.local
try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);

    if (!match) {
        console.error("Could not find GEMINI_API_KEY in .env.local");
        process.exit(1);
    }

    const apiKey = match[1].trim();
    const genAI = new GoogleGenerativeAI(apiKey);

    async function test() {
        const models = ["gemini-1.5-pro", "gemini-flash-latest", "gemini-pro"];

        for (const modelName of models) {
            try {
                console.log(`Testing model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });
                const result = await model.generateContent("Hello");
                const response = await result.response;
                console.log(`Success with ${modelName}! Response:`, response.text());
                return;
            } catch (error) {
                console.error(`Error with ${modelName}:`, error.message.substring(0, 100)); // Log only first 100 chars
            }
        }
    }

    test();

} catch (e) {
    console.error("Error:", e);
}
