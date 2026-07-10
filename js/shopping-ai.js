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
// ANALYZE SHOPPING NEEDS
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





let categories = {};

let colors = {};





// ANALYZE WARDROBE


clothes.forEach(item=>{


let category =
item.category ||
"Unknown";



categories[category] =
(categories[category] || 0)+1;





if(item.color){


let color =
item.color.toLowerCase();



colors[color] =
(colors[color] || 0)+1;


}



});







let recommendations=[];






// ==========================
// BASIC ESSENTIALS
// ==========================


if(
!categories.Top ||
categories.Top < 3
){


recommendations.push({

item:
"Quality shirts, blouses or tops",

reason:
"Your wardrobe needs more upper-body combinations."

});


}






if(
!categories.Bottom ||
categories.Bottom < 3
){


recommendations.push({

item:
"Versatile trousers, jeans or skirts",

reason:
"More bottoms will create more outfit combinations."

});


}







if(
!categories.Outerwear
){


recommendations.push({

item:
"Neutral blazer or jacket",

reason:
"Adds smart casual and formal styling options."

});


}







if(
!categories.Shoes ||
categories.Shoes < 2
){


recommendations.push({

item:
"Different occasion shoes",

reason:
"You need footwear for casual and formal looks."

});


}







// ==========================
// COLOR INTELLIGENCE
// ==========================


if(
!colors.black
){


recommendations.push({

item:
"Black clothing piece",

reason:
"Black is a versatile color that matches many outfits."

});


}





if(
!colors.white
){


recommendations.push({

item:
"White basic piece",

reason:
"White improves outfit combinations."

});


}







// ==========================
// STYLE BASED ADVICE
// ==========================


if(
style.favoriteStyles.includes(
"business"
)

&&
!categories.Outerwear

){


recommendations.push({

item:
"Professional blazer",

reason:
"Matches your business style preference."

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
