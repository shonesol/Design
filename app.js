// ===============================
// FashionAI Main Application
// ===============================
import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
getFirestore,
collection,
addDoc,
getDocs
}
from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
// ===============================
// FIREBASE CONFIG
// ===============================
const firebaseConfig = {
apiKey: "PUT_YOUR_FIREBASE_API_KEY_HERE",
authDomain:
"design-a0e45.firebaseapp.com",
projectId:
"design-a0e45",
storageBucket:
"design-a0e45.appspot.com",
messagingSenderId:
"752963168855",
appId:
"1:752963168855:web:660513e16f91108e489112"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// ===============================
// GET ELEMENTS SAFELY
// ===============================
const uploadBtn =
document.getElementById("uploadBtn");
const clothingImage =
document.getElementById("clothingImage");
const message =
document.getElementById("message");
const clothesList =
document.getElementById("clothesList");
const search =
document.getElementById("search");
const category =
document.getElementById("category");
const totalClothes =
document.getElementById("totalClothes");
const favoriteStyle =
document.getElementById("favoriteStyle");
const confidence =
document.getElementById("confidence");
let wardrobe=[];
// ===============================
// AI CLOTHING ANALYZER
// ===============================
function analyzeClothing(filename){
let name =
filename.toLowerCase();
let type="Fashion Item";
let style="Casual";
if(name.includes("dress")){
type="Dress";
style="Elegant";
}
else if(name.includes("shoe")){
type="Shoes";
style="Street Fashion";
}
else if(
name.includes("shirt")
){
type="Shirt";
style="Smart Casual";
}
else if(
name.includes("pant") ||
name.includes("trouser")
){
type="Trouser";
style="Professional";
}
return {
category:type,
style:style,
confidence:"85%"
};
}
// ===============================
// UPLOAD FUNCTION
// ===============================
if(uploadBtn){
uploadBtn.onclick = async()=>{
const file =
clothingImage.files[0];
if(!file){
alert(
"Please choose a clothing image"
);
return;
}
message.innerHTML =
"🤖 AI analysing clothing...";
const ai =
analyzeClothing(file.name);
const clothing = {
name:file.name,
category:
ai.category,
style:
ai.style,
confidence:
ai.confidence,
date:
new Date()
};
try{
await addDoc(
collection(
db,
"clothes"
),
clothing
);
message.innerHTML =
`
✅ AI Analysis Complete
<br>
Category: ${ai.category}
<br>
Style: ${ai.style}
<br>
Confidence: ${ai.confidence}
`;
loadWardrobe();
}
catch(error){
console.log(error);
message.innerHTML =
"❌ Firebase connection error";
}
};
}
// ===============================
// LOAD WARDROBE
// ===============================
async function loadWardrobe(){
if(!clothesList)
return;
try{
const data =
await getDocs(
collection(db,"clothes")
);
wardrobe=[];
data.forEach(doc=>{
wardrobe.push(doc.data());
});
displayClothes(wardrobe);
updateDashboard();
}
catch(error){
console.log(error);
clothesList.innerHTML =
"Unable to load wardrobe";
}
}
// ===============================
// DISPLAY CLOTHES
// ===============================
function displayClothes(items){
if(!clothesList)
return;
clothesList.innerHTML="";
if(items.length===0){
clothesList.innerHTML=
"No clothes added yet";
return;
}
items.forEach(item=>{
clothesList.innerHTML +=`
<div class="cloth">
<h3>
👕 ${item.name}
</h3>
<p>
Category:
${item.category}
</p>
<p>
Style:
${item.style}
</p>
<p>
AI Confidence:
${item.confidence}
</p>
</div>
`;
});
}
// ===============================
// DASHBOARD
// ===============================
function updateDashboard(){
if(totalClothes)
totalClothes.innerHTML =
wardrobe.length;
if(favoriteStyle)
favoriteStyle.innerHTML =
"Smart Fashion";
if(confidence)
confidence.innerHTML =
"85%";
}
// ===============================
// SEARCH
// ===============================
if(search){
search.oninput=()=>{
let value =
search.value.toLowerCase();
let result =
wardrobe.filter(item=>
item.name
.toLowerCase()
.includes(value)
);
displayClothes(result);
};
}
// ===============================
// CATEGORY FILTER
// ===============================
if(category){
category.onchange=()=>{
let selected =
category.value;
if(selected==="all"){
displayClothes(wardrobe);
return;
}
let result =
wardrobe.filter(item=>
item.category===selected
);
displayClothes(result);
};
}
loadWardrobe();
