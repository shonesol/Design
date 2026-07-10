// ai-stylist.js

import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import { askGemini } from "./gemini.js";



let currentUser = null;



// Check logged in user

onAuthStateChanged(auth, (user)=>{

    currentUser = user;

});





window.askStylist = async function(){



const question =
document
.getElementById("question")
.value
.trim();



const answer =
document
.getElementById("answer");



const imageInput =
document
.getElementById("personPhoto");




if(question === ""){


answer.innerText =
"Please tell me what outfit you need help with.";


return;


}




if(!currentUser){


answer.innerText =
"Please login first.";


return;


}




try{


answer.innerText =
"🤖 AI Stylist is creating your outfit...";





// GET USER WARDROBE


const snapshot = await getDocs(

collection(

db,

"users",

currentUser.uid,

"wardrobe"

)

);




let clothes = [];




snapshot.forEach((doc)=>{


clothes.push(doc.data());


});





if(clothes.length === 0){


answer.innerText =
"Your wardrobe is empty. Upload clothes first.";


return;


}





// CHECK USER PHOTO


let photoMessage = "";


if(imageInput && imageInput.files.length > 0){


photoMessage = `

The user has uploaded a personal photo.
Consider body appearance and styling when giving advice.

`;

}




// GEMINI PROMPT


const prompt = `


You are an advanced AI personal fashion stylist.


${photoMessage}


User wardrobe:

${JSON.stringify(
clothes,
null,
2
)}



User request:

${question}



Create a complete fashion recommendation.


Include:


👕 Main outfit

👖 Bottom wear

👟 Shoes

⌚ Accessories

🎨 Color matching

💇 Hair/style suggestion

✨ Why this outfit works


Use the user's wardrobe whenever possible.


Be friendly, detailed and professional.


`;






const result =
await askGemini(prompt);





answer.innerText = result;






// VOICE AI


if("speechSynthesis" in window){


speechSynthesis.cancel();



const voice =
new SpeechSynthesisUtterance(result);



voice.rate = 0.9;

voice.pitch = 1;


speechSynthesis.speak(voice);



}




}

catch(error){


console.error(
"AI Stylist Error:",
error
);



answer.innerText =
"Something went wrong: "
+
error.message;



}



};
