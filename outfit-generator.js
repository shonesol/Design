console.log("Outfit generator loaded");
import { db, auth } from "./firebase.js";

import {
getDocs,
collection,
addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import { calculateOutfitScore } from "./outfit-score.js";
import { checkColorMatch } from "./color-ai.js";
import { shoppingAI } from "./shopping-ai.js";


const generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click", generateOutfit);

async function generateOutfit(){

const output = document.getElementById("outfitResult");

const occasion = document.getElementById("occasion").value;

const user = auth.currentUser;


if(!user){
 output.innerText="Please login first";
 return;
}


const snapshot = await getDocs(
collection(db,"users",user.uid,"wardrobe")
);


let wardrobe=[];

snapshot.forEach(doc=>{
 wardrobe.push(doc.data());
});


if(wardrobe.length===0){
 output.innerText="Upload clothes first.";
 return;
}


let top = wardrobe.find(i =>
i.type==="shirt" || i.type==="tshirt"
);

let bottom = wardrobe.find(i =>
i.type==="jeans" || i.type==="trousers"
);

let shoes = wardrobe.find(i =>
i.type==="shoes"
);


// Color AI
let colors=[];

if(top?.color) colors.push(top.color);
if(bottom?.color) colors.push(bottom.color);
if(shoes?.color) colors.push(shoes.color);


const colorAI = checkColorMatch(colors);


// Score
const outfitScore = calculateOutfitScore({

colorScore: colorAI.score,
weatherScore:90,
occasionScore:95,
styleScore:85

});


const shoppingAdvice = shoppingAI(wardrobe);


let result = `
✨ AI Generated Outfit

🎯 Occasion:
${occasion}

👕 Top:
${top?.color || "Any matching shirt"}

👖 Bottom:
${bottom?.color || "Smart trousers"}

👟 Shoes:
${shoes?.color || "Clean shoes"}

⭐ Fashion Score:
${outfitScore}%

🛍 Suggestions:
${shoppingAdvice.join("\n")}

AI Advice:
This outfit matches your wardrobe style.
`;


output.innerHTML = `
${result}

<br><br>

<button onclick="saveLook(\`${result}\`)">
❤️ Save This Look
</button>
`;


const speech = new SpeechSynthesisUtterance(result);
speechSynthesis.speak(speech);

};
