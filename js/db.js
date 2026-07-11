// db.js
// FashionAI Central Database Engine


const DATABASE_VERSION = 3;




// =================================================
// OPEN USER DATABASE
// =================================================


export function openDatabase(uid){


return new Promise((resolve,reject)=>{


const request =
indexedDB.open(

"FashionAI_"+uid,

DATABASE_VERSION

);





request.onupgradeneeded =
(event)=>{


const db =
event.target.result;





// =============================
// WARDROBE STORAGE
// =============================


if(
!db.objectStoreNames.contains("wardrobe")
){


const wardrobe =
db.createObjectStore(

"wardrobe",

{

keyPath:"id",

autoIncrement:true

}

);





wardrobe.createIndex(
"category",
"category"
);



wardrobe.createIndex(
"type",
"type"
);



wardrobe.createIndex(
"color",
"color"
);



wardrobe.createIndex(
"style",
"style"
);



wardrobe.createIndex(
"season",
"season"
);



wardrobe.createIndex(
"laundryStatus",
"laundryStatus"
);



}







// =============================
// SAVED AI OUTFITS
// =============================


if(
!db.objectStoreNames.contains("outfits")
){


db.createObjectStore(

"outfits",

{

keyPath:"id",

autoIncrement:true

}

);


}







// =============================
// WEAR HISTORY
// =============================


if(
!db.objectStoreNames.contains("history")
){


db.createObjectStore(

"history",

{

keyPath:"id",

autoIncrement:true

}

);


}







// =============================
// USER STYLE MEMORY
// =============================


if(
!db.objectStoreNames.contains("preferences")
){


db.createObjectStore(

"preferences",

{

keyPath:"id",

autoIncrement:true

}

);


}







// =============================
// AI FEEDBACK
// =============================


if(
!db.objectStoreNames.contains("feedback")
){


db.createObjectStore(

"feedback",

{

keyPath:"id",

autoIncrement:true

}

);


}



};







request.onsuccess =
(event)=>{


resolve(

event.target.result

);


};







request.onerror =
(event)=>{


reject(

event.target.error

);


};





});


}









// =================================================
// ADD CLOTHING
// =================================================


export function addClothing(
db,
clothing
){


return new Promise(
(resolve,reject)=>{


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
store.add({

...clothing,


timesWorn:0,


favorite:false,


laundryStatus:
"Clean",


createdAt:
Date.now()


});






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









// =================================================
// GET ALL CLOTHES
// =================================================


export function getClothes(db){


return new Promise(
(resolve,reject)=>{


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









// =================================================
// DELETE CLOTHING
// =================================================


export function deleteClothing(
db,
id
){


const transaction =
db.transaction(

"wardrobe",

"readwrite"

);



transaction
.objectStore(
"wardrobe"
)
.delete(id);


}









// =================================================
// SAVE AI OUTFIT
// =================================================


export function saveOutfit(
db,
outfit
){


return new Promise(
(resolve,reject)=>{


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









// =================================================
// GET SAVED OUTFITS
// =================================================


export function getSavedOutfits(db){


return new Promise(
(resolve,reject)=>{


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









// =================================================
// SAVE WEAR HISTORY
// =================================================


export function saveWearHistory(
db,
outfit
){


return new Promise(
(resolve,reject)=>{


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

outfit,


date:
new Date()
.toISOString(),


timesWorn:1


});






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









// =================================================
// GET WEAR HISTORY
// =================================================


export function getWearHistory(db){


return new Promise(
(resolve,reject)=>{


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









// =================================================
// SAVE STYLE PREFERENCES
// =================================================


export function savePreference(
db,
preference
){


const transaction =
db.transaction(

"preferences",

"readwrite"

);



transaction
.objectStore(
"preferences"
)
.add({

...preference,


createdAt:
Date.now()


});


}









// =================================================
// GET STYLE PREFERENCES
// =================================================


export function getPreferences(db){


return new Promise(
(resolve,reject)=>{


const transaction =
db.transaction(

"preferences",

"readonly"

);



const store =
transaction.objectStore(
"preferences"
);





const request =
store.getAll();





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









// =================================================
// SAVE AI FEEDBACK
// =================================================


export function saveFeedback(
db,
feedback
){


const transaction =
db.transaction(

"feedback",

"readwrite"

);



transaction
.objectStore(
"feedback"
)
.add({

feedback,


createdAt:
Date.now()


});


}









// =================================================
// GET AI FEEDBACK
// =================================================


export function getFeedback(db){


return new Promise(
(resolve,reject)=>{


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
