// db.js
// FashionAI Database Operations Engine
// Uses database from database-manager.js


// ==========================
// ADD CLOTHING
// ==========================

export function addClothing(
db,
clothing
){

return new Promise((resolve,reject)=>{


const transaction =

db.transaction(
"wardrobe",
"readwrite"
);



const store =

transaction.objectStore(
"wardrobe"
);



const request =

store.add(clothing);



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
// GET ALL CLOTHES
// ==========================


export function getClothes(
db
){


return new Promise((resolve,reject)=>{


const transaction =

db.transaction(
"wardrobe",
"readonly"
);



const store =

transaction.objectStore(
"wardrobe"
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
// DELETE CLOTHING
// ==========================


export function deleteClothing(
db,
id
){


return new Promise((resolve,reject)=>{


const transaction =

db.transaction(
"wardrobe",
"readwrite"
);



const store =

transaction.objectStore(
"wardrobe"
);



const request =

store.delete(id);



request.onsuccess = ()=>{

resolve(true);

};



request.onerror = ()=>{

reject(
request.error
);

};



});


}









// ==========================
// UPDATE CLOTHING
// ==========================


export function updateClothing(
db,
clothing
){


return new Promise((resolve,reject)=>{


const transaction =

db.transaction(
"wardrobe",
"readwrite"
);



const store =

transaction.objectStore(
"wardrobe"
);



const request =

store.put(clothing);



request.onsuccess = ()=>{

resolve(true);

};



request.onerror = ()=>{

reject(
request.error
);

};



});


}









// ==========================
// SAVE WEAR HISTORY
// ==========================


export function saveWearHistory(
db,
outfit
){


return new Promise((resolve,reject)=>{


const transaction =

db.transaction(
"history",
"readwrite"
);



const store =

transaction.objectStore(
"history"
);




const request =

store.add({

outfit:outfit,


date:
Date.now()


});





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
// GET WEAR HISTORY
// ==========================


export function getWearHistory(
db
){


return new Promise((resolve,reject)=>{


const transaction =

db.transaction(
"history",
"readonly"
);



const store =

transaction.objectStore(
"history"
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
// SAVE OUTFIT
// ==========================


export function saveOutfit(
db,
outfit
){


return new Promise((resolve,reject)=>{


const transaction =

db.transaction(
"outfits",
"readwrite"
);



const store =

transaction.objectStore(
"outfits"
);



const request =

store.add({

outfit,

createdAt:
Date.now()

});



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
// GET SAVED OUTFITS
// ==========================


export function getSavedOutfits(
db
){


return new Promise((resolve,reject)=>{


const transaction =

db.transaction(
"outfits",
"readonly"
);



const store =

transaction.objectStore(
"outfits"
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
