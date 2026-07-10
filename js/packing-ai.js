// packing-ai.js
// FashionAI Smart Travel Packing Assistant


import {
    getClothes
} from "./db.js";

import {
    askGemini
} from "./gemini.js";




// ==========================
// GENERATE PACKING PLAN
// ==========================


export async function generatePackingPlan(
database,
destination,
days,
activities
){


try{


const clothes =
await getClothes(
database
);





const wardrobe =
clothes.map(item=>{


return {

id:item.id,

type:item.type,

category:item.category,

color:item.primaryColor,

style:item.style,

material:item.material,

occasion:item.occasions,

season:item.season

};


});







const prompt = `


You are FashionAI, an expert travel fashion stylist.


Create a travel packing plan.


Destination:
${destination}


Trip duration:
${days} days


Activities:
${activities}



Available wardrobe:

${JSON.stringify(
wardrobe,
null,
2
)}



Rules:

1. Use only available clothing.
2. Create daily outfits.
3. Avoid repeating the same outfit.
4. Consider weather and culture.
5. Suggest versatile combinations.
6. Explain why each outfit works.



Return a clear travel outfit schedule.


`;





const answer =
await askGemini(
prompt
);



return answer;



}

catch(error){


console.error(
"Packing AI Error:",
error
);


return "Unable to create packing plan.";

}


}
