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

const category = document.getElementById("category");



// Store clothes temporarily

let clothes = [];



// Upload

uploadBtn.onclick = async()=>{


const file = imageInput.files[0];


if(!file){

alert("Choose an image first");

return;

}



message.innerHTML="🤖 AI analysing...";



const clothing = {

name:file.name,

category:"Unknown",

date:new Date()

};



try{


await addDoc(
collection(db,"clothes"),
clothing
);


message.innerHTML=
"✅ Clothing added successfully";


loadWardrobe();


}

catch(error){

console.log(error);

message.innerHTML=
"❌ Error saving data";

}


};





// Load clothes

async function loadWardrobe(){


try{


const snapshot =
await getDocs(
collection(db,"clothes")
);



clothes=[];


snapshot.forEach((doc)=>{


clothes.push(doc.data());


});



displayClothes(clothes);



}

catch(error){

console.log(error);

clothesList.innerHTML=
"Database error";

}


}




// Display clothes

function displayClothes(items){


clothesList.innerHTML="";


let count=0;



items.forEach((item)=>{


count++;


clothesList.innerHTML += `

<div class="cloth">

<h3>
${item.name}
</h3>

<p>
Category: ${item.category}
</p>

</div>

`;


});



stats.innerHTML =
"Total Clothes: " + count;



}





// Search

search.addEventListener("input",()=>{


let value =
search.value.toLowerCase();



let filtered =
clothes.filter(item=>

item.name.toLowerCase()
.includes(value)

);



displayClothes(filtered);


});





// Category filter

category.addEventListener("change",()=>{


let selected =
category.value;



if(selected==="all"){

displayClothes(clothes);

return;

}



let filtered =
clothes.filter(item=>

item.category === selected

);



displayClothes(filtered);



});





// Start

loadWardrobe();
