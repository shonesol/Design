// outfit-score.js
// FashionAI Professional Outfit Scoring Engine

import { getLearningData } from "./feedback-ai.js";
import { getColorMatchScore } from "./color-ai.js";


// =====================================
// MAIN OUTFIT SCORE
// =====================================

export async function scoreOutfit(

database,

top,

bottom,

shoe,

profile,

weather,

occasionStyles

){

let score = 0;



// =====================================
// COLOR HARMONY
// =====================================

score += getColorMatchScore(
top.color,
bottom.color
);

score += getColorMatchScore(
bottom.color,
shoe.color
);



// =====================================
// STYLE MATCH
// =====================================

const styles = [

top.style?.toLowerCase(),

bottom.style?.toLowerCase(),

shoe.style?.toLowerCase()

];



(profile.favoriteStyles || []).forEach(style=>{

if(
styles.includes(
style.toLowerCase()
)
){

score += 20;

}

});



// =====================================
// FAVORITE COLORS
// =====================================

(profile.favoriteColors || []).forEach(color=>{

if(

top.color &&
top.color.toLowerCase()===color.toLowerCase()

){

score += 10;

}

});



// =====================================
// OCCASION MATCH
// =====================================

(occasionStyles || []).forEach(style=>{

if(

styles.includes(
style.toLowerCase()
)

){

score += 15;

}

});



// =====================================
// WEATHER MATCH
// =====================================

if(

weather &&
weather.condition==="Rainy"

){

if(

shoe.type &&
shoe.type.toLowerCase().includes("boot")

){

score += 10;

}

}




// =====================================
// USER FEEDBACK LEARNING
// =====================================

const feedback =
await getLearningData(
database
);



feedback.forEach(item=>{

if(item.type==="like"){

score += 3;

}

if(item.type==="dislike"){

score -= 3;

}

});




// =====================================
// BONUS POINTS
// =====================================

if(
top.brand &&
bottom.brand &&
top.brand===bottom.brand
){

score += 5;

}



if(
top.material &&
bottom.material &&
top.material===bottom.material
){

score += 5;

}



if(
top.season &&
weather &&
weather.season &&
top.season===weather.season
){

score += 5;

}




// =====================================
// LIMIT SCORE
// =====================================

score =
Math.max(
0,
Math.min(
100,
Math.round(score)
)
);



return score;

}
