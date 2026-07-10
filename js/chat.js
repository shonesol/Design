import {
auth
}
from "./firebase.js";


import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
askGemini
}
from "./gemini.js";


import {
openDatabase,
getClothes
}
from "./db.js";


import {
analyzeUserStyle
}
from "./style-learning.js";



let database;



onAuthStateChanged(
auth,
async(user)=>{


if(user){


database =
await openDatabase(
user.uid
);


}


});






document
.getElementById("sendBtn")
.onclick =
async()=>{



const input =
document
.getElementById(
"userMessage"
);



const message =
input.value;



if(!message)
return;




addMessage(
message,
"user"
);



input.value="";





const clothes =
await getClothes(
database
);



const style =
await analyzeUserStyle(
database
);







const prompt = `


You are FashionAI, a professional personal stylist.


User question:

${message}



User wardrobe:

${JSON.stringify(
clothes,
null,
2
)}



User style:

${JSON.stringify(
style,
null,
2
)}



Give a helpful fashion recommendation.


Consider:

- occasion
- colors
- weather
- personal preference
- modern fashion


`;





const answer =
await askGemini(
prompt
);



addMessage(
answer,
"ai"
);



};






function addMessage(
text,
type
){


const box =
document
.getElementById(
"messages"
);



let div =
document.createElement(
"div"
);



div.className =
type==="ai"
?
"ai-message"
:
"user-message";



div.innerHTML =
text;



box.appendChild(div);



box.scrollTop =
box.scrollHeight;


}
