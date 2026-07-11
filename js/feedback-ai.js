// feedback-ai.js
// FashionAI Preference Learning Memory


// ==========================
// SAVE LIKE
// ==========================


export async function likeOutfit(

db,

outfit

){


return saveFeedback(

db,

{

type:"like",

outfit:extractOutfitData(outfit),

date:Date.now()

}

);


}







// ==========================
// SAVE DISLIKE
// ==========================


export async function dislikeOutfit(

db,

outfit

){


return saveFeedback(

db,

{

type:"dislike",

outfit:extractOutfitData(outfit),

date:Date.now()

}

);


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





request.onsuccess=()=>{


resolve(

request.result

);


};





request.onerror=()=>{


reject(

request.error

);


};



});


}









// ==========================
// GET LEARNING DATA
// ==========================


export function getLearningData(db){


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





request.onsuccess=()=>{


resolve(

request.result || []

);


};





request.onerror=()=>{


reject(

request.error

);


};



});


}









// ==========================
// EXTRACT IMPORTANT STYLE DATA
// ==========================


function extractOutfitData(outfit){


return {


top:{

name:
outfit.top?.name,

color:
outfit.top?.color,

style:
outfit.top?.style

},



bottom:{

name:
outfit.bottom?.name,

color:
outfit.bottom?.color,

style:
outfit.bottom?.style

},



shoe:{

name:
outfit.shoe?.name,

color:
outfit.shoe?.color,

style:
outfit.shoe?.style

}



};


}
