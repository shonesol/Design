// upload.js

import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
analyzeClothing
} from "./clothing-ai.js";



let currentUser = null;

let wardrobeDB = null;




// ==========================
// CHECK LOGIN
// ==========================

onAuthStateChanged(auth, async(user)=>{


if(user){


currentUser = user;


wardrobeDB =
await openDatabase(user.uid);



console.log(
"AI Wardrobe Ready:",
user.uid
);



}


});







// ==========================
// OPEN DATABASE
// ==========================


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







// ==========================
// UPLOAD CLOTHES
// ==========================


window.uploadClothes =
async function(){



const file =
document
.getElementById("file")
.files[0];



const status =
document
.getElementById("status");





if(!file){


status.innerHTML =
"❌ Select a clothing image";


return;


}





if(!currentUser){


status.innerHTML =
"❌ Please login first";


return;


}





status.innerHTML =
"🤖 AI is studying your clothes...";







const reader =
new FileReader();





reader.onload =
async()=>{



const imageBase64 =
reader.result;





try{



// SEND IMAGE TO AI


const ai =
await analyzeClothing(
imageBase64
);




console.log(
"AI CLOTHING DATA:",
ai
);






// SAVE TO DATABASE


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


image:imageBase64,


type:
ai.type,


color:
ai.color,


hex:
ai.hex,


secondaryColor:
ai.secondaryColor,


pattern:
ai.pattern,


material:
ai.material,


style:
ai.style,


occasion:
ai.occasion,


season:
ai.season,


confidence:
ai.confidence,


createdAt:
new Date().toISOString()


});







transaction.oncomplete=()=>{


status.innerHTML = `

✅ Clothes Saved

<br>

👕 ${ai.type}

<br>

🎨 ${ai.color}

<br>

✨ ${ai.style}

<br>

⭐ Confidence:
${ai.confidence}

`;



};



}



catch(error){



console.error(
error
);



status.innerHTML =
"❌ AI analysis failed";


}



};





reader.readAsDataURL(file);



};
