// recommendation-engine.js
// FashionAI Final Outfit Decision Engine


import {
    outfitColorScore
} from "./color-engine.js";


import {
    analyzeTrend
} from "./trend-engine.js";




// ==========================
// OCCASION ANALYSIS
// ==========================


function occasionScore(outfit, occasion){


let score = 50;


outfit.forEach(item=>{


if(item.occasions){


if(
item.occasions
.includes(occasion)
){

score +=15;

}


}


});



if(score>100)
score=100;


return score;

}







// ==========================
// WEATHER ANALYSIS
// ==========================


function weatherScore(
outfit,
weather
){


if(!weather)
return 70;



let score=70;



outfit.forEach(item=>{


if(
item.weatherSuitability
&&
item.weatherSuitability
.includes(weather)
){

score +=10;

}


});



if(score>100)
score=100;



return score;


}






// ==========================
// HISTORY SCORE
// ==========================


function historyScore(outfit,history){


let score=100;



if(!history)
return score;




history.forEach(old=>{


const oldOutfit =
old.outfit;



const ids =
outfit.map(
item=>item.id
);



if(
ids.includes(oldOutfit.top)
&&
ids.includes(oldOutfit.bottom)
&&
ids.includes(oldOutfit.shoe)
){


score-=30;


}



});



if(score<20)
score=20;


return score;


}







// ==========================
// FINAL AI SCORE
// ==========================


export function calculateFashionScore(
outfit,
occasion,
weather,
history
){



const color =
outfitColorScore(
outfit
);



const trend =
analyzeTrend(
outfit
)
.trendScore;



const occasionRating =
occasionScore(
outfit,
occasion
);



const weatherRating =
weatherScore(
outfit,
weather
);



const memory =
historyScore(
outfit,
history
);






const final = Math.round(


(
color*0.30
+
trend*0.25
+
occasionRating*0.20
+
weatherRating*0.15
+
memory*0.10

)


);



return {


score:final,


details:{


color,


trend,


occasion:occasionRating,


weather:weatherRating,


history:memory


}



};



}
