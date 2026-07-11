// style-learning.js
// FashionAI Personal Style Brain


import {
getClothes
}
from "./db.js";





// ==========================
// ANALYZE USER STYLE
// ==========================


export async function analyzeUserStyle(db){



const clothes =

await getClothes(db);






if(
clothes.length===0
){


return {


favoriteColors:[],

favoriteStyles:[],

favoriteOccasions:[],

favoriteMaterials:[],

favoritePatterns:[],

fashionPersonality:"New User"


};


}






let colors={};

let styles={};

let occasions={};

let materials={};

let patterns={};







clothes.forEach(item=>{



// COLORS

if(item.color){


const color =
item.color.toLowerCase();


colors[color] =
(colors[color] || 0)+1;


}





// STYLE

if(item.style){


const style =
item.style;


styles[style] =
(styles[style] || 0)+1;


}





// OCCASION

if(item.occasion){


const occasion =
item.occasion;


occasions[occasion] =
(occasions[occasion] || 0)+1;


}






// MATERIAL

if(item.material){


const material =
item.material;


materials[material] =
(materials[material] || 0)+1;


}






// PATTERN

if(item.pattern){


const pattern =
item.pattern;


patterns[pattern] =
(patterns[pattern] || 0)+1;


}



});










return {


favoriteColors:

getTopValues(colors,5),



favoriteStyles:

getTopValues(styles,5),



favoriteOccasions:

getTopValues(occasions,5),



favoriteMaterials:

getTopValues(materials,5),



favoritePatterns:

getTopValues(patterns,5),



fashionPersonality:

detectPersonality(

styles,

colors

)



};




}









// ==========================
// TOP VALUES
// ==========================


function getTopValues(

object,

limit

){


return Object.keys(object)

.sort(

(a,b)=>

object[b]-object[a]

)

.slice(

0,

limit

);


}









// ==========================
// FASHION PERSONALITY
// ==========================


function detectPersonality(

styles,

colors

){



const userStyles =

Object.keys(styles);





if(

userStyles.includes(
"Old Money"
)

)

return "Elegant Classic";





if(

userStyles.includes(
"Streetwear"
)

)

return "Urban Trendsetter";





if(

userStyles.includes(
"Minimalist"
)

)

return "Modern Minimalist";





if(

userStyles.includes(
"Business"
)

)

return "Professional Style";






if(

userStyles.includes(
"Traditional"
)

)

return "Cultural Fashion Lover";






return "Balanced Fashion Explorer";



}
