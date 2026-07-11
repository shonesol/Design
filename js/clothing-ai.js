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

    try{


let clean=response
.replace(/```json/g,"")
.replace(/```/g,"")
.trim();



const start = clean.indexOf("{");

const end = clean.lastIndexOf("}");



clean = clean.substring(
start,
end+1
);



return JSON.parse(clean);



}

catch(error){


console.error(
"Gemini JSON Error:",
response
);



return {

category:"Unknown",

type:"Unknown",

primaryColor:"Unknown",

style:"Unknown",

confidence:0


};


}
