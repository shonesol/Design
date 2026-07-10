import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { askGemini } from "./gemini.js";


let currentUser = null;
let wardrobeDB = null;




onAuthStateChanged(auth, async(user)=>{

if(user){

currentUser=user;

wardrobeDB =
await openDatabase(user.uid);

}

});




// OPEN DATABASE

function openDatabase(uid){

return new Promise((resolve,reject)=>{


const request =
indexedDB.open(
"FashionAI_"+uid,
1
);



request.onupgradeneeded=(e)=>{


const db=e.target.result;


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



request.onsuccess=(e)=>{

resolve(e.target.result);

};


request.onerror=reject;


});


}






// AI VISION CLOTHING ANALYSIS

async function analyzeClothing(image){


const prompt = `

You are a fashion AI vision expert.

Analyze this clothing image.

Return ONLY JSON:

{
"type":"",
"color":"",
"style":"",
"season":""
}

Examples:

type:
shirt, tshirt, jeans, trousers, dress, shoes, jacket

style:
casual, formal, luxury, sporty, elegant

`;



const result =
await askGemini(prompt);



try{


return JSON.parse(result);


}

catch{


return {

type:"unknown",

color:"unknown",

style:"casual",

season:"all"

};


}



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

status.innerText=
"Select clothing image";

return;

}



if(!currentUser){

status.innerText=
"Please login first";

return;

}




status.innerText=
"🤖 AI is analyzing clothing...";





const reader =
new FileReader();



reader.onload=async()=>{



const image =
reader.result;





const ai =
await analyzeClothing(image);





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

image:image,


type:ai.type,


color:ai.color,


style:ai.style,


season:ai.season,


createdAt:new Date()


});





transaction.oncomplete=()=>{


status.innerText=

`✅ Saved:
${ai.type}
${ai.color}
${ai.style}`;


};



};





reader.readAsDataURL(file);



};
