// database-manager.js
// FashionAI Local Phone Storage Manager

const DATABASE_VERSION = 1;


export function getDatabase(userId){

return new Promise((resolve,reject)=>{


if(!userId){

reject(
new Error("User ID missing")
);

return;

}


const databaseName =
"FashionAI_" + userId;



const request =
indexedDB.open(
databaseName,
DATABASE_VERSION
);



request.onupgradeneeded=(event)=>{


const db =
event.target.result;



// CLOTHING STORAGE

if(!db.objectStoreNames.contains("wardrobe")){


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
"laundryStatus",
"laundryStatus"
);



}



// HISTORY

if(!db.objectStoreNames.contains("history")){


db.createObjectStore(
"history",
{
keyPath:"id",
autoIncrement:true
}
);


}



// OUTFIT PLANS

if(!db.objectStoreNames.contains("plans")){


db.createObjectStore(
"plans",
{
keyPath:"id",
autoIncrement:true
}
);


}



// AI MEMORY

if(!db.objectStoreNames.contains("preferences")){


db.createObjectStore(
"preferences",
{
keyPath:"id"
}
);


}


};



request.onsuccess=()=>{


console.log(
"✅ FashionAI Storage Ready:",
databaseName
);


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
