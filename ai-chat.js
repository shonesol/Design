import {db,auth} from "./firebase.js";


import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



window.chatAI = async function(){


const question =
document.getElementById("message")
.value
.toLowerCase();


const reply =
document.getElementById("reply");



const user =
auth.currentUser;



if(!user){

reply.innerText="Please login first";

return;

}



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



let answer="";



// Smart understanding


if(
question.includes("wedding") ||
question.includes("ceremony")
){


answer =
`
💍 Formal Event Style

Recommended:

👔 A clean shirt or elegant dress
👖 Smart trousers
👞 Formal shoes

Keep colors balanced and elegant.
`;

}



else if(
question.includes("travel")
){

answer=
`
✈️ Travel Style

Choose:

Comfortable clothes
Light jacket
Sneakers

Avoid heavy clothing.
`;

}



else if(
question.includes("hot") ||
question.includes("summer")
){

answer=
`
☀️ Hot Weather Style

Wear:

Light shirt
Breathable trousers
Comfortable shoes

Choose bright colors.
`;

}



else{


let item =
wardrobe[
Math.floor(
Math.random()*wardrobe.length
)
];


answer=

`
✨ My Suggestion

Wear:

${item?.color || "a nice"}
${item?.type || "outfit"}

Add matching accessories.

`;

}



reply.innerText=answer;



const speech =
new SpeechSynthesisUtterance(answer);

speechSynthesis.speak(speech);


};
