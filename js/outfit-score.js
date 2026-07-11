// outfit-score.js
// FashionAI Professional Outfit Scoring Engine

import { getLearningData } from "./feedback-ai.js";



// =====================================
// COLOR HARMONY
// =====================================

const colorGroups = {

black:["white","grey","red","pink","beige","camel","olive","navy"],

white:["black","navy","blue","grey","beige","brown","green"],

navy:["white","grey","beige","camel","brown","burgundy"],

blue:["white","grey","black","brown","tan"],

grey:["black","white","navy","burgundy","pink"],

brown:["beige","white","blue","olive","cream"],

beige:["brown","white","black","olive","camel"],

green:["brown","beige","white","black"],

olive:["white","cream","brown","black"],

red:["black","white","navy","grey"],

pink:["grey","white","black","navy"],

purple:["white","grey","black"],

yellow:["navy","black","white"],

orange:["navy","white","grey"],

cream:["brown","olive","black","navy"],

camel:["white","navy","black","cream"],

burgundy:["grey","white","black","navy"]

};




// =====================================
// COLOR SCORE
// =====================================

export function colorScore(a,b){

if(!a || !b) return 40;

a=a.toLowerCase();
b=b.toLowerCase();

if(a===b)
return 90;

if(
colorGroups[a] &&
colorGroups[a].includes(b)
)
return 100;

return 50;

}





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

let score=0;



// COLORS

score+=colorScore(
top.color,
bottom.color
);

score+=colorScore(
bottom.color,
shoe.color
);




// STYLE

const styles=[

top.style?.toLowerCase(),

bottom.style?.toLowerCase(),

shoe.style?.toLowerCase()

];



profile.favoriteStyles.forEach(style=>{

if(
styles.includes(
style.toLowerCase()
)
){
score+=20;
}

});




// USER COLORS

profile.favoriteColors.forEach(color=>{

if(
top.color?.toLowerCase()===color
)
score+=10;

});




// OCCASION

occasionStyles.forEach(style=>{

if(
styles.includes(
style.toLowerCase()
)
){
score+=15;
}

});




// WEATHER

if(
weather.condition==="Rainy"
){

if(
shoe.type
?.toLowerCase()
.includes("boot")
){
score+=10;
}

}




// AI FEEDBACK

const feedback =
await getLearningData(
database
);



feedback.forEach(item=>{

if(item.type==="like"){

score+=3;

}

if(item.type==="dislike"){

score-=3;

}

});




return Math.max(
0,
Math.min(
100,
Math.round(score)
)
);

}
