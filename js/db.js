// db.js
// FashionAI Local Intelligence Database
// IndexedDB Local Storage Engine


const DATABASE_VERSION = 4;



// =================================
// CREATE USER DATABASE
// =================================


export function openDatabase(uid){


return new Promise((resolve,reject)=>{


const request = indexedDB.open(

"FashionAI_" + uid,

DATABASE_VERSION

);



request.onupgradeneeded = (event)=>{


const db =
event.target.result;



// WARDROBE

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
"color",
"color"
);



wardrobe.createIndex(
"style",
"style"
);



wardrobe.createIndex(
"laundryStatus",
"laundryStatus"
);



}




// HISTORY


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





// FEEDBACK


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





// USER SETTINGS


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




};





request.onsuccess=(event)=>{


resolve(
event.target.result
);


};





request.onerror=()=>{


reject(
request.error
);


};



});


}








// =================================
// ADD CLOTHING
// =================================


export function addClothing(

db,

clothing

){


return new Promise((resolve,reject)=>{


const tx =

db.transaction(

"wardrobe",

"readwrite"

);



const store =

tx.objectStore(
"wardrobe"
);



const request =

store.add(clothing);





request.onsuccess=()=>{

resolve(request.result);

};



request.onerror=()=>{

reject(request.error);

};



});


}









// =================================
// GET CLOTHES
// =================================


export function getClothes(db){


return new Promise((resolve,reject)=>{


const tx =

db.transaction(

"wardrobe",

"readonly"

);



const store =

tx.objectStore(
"wardrobe"
);



const request =

store.getAll();





request.onsuccess=()=>{


resolve(
request.result || []
);


};



request.onerror=()=>{


reject(request.error);


};



});


}








// =================================
// DELETE CLOTHING
// =================================


export function deleteClothing(

db,

id

){


const tx =

db.transaction(

"wardrobe",

"readwrite"

);



tx.objectStore(
"wardrobe"
)
.delete(id);


}









// =================================
// SAVE WEAR HISTORY
// =================================


export function saveWearHistory(

db,

outfit

){


return new Promise((resolve,reject)=>{


const tx =

db.transaction(

"history",

"readwrite"

);



const store =

tx.objectStore(
"history"
);




const request =

store.add({

outfit:outfit,

date:

new Date()
.toISOString()

});




request.onsuccess=()=>{

resolve(request.result);

};



request.onerror=()=>{

reject(request.error);

};



});


}








// =================================
// GET HISTORY
// =================================


export function getWearHistory(db){


return new Promise((resolve,reject)=>{


const tx =

db.transaction(

"history",

"readonly"

);



const store =

tx.objectStore(
"history"
);



const request =

store.getAll();




request.onsuccess=()=>{


resolve(
request.result || []
);


};



request.onerror=()=>{


reject(request.error);


};



});


}









// =================================
// SAVE FEEDBACK
// =================================


export function saveFeedback(

db,

data

){


return new Promise((resolve,reject)=>{


const tx =

db.transaction(

"feedback",

"readwrite"

);



const store =

tx.objectStore(
"feedback"
);



const request =

store.add(data);



request.onsuccess=()=>{

resolve(request.result);

};



request.onerror=()=>{

reject(request.error);

};



});


}









// =================================
// GET FEEDBACK
// =================================


export function getFeedback(db){


return new Promise((resolve,reject)=>{


const tx =

db.transaction(

"feedback",

"readonly"

);



const store =

tx.objectStore(
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


reject(request.error);

};



});


}









// =================================
// CHECK PHONE STORAGE
// =================================


export async function checkStorage(){


if(
navigator.storage &&
navigator.storage.estimate
){


const estimate =

await navigator.storage.estimate();



return {


used:

Math.round(
estimate.usage / 1024 /1024
)
+" MB",



available:

Math.round(
estimate.quota /1024 /1024
)
+" MB"



};


}



return null;


}
