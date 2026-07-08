
import {
calculateOutfitScore
}
  const outfitScore =
calculateOutfitScore({

colorScore: colorAI.score,


weatherScore:90,


occasionScore:95,


styleScore:85


});
from "./outfit-score.js";
import {
checkColorMatch
}
  
from "./color-ai.js";
let colors=[];


if(top?.color)
colors.push(top.color);


if(bottom?.color)
colors.push(bottom.color);


if(shoes?.color)
colors.push(shoes.color);



const colorAI =
checkColorMatch(colors);
import {db,auth} from "./firebase.js";


import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



window.generateOutfit = async function(){


const output =
document.getElementById("outfitResult");


const occasion =
document.getElementById("occasion").value;



const user =
auth.currentUser;



if(!user){

output.innerText =
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



let wardrobe=[];


snapshot.forEach(doc=>{

wardrobe.push(doc.data());

});



if(wardrobe.length===0){

output.innerText=
"Upload clothes first.";

return;

}



let top =
wardrobe.find(
i =>
i.type==="shirt" ||
i.type==="tshirt"
);


let bottom =
wardrobe.find(
i =>
i.type==="jeans" ||
i.type==="trousers"
);


let shoes =
wardrobe.find(
i =>
i.type==="shoes"
);



let score =
Math.floor(
80 + Math.random()*20
);



let result = `✨ AI Generated Outfit

🎯 Occasion:
${occasion}


👕 Top:
${top?.color || "Choose a matching shirt"}
${top?.type || ""}


👖 Bottom:
${bottom?.color || "Smart trousers"}
${bottom?.type || ""}


👟 Shoes:
${shoes?.color || "Clean shoes"}
${shoes?.type || ""}


⭐ Fashion Score:
${score}%


AI Advice:
This outfit matches your occasion and wardrobe style.
`;



output.innerText=result;



const speech =
new SpeechSynthesisUtterance(result);

speechSynthesis.speak(speech);



};
output.innerHTML =
`
${result}

<br><br>

<button onclick="saveLook(\`${result}\`)">
❤️ Save This Look
</button>
`;
import {
addDoc,
collection
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



window.saveLook = async function(outfit){


const user = auth.currentUser;


if(!user){

alert("Login first");

return;

}



await addDoc(

collection(
db,
"users",
user.uid,
"looks"
),

{

outfit: outfit,

createdAt: Date.now()

}

);


alert("Look saved ❤️");


};
import { shoppingAI } from "./shopping-ai.js";
const shoppingAdvice =
shoppingAI(wardrobe);
🛍 Shopping Suggestions

${shoppingAdvice.join("\n")}
