// feedback-ai.js
// FashionAI Preference Learning Memory


import {
exportFashionAI
}
from "./backup-manager.js";




// ==========================
// SAVE LIKE
// ==========================


export async function likeOutfit(

db,

outfit

){



const result =

await saveFeedback(

db,

{

type:"like",

outfit:

extractOutfitData(outfit),

date:Date.now()

}

);



// AUTO BACKUP

await exportFashionAI(

db

);



return result;


}









// ==========================
// SAVE DISLIKE
// ==========================


export async function dislikeOutfit(

db,

outfit

){



const result =

await saveFeedback(

db,

{

type:"dislike",

outfit:

extractOutfitData(outfit),

date:Date.now()

}

);



// AUTO BACKUP

await exportFashionAI(

db

);



return result;


}









// ==========================
// SAVE FEEDBACK
// ==========================


function saveFeedback(

db,

data

){



return new Promise((resolve,reject)=>{



const transaction =

db.transaction(

"feedback",

"readwrite"

);



const store =

transaction.objectStore(

"feedback"

);




const request =

store.add(data);





request.onsuccess = ()=>{


resolve(

request.result

);


};





request.onerror = ()=>{


reject(

request.error

);


};




});



}









// ==========================
// GET LEARNING DATA
// ==========================


export function getLearningData(

db

){



return new Promise((resolve,reject)=>{



const transaction =

db.transaction(

"feedback",

"readonly"

);



const store =

transaction.objectStore(

"feedback"

);





const request =

store.getAll();





request.onsuccess = ()=>{


resolve(

request.result || []

);


};





request.onerror = ()=>{


reject(

request.error

);


};




});



}









// ==========================
// EXTRACT OUTFIT DATA
// ==========================


function extractOutfitData(

outfit

){



return {


top:{


name:
outfit.top?.name || "",


type:
outfit.top?.type || "",


color:
outfit.top?.color || "",


style:
outfit.top?.style || "",


material:
outfit.top?.material || "",


occasion:
outfit.top?.occasion || ""

},







bottom:{


name:
outfit.bottom?.name || "",


type:
outfit.bottom?.type || "",


color:
outfit.bottom?.color || "",


style:
outfit.bottom?.style || "",


material:
outfit.bottom?.material || "",


occasion:
outfit.bottom?.occasion || ""

},







shoe:{


name:
outfit.shoe?.name || "",


type:
outfit.shoe?.type || "",


color:
outfit.shoe?.color || "",


style:
outfit.shoe?.style || "",


material:
outfit.shoe?.material || ""

}



};



}
