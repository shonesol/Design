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


// Firebase Config
const firebaseConfig = {

apiKey: "YOUR_REAL_API_KEY",

authDomain: "design-a0e45.firebaseapp.com",

projectId: "design-a0e45",

storageBucket: "design-a0e45.appspot.com",

messagingSenderId: "752963168855",

appId: "1:752963168855:web:660513e16f91108e489112"

};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// Elements

const uploadBtn = document.getElementById("uploadBtn");

const imageInput = document.getElementById("clothingImage");

const message = document.getElementById("message");

const clothesList = document.getElementById("clothesList");

const stats = document.getElementById("stats");

const search = document.getElementById("search");

const categoryFilter = document.getElementById("category");


let wardrobe = [];


// Guess category

function detectCategory(name){

name = name.toLowerCase();


if(name.includes("shirt") || name.includes("top"))
return "Shirt";


if(name.includes("dress"))
return "Dress";


if(name.includes("shoe"))
return "Shoes";


if(name.includes("trouser") || name.includes("pant"))
return "Trouser";


return "Unknown";

}



// Upload clothing

uploadBtn.onclick = async()=>{


const file = imageInput.files[0];


if(!file){

alert("Choose an image first");

return;

}



message.innerHTML =
"🤖 AI analysing clothing...";



const clothing = {

name:file.name,

category:detectCategory(file.name),

createdAt:new Date()

};



try{


await addDoc(
collection(db,"clothes"),
clothing
);



message.innerHTML =
"✅ Clothing saved successfully";


loadWardrobe();


}

catch(error){

console.log(error);

message.innerHTML =
"❌ Error saving data";

}


};




// Load wardrobe

async function loadWardrobe(){


const snapshot =
await getDocs(
collection(db,"clothes")
);



wardrobe=[];


snapshot.forEach(doc=>{

wardrobe.push(doc.data());

});



displayClothes(wardrobe);


}




// Display

function displayClothes(items){


clothesList.innerHTML="";


items.forEach(item=>{


clothesList.innerHTML += `

<div class="cloth">

<h3>
👕 ${item.name}
</h3>

<p>
Category: ${item.category}
</p>

</div>

`;



});



stats.innerHTML =
"Total Clothes: " + items.length;


}



// Search

search.oninput = ()=>{


let value =
search.value.toLowerCase();


let result =
wardrobe.filter(item=>

item.name.toLowerCase()
.includes(value)

);



displayClothes(result);


};




// Category filter

categoryFilter.onchange = ()=>{


let value =
categoryFilter.value;


if(value==="all"){

displayClothes(wardrobe);

return;

}



let result =
wardrobe.filter(item=>

item.category===value

);



displayClothes(result);


};




// Start

loadWardrobe();
