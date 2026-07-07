import { db, auth } from "./firebase.js";


import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";




window.askStylist = async function(){


const question =
document.getElementById("question")
.value
.toLowerCase();


const answer =
document.getElementById("answer");



const user =
auth.currentUser;



if(!user){

answer.innerText=
"Please login first";

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



let clothes=[];



snapshot.forEach(doc=>{

clothes.push(doc.data());

});




if(clothes.length===0){

answer.innerText=
"Your wardrobe is empty. Upload clothes first.";

return;

}



let result="";




// WEDDING

if(question.includes("wedding")){


let dress =
clothes.find(
item=>item.category==="dress"
);


result=

`💍 Wedding Outfit

Wear:
👗 ${dress?.color || "elegant"} ${dress?.category || "dress"}

Add:
✨ Nice shoes
✨ Watch or accessories

Style: Elegant`;

}




// OFFICE

else if(
question.includes("office") ||
question.includes("work")
){


let shirt =
clothes.find(
item=>item.category==="shirt"
);



result=

`💼 Office Outfit

👔 ${shirt?.color || "white"} ${shirt?.category || "shirt"}

Recommendation:
Keep it formal and clean.`;

}





// PARTY

else if(
question.includes("party")
){


let item =
clothes[0];


result=

`🎉 Party Look

Wear:
${item.color || ""} ${item.category}

Add confidence 🔥`;

}




// GENERAL

else{


let random =
clothes[
Math.floor(
Math.random()*clothes.length
)
];



result=

`✨ Today's Suggestion

Wear:

${random.color || ""} 
${random.category || "outfit"}

Looks stylish and balanced.`;

}



answer.innerText=result;




// Voice

const speech =
new SpeechSynthesisUtterance(result);


speechSynthesis.speak(speech);



};
