// clothing-ai.js

import { askGemini } from "./gemini.js";


export async function analyzeClothing(imageBase64){


const prompt = `

You are an AI fashion vision expert.

Analyze this clothing image.

Return ONLY valid JSON.

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

type examples:
shirt, tshirt, jeans, trousers, dress, shoes, jacket, hoodie, skirt

style examples:
casual, formal, luxury, sporty, streetwear, elegant

Identify the exact main color name and HEX code.

`;



try{


const result =
await askGemini(
prompt,
imageBase64
);



return JSON.parse(result);



}

catch(error){


console.error(
"AI analysis failed:",
error
);



return {


type:"unknown",

color:"unknown",

hex:"#000000",

secondaryColor:"",

pattern:"unknown",

material:"unknown",

style:"casual",

occasion:"any",

season:"all",

confidence:"0%"


};


}


}
