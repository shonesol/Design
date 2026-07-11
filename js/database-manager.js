// database-manager.js
// FashionAI IndexedDB Manager


let database = null;

const DATABASE_VERSION = 6;



export function getDatabase(userId){

return new Promise((resolve,reject)=>{


if(!userId){

reject(
"No user ID"
);

return;

}



const request = indexedDB.open(

"FashionAI_" + userId,

DATABASE_VERSION

);





request.onupgradeneeded = (event)=>{


const db = event.target.result;



if(!db.objectStoreNames.contains("wardrobe")){


const store =
db.createObjectStore(

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





if(!db.objectStoreNames.contains("history")){


db.createObjectStore(

"history",

{
keyPath:"id",
autoIncrement:true
}

);


}





if(!db.objectStoreNames.contains("plans")){


db.createObjectStore(

"plans",

{
keyPath:"id",
autoIncrement:true
}

);


}





if(!db.objectStoreNames.contains("preferences")){


db.createObjectStore(

"preferences",

{
keyPath:"id"

}

);


}



};





request.onsuccess=(event)=>{


database =
event.target.result;


console.log(
"✅ IndexedDB Connected"
);


resolve(database);


};





request.onerror=()=>{


reject(request.error);


};



});

}




export function closeDatabase(){


if(database){

database.close();

database=null;

}


}
