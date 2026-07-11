// ai-learning.js
// FashionAI Personal Learning Brain


import {
getWearHistory,
getFeedback,
savePreference
}
from "./db.js";

import {
getClothes
}
from "./db.js";





// =================================
// LEARN FROM WEAR HISTORY
// =================================


export async function learnUserFashion(
db
){



const history =
await getWearHistory(db);



const clothes =
await getClothes(db);



let colors={};

let styles={};

let items={};





// Analyze worn outfits


history.forEach(record=>{


const outfit =
record.outfit;





if(!outfit)
return;





const pieces=[


outfit.top,

outfit.bottom,

outfit.shoe


];





pieces.forEach(item=>{


if(!item)
return;





// COLORS


if(item.color){


let color =
item.color.toLowerCase();


colors[color] =
(colors[color]||0)+1;


}







// STYLES


if(item.style){


styles[item.style] =
(styles[item.style]||0)+1;


}







// MOST WORN ITEMS


if(item.name){


items[item.name] =
(items[item.name]||0)+1;


}



});



});







const favoriteColors =
Object.keys(colors)
.sort(
(a,b)=>colors[b]-colors[a]
)
.slice(0,5);






const favoriteStyles =
Object.keys(styles)
.sort(
(a,b)=>styles[b]-styles[a]
)
.slice(0,5);








const mostWorn =
Object.keys(items)
.sort(
(a,b)=>items[b]-items[a]
)
.slice(0,5);









const memory={


favoriteColors,

favoriteStyles,

mostWorn,


updated:
Date.now()


};







await savePreference(
db,
memory
);






return memory;


}









// =================================
// GET PERSONAL STYLE MEMORY
// =================================


export async function getFashionMemory(
db
){



const preferences =
await import("./db.js")
.then(module=>

module.getPreferences(db)

);





if(
preferences.length===0
){


return {


favoriteColors:[],


favoriteStyles:[],


mostWorn:[]

};


}





return preferences[
preferences.length-1
];


}
