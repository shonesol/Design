// database-manager.js
// FashionAI Central Database Controller


import { auth } from "./firebase.js";

import {
onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";



let database = null;



const VERSION = 1;





// ==========================
// GET USER DATABASE
// ==========================


export function getDatabase(){


return new Promise((resolve,reject)=>{



if(database){


resolve(database);

return;


}





onAuthStateChanged(

auth,

async(user)=>{


if(!user){


reject(
"No logged in user"
);


return;


}





const request =

indexedDB.open(

"FashionAI_" + user.uid,

VERSION

);







request.onupgradeneeded =
(event)=>{


const db =
event.target.result;





// WARDROBE

if(
!db.objectStoreNames.contains(
"wardrobe"
)
){


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



}







// HISTORY

if(
!db.objectStoreNames.contains(
"history"
)
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
!db.objectStoreNames.contains(
"feedback"
)
){


db.createObjectStore(

"feedback",

{
keyPath:"id",
autoIncrement:true
}

);


}







// USER PREFERENCES

if(
!db.objectStoreNames.contains(
"preferences"
)
){


db.createObjectStore(

"preferences",

{
keyPath:"id",
autoIncrement:true
}

);


}







// SAVED OUTFITS

if(
!db.objectStoreNames.contains(
"outfits"
)
){


db.createObjectStore(

"outfits",

{
keyPath:"id",
autoIncrement:true
}

);


}



};







request.onsuccess =
(event)=>{


database =
event.target.result;



resolve(database);



};






request.onerror =
(error)=>{


reject(error);


};



}


);



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
