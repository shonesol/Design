// fashion-stylist-ai.js
// FashionAI Personal Stylist Explanation Engine


import {
askGemini
}
from "./gemini.js";




// ==========================
// EXPLAIN OUTFIT
// ==========================


export async function explainOutfit(

outfit,

profile,

occasion,

weather

){



const prompt = `


You are FashionAI, a professional global fashion stylist.



Create a short stylish explanation for this recommended outfit.



USER FASHION PERSONALITY:

${profile.fashionPersonality || "Smart Casual Explorer"}




USER FAVOURITE COLORS:

${
(profile.favoriteColors || [])
.join(", ")
}





USER FAVOURITE STYLES:

${
(profile.favoriteStyles || [])
.join(", ")
}





OCCASION:

${occasion}




WEATHER:

${weather?.condition || "Normal weather"}







OUTFIT DETAILS:

TOP:

Name:
${outfit.top.name || outfit.top.type}

Color:
${outfit.top.color}

Style:
${outfit.top.style}

Material:
${outfit.top.material || "Unknown"}






BOTTOM:

Name:
${outfit.bottom.name || outfit.bottom.type}

Color:
${outfit.bottom.color}

Style:
${outfit.bottom.style}

Material:
${outfit.bottom.material || "Unknown"}







SHOES:

Name:
${outfit.shoe.name || outfit.shoe.type}

Color:
${outfit.shoe.color}

Style:
${outfit.shoe.style}








Explain:

1. Why these clothes match.

2. Why the colors create harmony.

3. Why this outfit fits the occasion.

4. One professional fashion tip.



Rules:

- Keep it under 120 words.
- Sound like a luxury fashion consultant.
- Be encouraging.
- Do not mention AI.

`;







const response =

await askGemini(

prompt

);



return response;


}
