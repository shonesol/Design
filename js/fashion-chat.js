import {
askGemini
}
from "./gemini.js";



import {
auth
}
from "./firebase.js";


import {
onAuthStateChanged
}
from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";



import {
openDatabase,
getClothes
}
from "./db.js";



let database;



let userWardrobe=[];




onAuthStateChanged(
auth,
async(user)=>{


if(user){


database =
await openDatabase(
user.uid
);



userWardrobe =
await getClothes(
database
);


}


});






const button =
document.getElementById(
"sendBtn"
);




button.onclick =
async()=>{


const input =
document.getElementById(
"userMessage"
);



const message =
input.value;



if(!message)
return;



showMessage(
message,
"user"
);



input.value="";





const prompt = `


You are FashionAI,
a professional personal stylist.


User wardrobe:


${JSON.stringify(
userWardrobe
)}



User question:


${message}



Give practical fashion advice.

Consider:

- colors
- occasions
- current fashion
- user's wardrobe
- styling rules


`;





const answer =
await askGemini(
prompt
);



showMessage(
answer,
"ai"
);



};








function showMessage(
text,
type
){



const box =
document.getElementById(
"chatBox"
);



box.innerHTML += `


<div class="message ${type}">

${text}

</div>


`;



box.scrollTop =
box.scrollHeight;


}
