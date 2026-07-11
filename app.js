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


// Firebase Configuration
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


// HTML Elements

const uploadBtn = document.getElementById("uploadBtn");

const imageInput = document.getElementById("clothingImage");

const message = document.getElementById("message");

const list = document.getElementById("clothesList");

const stats = document.getElementById("stats");



// Upload Clothing

uploadBtn.addEventListener("click", async()=>{


const file = imageInput.files[0];


if(!file){

alert("Choose an image first");

return;

}



message.innerHTML="🤖 AI analysing...";



const clothing = {

name:file.name,

category:"Unknown",

createdAt:new Date()

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


});





// Load Clothes

async function loadWardrobe(){


list.innerHTML="";


try{


const snapshot = await getDocs(
collection(db,"clothes")
);



let count=0;



snapshot.forEach((doc)=>{


count++;


const data = doc.data();



list.innerHTML += `

<div class="cloth">

<h3>${data.name}</h3>

<p>
Category: ${data.category}
</p>

</div>

`;



});



stats.innerHTML=
"Total Clothes: " + count;



}

catch(error){

console.log(error);

stats.innerHTML=
"Database error";

}


}



// Start App

loadWardrobe();
