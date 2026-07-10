// FashionAI Personal Style Brain


import {
getClothes
}
from "./db.js";




// ANALYZE USER STYLE

export async function analyzeUserStyle(db){


const clothes =
await getClothes(db);



if(clothes.length===0){


return {

favoriteColors:[],

favoriteStyles:[],

fashionPersonality:"New User"

};


}



let colors={};

let styles={};





clothes.forEach(item=>{


// COLORS

if(item.color){


let color =
item.color
.toLowerCase();


colors[color] =
(colors[color] || 0)+1;


}





// STYLES

if(item.style){


let style =
item.style
.toLowerCase();


styles[style] =
(styles[style] || 0)+1;


}



});







let favoriteColors =
Object.keys(colors)
.sort(
(a,b)=>
colors[b]-colors[a]
)
.slice(0,5);







let favoriteStyles =
Object.keys(styles)
.sort(
(a,b)=>
styles[b]-styles[a]
)
.slice(0,3);






return {


favoriteColors,


favoriteStyles,


fashionPersonality:
detectPersonality(
favoriteStyles
)


};



}







function detectPersonality(styles){



if(
styles.some(
s=>s.includes("old money")
)
)

return "Elegant Classic";





if(
styles.some(
s=>s.includes("streetwear")
)
)

return "Urban Trendsetter";





if(
styles.some(
s=>s.includes("minimal")
)
)

return "Modern Minimalist";





if(
styles.some(
s=>s.includes("business")
)
)

return "Professional Style";





if(
styles.some(
s=>s.includes("traditional")
)
)

return "Cultural Fashion Explorer";





return "Balanced Fashion Explorer";


}
