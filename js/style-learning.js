// style-learning.js
// FashionAI Personal Style Learning System


import {
getClothes
} from "./db.js";

import {
getWearHistory
} from "./history.js";





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



const history =
await getWearHistory(
database
);





let colors = {};

let styles = {};

let categories = {};






// Analyze wardrobe


clothes.forEach(item=>{


if(item.primaryColor){


let color =
item.primaryColor;



colors[color] =
(colors[color] || 0)+1;


}




if(item.style){


styles[item.style] =
(styles[item.style] || 0)+1;


}





if(item.category){


categories[item.category] =
(categories[item.category] || 0)+1;


}



});






// Analyze worn outfits


history.forEach(item=>{


if(item.rating>=4){


console.log(
"User liked:",
item
);


}


});







return {


favoriteColors:
sortResults(colors),


favoriteStyles:
sortResults(styles),


favoriteCategories:
sortResults(categories),


totalClothes:
clothes.length,


totalOutfits:
history.length


};



}







// ==========================
// SORT PREFERENCES
// ==========================


function sortResults(data){


return Object.entries(data)

.sort(
(a,b)=>
b[1]-a[1]
)

.slice(0,5)

.map(item=>item[0]);


}
