// clothing-ai.js
// FashionAI Vision Clothing Analyzer

import { askGemini } from "./gemini.js";


// ==========================
// ANALYZE CLOTHING IMAGE
// ==========================

export async function analyzeClothing(imageBase64) {


const prompt = `

You are FashionAI, a professional worldwide fashion stylist and clothing expert.

Analyze this clothing image.

Identify the clothing item and return ONLY valid JSON.

Do not add markdown.
Do not add explanations outside JSON.

Return this structure:

{
 "category":"",
 "type":"",
 "subCategory":"",
 "gender":"",
 
 "primaryColor":"",
 "secondaryColor":"",
 "hex":"",
 
 "pattern":"",
 "material":"",
 "fabric":"",
 "texture":"",
 
 "fit":"",
 "sleeve":"",
 "neckline":"",
 
 "style":"",
 "formality":"",
 
 "season":[],
 "weatherSuitability":[],
 "occasions":[],
 
 "culturalOrigin":"",
 
 "matchingColors":[],
 "matchingItems":[],
 
 "fashionTips":"",
 
 "confidence":0
}


Rules:

1. Recognize clothing from all regions and cultures.
2. Identify traditional clothing if visible.
3. Identify shoes separately.
4. Understand modern fashion styles.
5. Use proper color names.
6. Include HEX color when possible.
7. Explain compatibility with other clothing.
8. Estimate confidence from 0-100.

`;


const response =
await askGemini(
prompt,
imageBase64
);




try {


let clean =
response
.replace(/```json/g,"")
.replace(/```/g,"")
.trim();



return JSON.parse(clean);



}

catch(error){


console.error(
"AI JSON ERROR:",
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


}
