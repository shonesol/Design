// clothing-ai.js
// FashionAI Vision Clothing Analyzer

import { askGemini } from "./gemini.js";

export async function analyzeClothing(imageBase64) {

    const prompt = `
You are FashionAI.

Analyze this clothing image.

Return ONLY valid JSON.

Never use markdown.
Never use \`\`\`.
Never explain anything.

Return exactly this JSON structure:

{
  "name":"",
  "category":"",
  "type":"",
  "primaryColor":"",
  "secondaryColor":"",
  "pattern":"",
  "material":"",
  "style":"",
  "occasion":"",
  "season":[],
  "brand":"",
  "confidence":0
}
`;

    try {

        const response = await askGemini(prompt, imageBase64);

        let clean = response.trim();

        // Remove markdown if Gemini accidentally adds it
        clean = clean
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .trim();

        // Find JSON if extra text exists
        const start = clean.indexOf("{");
        const end = clean.lastIndexOf("}");

        if (start !== -1 && end !== -1) {
            clean = clean.substring(start, end + 1);
        }

        return JSON.parse(clean);

    } catch (error) {

        console.error("FashionAI AI Error:", error);

        return {
            name: "Unknown Clothing",
            category: "Other",
            type: "Unknown",
            primaryColor: "Unknown",
            secondaryColor: "",
            pattern: "Plain",
            material: "Unknown",
            style: "Casual",
            occasion: "Daily Wear",
            season: ["All Season"],
            brand: "Unknown",
            confidence: 0
        };

    }

}
