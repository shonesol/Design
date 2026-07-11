// style-learning.js
// FashionAI User Style Intelligence


import {
getClothes
}
from "./db.js";


import {
getLearningData
}
from "./feedback-ai.js";




// ==========================
// ANALYZE USER STYLE
// ==========================


export async function analyzeUserStyle(

database

){



const clothes =

await getClothes(

database

);



const feedback =

await getLearningData(

database

);






let styles = {};

let colors = {};

let occasions = {};

let materials = {};





// ==========================
// LEARN FROM WARDROBE
// ==========================


clothes.forEach(item=>{



if(item.style){


styles[item.style] =

(styles[item.style] || 0) + 1;


}



if(item.color){


colors[item.color] =

(colors[item.color] || 0) + 1;


}




if(item.occasion){


occasions[item.occasion] =

(occasions[item.occasion] || 0) + 1;


}





if(item.material){


materials[item.material] =

(materials[item.material] || 0) + 1;


}



});







// ==========================
// LEARN FROM FEEDBACK
// ==========================


feedback.forEach(item=>{



if(
item.type==="like"
){



const outfit =
item.outfit;



if(outfit.top.style){


styles[outfit.top.style] =

(styles[outfit.top.style] || 0)+3;


}



if(outfit.top.color){


colors[outfit.top.color] =

(colors[outfit.top.color] || 0)+3;


}



}







if(
item.type==="dislike"
){


const outfit =
item.outfit;



if(outfit.top.style){


styles[outfit.top.style] =

(styles[outfit.top.style] || 0)-2;


}



}



});









// ==========================
// SORT RESULTS
// ==========================


const favoriteStyles =

Object.keys(styles)

.sort(
(a,b)=>

styles[b]-styles[a]

)

.slice(0,5);






const favoriteColors =

Object.keys(colors)

.sort(
(a,b)=>

colors[b]-colors[a]

)

.slice(0,5);






const favoriteOccasions =

Object.keys(occasions)

.sort(
(a,b)=>

occasions[b]-occasions[a]

)

.slice(0,5);







const fashionPersonality =

detectPersonality(

favoriteStyles

);







return {


favoriteStyles,


favoriteColors,


favoriteOccasions,


favoriteMaterials:

Object.keys(materials),


fashionPersonality



};


}









// ==========================
// DETECT PERSONALITY
// ==========================


function detectPersonality(styles){



const value =

styles.join(" ")
.toLowerCase();






if(
value.includes("luxury")
||
value.includes("formal")
){

return "Elegant & Luxury";


}






if(
value.includes("streetwear")
||
value.includes("urban")
){

return "Modern Street Style";


}






if(
value.includes("traditional")
){

return "Cultural & Traditional";


}






if(
value.includes("sporty")
){

return "Active & Sporty";


}






return "Smart Casual Explorer";



}
