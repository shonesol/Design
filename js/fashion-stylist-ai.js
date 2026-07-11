import {
askGemini
}
from "./gemini.js";





export async function explainOutfit(
outfit,
profile,
occasion,
weather
){



const prompt = `

You are FashionAI, an expert global fashion stylist.

Analyze this outfit recommendation.


USER STYLE:

${profile.fashionPersonality}


FAVOURITE COLORS:

${profile.favoriteColors.join(", ")}



OCCASION:

${occasion}



WEATHER:

${weather.condition}



CLOTHING:


Top:

${outfit.top.name || outfit.top.type}

Color:
${outfit.top.color}

Style:
${outfit.top.style}



Bottom:

${outfit.bottom.name || outfit.bottom.type}

Color:
${outfit.bottom.color}

Style:
${outfit.bottom.style}



Shoes:

${outfit.shoe.name || outfit.shoe.type}

Color:
${outfit.shoe.color}

Style:
${outfit.shoe.style}




Explain:

1. Why these pieces match.
2. Why the colors work.
3. When to wear this outfit.
4. Fashion advice to improve the look.



Keep answer short and stylish.

`;





const response =
await askGemini(
prompt
);



return response;


}
