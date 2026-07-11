// ai-learning.js
// FashionAI Long Term Learning Engine


import {
getClothes
}
from "./db.js";


import {
getLearningData
}
from "./feedback-ai.js";




// ==========================
// MAIN LEARNING FUNCTION
// ==========================


export async function learnUserFashion(

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





const memory = {


totalClothes:

clothes.length,



likedOutfits:

0,


dislikedOutfits:

0,



preferredStyles:{},


preferredColors:{},


preferredOccasions:{},


};


 



// ==========================
// LEARN FROM WARDROBE
// ==========================


clothes.forEach(item=>{



if(item.style){


memory.preferredStyles[item.style] =


(memory.preferredStyles[item.style] || 0)+1;



}



if(item.color){


memory.preferredColors[item.color] =


(memory.preferredColors[item.color] || 0)+1;



}



if(item.occasion){


memory.preferredOccasions[item.occasion] =


(memory.preferredOccasions[item.occasion] || 0)+1;



}



});









// ==========================
// LEARN FROM FEEDBACK
// ==========================


feedback.forEach(item=>{



if(
item.type==="like"
){


memory.likedOutfits++;



learnOutfit(

memory,

item.outfit,

3

);



}





if(
item.type==="dislike"
){


memory.dislikedOutfits++;



learnOutfit(

memory,

item.outfit,

-2

);



}



});







// SAVE MEMORY


await saveMemory(

database,

memory

);



return memory;


}









// ==========================
// LEARN OUTFIT PATTERN
// ==========================


function learnOutfit(

memory,

outfit,

points

){



const pieces=[


outfit.top,

outfit.bottom,

outfit.shoe


];





pieces.forEach(item=>{



if(item.style){


memory.preferredStyles[item.style] =


(memory.preferredStyles[item.style] || 0)

+

points;



}



if(item.color){


memory.preferredColors[item.color] =


(memory.preferredColors[item.color] || 0)

+

points;



}



});



}









// ==========================
// SAVE AI MEMORY
// ==========================


function saveMemory(

database,

memory

){



return new Promise((resolve,reject)=>{



const transaction =

database.transaction(

"preferences",

"readwrite"

);



const store =

transaction.objectStore(

"preferences"

);



store.put({

id:1,


type:"fashionMemory",


data:memory,


updated:

Date.now()


});





transaction.oncomplete=()=>{


resolve(true);


};



transaction.onerror=()=>{


reject(
transaction.error
);


};



});


}
