// clothing-ai.js

import { askGemini } from "./gemini.js";



export async function analyzeClothing(imageBase64){


console.log(
"🤖 AI analyzing clothing image..."
);



const prompt = `

You are an advanced AI fashion stylist and clothing recognition system.

Analyze the clothing image provided.

Return ONLY JSON.
Do not add explanations.

JSON FORMAT:

{
"type":"",
"color":"",
"hex":"",
"secondaryColor":"",
"pattern":"",
"material":"",
"style":"",
"occasion":"",
"season":"",
"confidence":""
}


Rules:

type:
shirt,
tshirt,
jeans,
trousers,
pants,
dress,
skirt,
jacket,
hoodie,
shoes,
suit,
coat,
other


style:
casual,
formal,
luxury,
sporty,
streetwear,
elegant


occasion:
office,
party,
travel,
date,
wedding,
sport,
daily


season:
summer,
winter,
rainy,
all-season


Identify:
- exact color name
- HEX color code
- patterns
- fabric/material
- fashion style


`;



try{


const response = await askGemini(
prompt,
imageBase64
);



console.log(
"AI RESULT:",
response
);



const clean =
response
.replace("```json","")
.replace("```","")
.trim();



return JSON.parse(clean);



}

catch(error){


console.error(
"Clothing AI Error:",
error
);



return {


type:"unknown",

color:"unknown",

hex:"#000000",

secondaryColor:"unknown",

pattern:"unknown",

material:"unknown",

style:"casual",

occasion:"daily",

season:"all-season",

confidence:"0%"


};


}


}
