// stylist-ai.js
// FashionAI Personal Stylist


import {
    getClothes
} from "./db.js";

import {
    askGemini
} from "./gemini.js";




// ==========================
// AI STYLIST RESPONSE
// ==========================

export async function askStylist(
    database,
    question
){



try{


// GET USER WARDROBE

const clothes =
await getClothes(database);





if(clothes.length===0){

return `
I need your wardrobe first.
Please upload some clothes so I can style you.
`;

}




// CREATE WARDROBE SUMMARY


const wardrobe =
clothes.map(item=>({


type:item.type,

category:item.category,

color:item.primaryColor,

style:item.style,

material:item.material,

occasion:item.occasions,


}))
.slice(0,100);







const prompt = `


You are FashionAI, an expert worldwide personal fashion stylist.


User wardrobe:

${JSON.stringify(wardrobe,null,2)}



User question:

${question}



Your job:

1. Recommend outfits using ONLY the available wardrobe.
2. Explain why the outfit works.
3. Consider:
   - color harmony
   - fashion rules
   - occasion
   - season
   - current style trends
   - comfort
4. Suggest alternatives if needed.
5. Be creative but realistic.


Answer like a professional stylist.


`;





const answer =
await askGemini(
prompt
);



return answer;



}

catch(error){


console.error(
"Stylist AI Error:",
error
);



return "FashionAI is unavailable right now.";

}



}
