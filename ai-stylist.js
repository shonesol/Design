// ai-stylist.js

import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import { askGemini } from "./gemini.js";



let currentUser = null;
let wardrobeDB = null;



// ==========================
// LOGIN CHECK
// ==========================

onAuthStateChanged(auth, async(user)=>{


currentUser = user;


if(user){

wardrobeDB =
await openWardrobeDB(user.uid);

}


});





// ==========================
// OPEN USER WARDROBE
// ==========================


function openWardrobeDB(uid){


return new Promise((resolve,reject)=>{


const request =
indexedDB.open(
"FashionAI_" + uid,
1
);



request.onsuccess=(e)=>{


resolve(e.target.result);


};



request.onerror=(e)=>{


reject(e);


};



});


}








// ==========================
// AI STYLIST
// ==========================


window.askStylist = async function(){



const question =
document
.getElementById("question")
.value
.trim();



const answer =
document
.getElementById("answer");





if(!question){


answer.innerText =
"Please ask me what you want to wear.";


return;


}



if(!currentUser){


answer.innerText =
"Please login first.";


return;


}



if(!wardrobeDB){


answer.innerText =
"Loading your wardrobe...";


return;


}





try{


answer.innerText =
"🤖 AI Stylist is thinking...";





// READ PHONE WARDROBE


const clothes =
await getWardrobe();





if(clothes.length===0){


answer.innerText =
"Your wardrobe is empty. Upload clothes first.";


return;


}





const prompt = `


You are an advanced personal AI fashion stylist.


User wardrobe:

${JSON.stringify(
clothes,
null,
2
)}



User request:

${question}



Create a personalized outfit.


Include:


👕 Top

👖 Bottom

👟 Shoes

⌚ Accessories

🎨 Color matching

✨ Style explanation


Use the user's own clothes first.


Be creative and practical.



`;





const result =
await askGemini(prompt);





answer.innerText =
result;





// VOICE

if("speechSynthesis" in window){


speechSynthesis.cancel();



let voice =
new SpeechSynthesisUtterance(result);


voice.rate=0.9;

voice.pitch=1;


speechSynthesis.speak(voice);


}



}



catch(error){


console.error(error);


answer.innerText =
"Error: "+error.message;


}



};








// ==========================
// GET WARDROBE FROM INDEXEDDB
// ==========================


function getWardrobe(){


return new Promise((resolve,reject)=>{


const transaction =
wardrobeDB.transaction(

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


resolve(request.result);


};



request.onerror=(error)=>{


reject(error);


};



});


}
