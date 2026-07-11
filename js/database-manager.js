// database-manager.js
// FashionAI IndexedDB Manager


import { auth } from "./firebase.js";

import {
onAuthStateChanged
}
from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";



let database = null;



const DATABASE_VERSION = 6;






export async function getDatabase(){


return new Promise((resolve,reject)=>{


onAuthStateChanged(

auth,

(user)=>{


if(!user){

reject(
"No logged in user"
);

return;

}




const request =

indexedDB.open(

"FashionAI_"+user.uid,

DATABASE_VERSION

);







request.onupgradeneeded=(event)=>{


const db =
event.target.result;





// ======================
// WARDROBE
// ======================


if(
!db.objectStoreNames.contains("wardrobe")
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



store.createIndex(
"laundryStatus",
"laundryStatus"
);


}








// ======================
// HISTORY
// ======================


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







// ======================
// OUTFIT PLANS
// ======================


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








// ======================
// FEEDBACK
// ======================


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







// ======================
// AI MEMORY
// ======================


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









request.onsuccess=(event)=>{


database =
event.target.result;



console.log(

"✅ FashionAI Database Ready"

);



resolve(database);



};







request.onerror=()=>{


reject(
request.error
);


};





}


);


});



}








export function closeDatabase(){


if(database){


database.close();

database=null;


}


}
