// fashion-chat.js

import { db, auth } from "./firebase.js";

import { askGemini } from "./gemini-ai.js";

import {
collection,
getDocs,
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



let chatHistory = [];



window.sendMessage = async function(){


const input =
document.getElementById("userMsg");


const output =
document.getElementById("chatReply");



const msg =
input.value.trim();



if(!msg){

output.innerText =
"Ask me any fashion question.";

return;

}



try{


output.innerText =
"🤖 Fashion AI is thinking...";



let wardrobe = [];

let profile = {};




// CHECK USER LOGIN

const user =
auth.currentUser;



if(user){



// GET WARDROBE

try{


const wardrobeSnap =
await getDocs(

collection(
db,
"users",
user.uid,
"wardrobe"
)

);



wardrobeSnap.forEach((item)=>{

wardrobe.push(item.data());

});


}

catch(error){

console.log(
"Wardrobe not available"
);

}





// GET PROFILE

try{


const profileSnap =
await getDoc(

doc(
db,
"users",
user.uid,
"profile"
)

);



if(profileSnap.exists()){

profile =
profileSnap.data();

}


}

catch(error){

console.log(
"Profile not available"
);

}



}




chatHistory.push({

role:"user",

message:msg

});






const prompt = `


You are FashionAI, an expert fashion consultant.


You can answer ANY fashion question.

Your knowledge includes:

- Men's fashion
- Women's fashion
- Streetwear
- Luxury fashion
- Casual outfits
- Office wear
- Wedding outfits
- Party outfits
- Shoes
- Accessories
- Color matching
- Fashion trends
- Seasonal dressing
- Body shape styling
- Wardrobe planning
- Clothing care


USER PROFILE:

Name:
${profile.name || "Not provided"}

Style:
${profile.style || "Not provided"}

Favorite colors:
${profile.colors || "Not provided"}




USER WARDROBE:

${JSON.stringify(
wardrobe,
null,
2
) || "No wardrobe uploaded"}




CHAT HISTORY:

${JSON.stringify(
chatHistory.slice(-5),
null,
2
)}




USER QUESTION:

${msg}



RULES:

1. Always answer the question.
2. If wardrobe exists, use it.
3. If wardrobe does not exist, give general fashion advice.
4. Be creative like a human stylist.
5. Give complete outfit ideas.
6. Explain why colors and pieces work together.
7. Ask helpful follow-up questions when needed.



`;





const response =
await askGemini(prompt);





chatHistory.push({

role:"assistant",

message:response

});





output.innerText =
response;




// VOICE

if("speechSynthesis" in window){


speechSynthesis.cancel();


const voice =
new SpeechSynthesisUtterance(response);


voice.rate = 1;

voice.pitch = 1;


speechSynthesis.speak(voice);


}




input.value="";



}

catch(error){


console.error(error);


output.innerText =
"AI Error: "+error.message;


}



};
