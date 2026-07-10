// shopping-ai.js
// FashionAI Smart Shopping Assistant



import {
getClothes
}
from "./db.js";

import {
analyzeUserStyle
}
from "./style-learning.js";





// ==========================
// FIND WARDROBE GAPS
// ==========================


export async function analyzeShoppingNeeds(
database
){


const clothes =
await getClothes(
database
);



const style =
await analyzeUserStyle(
database
);





let categories =
{};



clothes.forEach(item=>{


let category =
item.category ||
"Unknown";



categories[category] =
(categories[category]||0)+1;


});





let recommendations=[];





// Tops

if(
!categories.Top ||
categories.Top <3
){

recommendations.push({

item:
"Basic quality shirts",

reason:
"Your wardrobe needs more upper-body options."

});


}







// Jackets


if(
!categories.Jacket
){


recommendations.push({

item:
"Neutral jacket or blazer",


reason:
"Adds many outfit combinations."


});


}







// Shoes


if(
!categories.Shoes ||
categories.Shoes <2

){


recommendations.push({

item:
"Versatile shoes",


reason:
"Different occasions need different footwear."

});


}







// Colors


if(
!style.favoriteColors
.includes("black")
){


recommendations.push({

item:
"Black clothing piece",

reason:
"Black matches most colors."


});


}





return {


currentWardrobe:
categories,


styleProfile:
style,


shoppingRecommendations:
recommendations


};



}
// FashionAI Shopping Intelligence


export function analyzeWardrobeNeeds(
clothes
){


let categories={};


clothes.forEach(item=>{


let category =
item.category
||
"Unknown";



categories[category] =
(categories[category] || 0)+1;


});




let suggestions=[];





// Missing essentials


if(!categories["Outerwear"]){


suggestions.push({

item:
"Blazer or Jacket",

reason:
"Adds smart casual and formal outfit options"

});


}





if(!categories["Shoes"]){


suggestions.push({

item:
"Quality shoes",

reason:
"Completes outfit combinations"

});


}





if(
!categories["Accessories"]
){


suggestions.push({

item:
"Accessories",

reason:
"Watches, belts and bags improve styling"

});


}






// Too many similar items


if(
categories["Top"] > 10
){


suggestions.push({

item:
"More bottoms or jackets",

reason:
"You have many tops but need balance"

});


}





return suggestions;


}
