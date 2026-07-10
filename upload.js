// upload.js

import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


let currentUser = null;
let wardrobeDB = null;



// CHECK USER

onAuthStateChanged(auth, async(user)=>{


if(user){

currentUser = user;


wardrobeDB =
await openDatabase(user.uid);


console.log(
"Wardrobe ready:",
user.uid
);


}


});





// OPEN USER DATABASE

function openDatabase(uid){


return new Promise((resolve,reject)=>{


const request =
indexedDB.open(
"FashionAI_"+uid,
1
);



request.onupgradeneeded=(event)=>{


const db =
event.target.result;


if(!db.objectStoreNames.contains("wardrobe")){


db.createObjectStore(
"wardrobe",
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




request.onerror=(error)=>{


reject(error);


};



});


}







// UPLOAD CLOTHES

window.uploadClothes = async function(){



const file =
document
.getElementById("file")
.files[0];



const status =
document
.getElementById("status");




if(!file){


status.innerText =
"Select a clothing image";


return;


}



if(!currentUser){


status.innerText =
"Please login first";


return;


}




status.innerText =
"Saving clothing...";





const reader =
new FileReader();





reader.onload=function(){



const transaction =
wardrobeDB.transaction(
"wardrobe",
"readwrite"
);



const store =
transaction.objectStore(
"wardrobe"
);





store.add({


image:reader.result,


type:"unknown",


color:"unknown",


style:"casual",


createdAt:new Date()


});





transaction.oncomplete=()=>{


status.innerText =
"✅ Clothing saved to your wardrobe";


};



};





reader.readAsDataURL(file);



};
