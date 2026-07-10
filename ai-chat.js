import {db,auth} from "./firebase.js";

import {askGemini} from "./gemini-ai.js";


import {

collection,
getDocs

}

from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";




window.chatAI = async function(){



const question =
document
.getElementById("message")
.value;



const reply =
document
.getElementById("reply");



const user =
auth.currentUser;



if(!user){

reply.innerText=
"Please login first";

return;

}




reply.innerText="Thinking...";



try{


const snapshot =
await getDocs(

collection(

db,

"users",

user.uid,

"wardrobe"

)

);




let wardrobe=[];



snapshot.forEach(doc=>{


wardrobe.push(doc.data());


});





const answer =
await askGemini(`


You are a professional AI fashion stylist.


User wardrobe:

${JSON.stringify(
wardrobe,
null,
2
)}



User question:

${question}



Give practical outfit advice.
Suggest colors, shoes and accessories.


`);




reply.innerText=answer;



speechSynthesis.speak(

new SpeechSynthesisUtterance(answer)

);



}

catch(error){


console.error(error);


reply.innerText=
"Error: "+error.message;


}


}
