console.log("Outfit Generator Loaded");


import { db, auth } from "./firebase.js";


import {
getDocs,
collection
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import { calculateOutfitScore } from "./outfit-score.js";
import { checkColorMatch } from "./color-ai.js";



const generateBtn = document.getElementById("generateBtn");

const output = document.getElementById("outfitResult");

let currentUser = null;



// CHECK LOGIN

onAuthStateChanged(auth,(user)=>{


if(user){

currentUser=user;

console.log("Logged user:",user.uid);


}else{


console.log("No user logged in");


}


});





generateBtn.addEventListener("click", async()=>{


if(!currentUser){

output.innerText="Please login first";

return;

}



const occasion =
document.getElementById("occasion").value;



try{


// LOAD WARDROBE

const snapshot = await getDocs(

collection(
db,
"users",
currentUser.uid,
"wardrobe"
)

);



let wardrobe=[];



snapshot.forEach((doc)=>{


wardrobe.push(doc.data());


});



console.log("Wardrobe:",wardrobe);





if(wardrobe.length===0){


output.innerText=
"Upload clothes first";


return;


}




// FIND CLOTHES


let top = wardrobe.find(item=>

[
"shirt",
"tshirt",
"t-shirt"
]
.includes(
item.type?.toLowerCase()
)

);



let bottom = wardrobe.find(item=>

[
"jeans",
"trousers",
"pants"
]
.includes(
item.type?.toLowerCase()
)

);



let shoes = wardrobe.find(item=>

item.type?.toLowerCase()
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

styleScore:85


});






const result = `


✨ AI GENERATED OUTFIT


🎯 Occasion:
${occasion}



👕 Top:
${top?.color || "Any shirt"}



👖 Bottom:
${bottom?.color || "Matching trousers"}



👟 Shoes:
${shoes?.color || "Clean shoes"}



⭐ Fashion Score:
${score}%



🤖 AI Advice:

This outfit matches your wardrobe style.


`;



output.innerText=result;



// VOICE

const speech =
new SpeechSynthesisUtterance(result);


speechSynthesis.speak(speech);



}

catch(error){


console.error(error);


output.innerText=
"Error: "+error.message;


}


});
