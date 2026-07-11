// database-manager.js
// FashionAI IndexedDB Manager


let database = null;


const DATABASE_VERSION = 6;





// ==========================
// OPEN USER DATABASE
// ==========================


export async function getDatabase(userId){


return new Promise((resolve,reject)=>{



if(!userId){


reject(
"No User ID provided"
);


return;


}





const request = indexedDB.open(

"FashionAI_" + userId,

DATABASE_VERSION

);







// ==========================
// CREATE DATABASE
// ==========================


request.onupgradeneeded = (event)=>{


const db = event.target.result;





// WARDROBE

if(
!db.objectStoreNames.contains("wardrobe")
){


const store = db.createObjectStore(

"wardrobe",

{

keyPath:"id",

autoIncrement:true

}

);



store.createIndex(
"category",
"category"
);



store.createIndex(
"color",
"color"
);



store.createIndex(
"style",
"style"
);



store.createIndex(
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







// PLANS

if(
!db.objectStoreNames.contains("plans")
){


const store =

db.createObjectStore(

"plans",

{

keyPath:"id",

autoIncrement:true

}

);



store.createIndex(

"date",

"date",

{

unique:false

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








// AI MEMORY

if(
!db.objectStoreNames.contains("preferences")
){


db.createObjectStore(

"preferences",

{

keyPath:"id"

}

);


}




};









request.onsuccess = (event)=>{


database = event.target.result;



console.log(
"✅ FashionAI IndexedDB Connected"
);



resolve(database);



};







request.onerror = ()=>{


console.error(
"❌ IndexedDB Error",
request.error
);



reject(
request.error
);


};



});


}







// ==========================
// CLOSE DATABASE
// ==========================


export function closeDatabase(){


if(database){


database.close();


database=null;


}



}
