// outfit-generator.js

console.log("Outfit Generator Loaded");


import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import { calculateOutfitScore } from "./outfit-score.js";

import { checkColorMatch } from "./color-ai.js";



const generateBtn =
document.getElementById("generateBtn");


const output =
document.getElementById("outfitResult");



let currentUser = null;

let wardrobeDB = null;




// ==========================
// LOGIN CHECK
// ==========================

onAuthStateChanged(auth, async(user)=>{


if(user){


currentUser=user;


wardrobeDB =
await openWardrobeDB(user.uid);



console.log(
"User:",
user.uid
);



}else{


console.log(
"No user logged in"
);


}



});






// ==========================
// OPEN USER WARDROBE
// ==========================


function openWardrobeDB(uid){


return new Promise((resolve,reject)=>{


const request =
indexedDB.open(
"FashionAI_"+uid,
1
);



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
// GET CLOTHES
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


resolve(
request.result
);


};



request.onerror=(error)=>{


reject(error);


};



});



}








// ==========================
// GENERATE OUTFIT
// ==========================


generateBtn.addEventListener(
"click",
async()=>{



if(!currentUser){


output.innerText =
"Please login first";


return;


}




if(!wardrobeDB){


output.innerText =
"Loading wardrobe...";


return;


}




const occasion =
document
.getElementById("occasion")
.value;




try{


output.innerText =
"🤖 Creating your outfit...";





// GET PHONE WARDROBE


const wardrobe =
await getWardrobe();




console.log(
"Wardrobe:",
wardrobe
);






if(wardrobe.length===0){


output.innerText =
"Upload clothes first";


return;


}








// FIND CLOTHES


const top =
wardrobe.find(item=>

[

"shirt",

"tshirt",

"t-shirt",

"hoodie",

"jacket"

]

.includes(
item.type.toLowerCase()
)

);





const bottom =
wardrobe.find(item=>

[

"jeans",

"trousers",

"pants",

"skirt"

]

.includes(
item.type.toLowerCase()
)

);






const shoes =
wardrobe.find(item=>

item.type
.toLowerCase()
.includes("shoe")

);







let colors=[];



if(top?.color)

colors.push(top.color);



if(bottom?.color)

colors.push(bottom.color);



if(shoes?.color)

colors.push(shoes.color);






const colorResult =
checkColorMatch(colors);






const score =
calculateOutfitScore({

colorScore:
colorResult.score,


weatherScore:90,


occasionScore:95,


styleScore:90


});






const result = `


✨ AI OUTFIT GENERATOR


🎯 Occasion:

${occasion}



👕 Top:

${top?.color || "Choose a matching top"}



👖 Bottom:

${bottom?.color || "Choose matching trousers"}



👟 Shoes:

${shoes?.color || "Clean matching shoes"}



⭐ Fashion Score:

${score}%



🤖 AI Advice:


This outfit was created from your personal wardrobe.


`;






output.innerText=result;






// VOICE

speechSynthesis.cancel();


const speech =
new SpeechSynthesisUtterance(result);


speech.rate=0.9;


speechSynthesis.speak(speech);



}



catch(error){



console.error(error);


output.innerText =
"Error: "+error.message;



}



});
