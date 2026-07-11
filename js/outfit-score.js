// outfit-score.js
// FashionAI Professional Outfit Scoring Engine


import {
getLearningData
}
from "./feedback-ai.js";


import {
getColorMatchScore
}
from "./color-ai.js";




// =====================================
// MAIN OUTFIT SCORE
// =====================================


export async function scoreOutfit(

database,

top,

bottom,

shoe,

profile = {},

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


top.style,

bottom.style,

shoe.style


]

.filter(Boolean)

.map(style=>

style.toLowerCase()

);







(profile.favoriteStyles || [])

.forEach(style=>{


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


(profile.favoriteColors || [])

.forEach(color=>{


const fav =

color.toLowerCase();





if(

top.color?.toLowerCase()===fav

){


score +=10;


}





if(

bottom.color?.toLowerCase()===fav

){


score +=10;


}





if(

shoe.color?.toLowerCase()===fav

){


score +=5;


}



});









// =====================================
// OCCASION MATCH
// =====================================


let occasionList = [];



if(

Array.isArray(occasionStyles)

){


occasionList = occasionStyles;


}

else if(occasionStyles){


occasionList = [

occasionStyles

];


}






occasionList.forEach(style=>{


if(

styles.includes(

style.toLowerCase()

)

){


score +=15;


}



});







// USER OCCASION MEMORY


(profile.favoriteOccasions || [])

.forEach(occasion=>{


if(

top.occasion === occasion ||

bottom.occasion === occasion ||

shoe.occasion === occasion

){


score +=10;


}



});









// =====================================
// WEATHER MATCH
// =====================================


if(weather){





if(

weather.condition === "Rainy"

){



if(

shoe.type &&

shoe.type

.toLowerCase()

.includes("boot")

){


score +=10;


}



}







if(

weather.temperature > 28

){



if(

top.material === "Cotton" ||

top.material === "Linen"

){


score +=5;


}



}







if(

weather.temperature < 18

){



if(

top.material === "Wool" ||

top.material === "Jacket"

){


score +=5;


}



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



if(

item.type==="like"

){



if(

item.outfit?.top?.style === top.style &&

item.outfit?.bottom?.style === bottom.style

){


score +=5;


}



}







if(

item.type==="dislike"

){



if(

item.outfit?.top?.style === top.style &&

item.outfit?.bottom?.style === bottom.style

){


score -=5;


}



}



});









// =====================================
// QUALITY BONUS
// =====================================



if(

top.brand &&

bottom.brand &&

top.brand === bottom.brand

){


score +=5;


}





if(

top.material &&

bottom.material &&

top.material === bottom.material

){


score +=5;


}









// =====================================
// LAUNDRY CONDITION
// =====================================


[

top,

bottom,

shoe

]

.forEach(item=>{


if(

item.laundryStatus==="Clean"

){


score +=3;


}



if(

item.laundryStatus==="Needs Washing"

){


score -=20;


}



});









// =====================================
// PERSONALITY MATCH
// =====================================


const personality =

profile.fashionPersonality || "";







if(

personality==="Elegant Classic"

&&

styles.includes("formal")

){


score +=10;


}







if(

personality==="Urban Trendsetter"

&&

styles.includes("streetwear")

){


score +=10;


}







if(

personality==="Modern Minimalist"

&&

styles.includes("minimalist")

){


score +=10;


}







if(

personality==="Luxury Fashion Lover"

&&

styles.includes("luxury")

){


score +=10;


}









// =====================================
// FINAL SCORE
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
