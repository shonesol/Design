import {initializeApp}
from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";


import {

getFirestore,
collection,
addDoc,
getDocs

}
from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



const firebaseConfig = {


apiKey:"YOUR_API_KEY",

authDomain:"YOUR_PROJECT.firebaseapp.com",

projectId:"YOUR_PROJECT_ID",

storageBucket:"YOUR_PROJECT.appspot.com",

messagingSenderId:"YOUR_ID",

appId:"YOUR_APP_ID"

};



const app = initializeApp(firebaseConfig);


const db = getFirestore(app);



const uploadBtn =
document.getElementById("uploadBtn");


const imageInput =
document.getElementById("clothingImage");


const message =
document.getElementById("message");



uploadBtn.onclick = async()=>{


let file=imageInput.files[0];


if(!file){

alert("Choose an image first");

return;

}



message.innerHTML="🤖 AI analysing...";



let clothing={

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






async function loadWardrobe(){


const list =
document.getElementById("clothesList");


const stats =
document.getElementById("stats");



list.innerHTML="";


try{


const snapshot =
await getDocs(collection(db,"clothes"));



let count=0;


snapshot.forEach((doc)=>{


count++;


let data=doc.data();



list.innerHTML +=

`

<div class="cloth">

<h3>${data.name}</h3>

<p>
Category:
${data.category}
</p>


</div>

`;



});



stats.innerHTML=

`
Total Clothes: ${count}
`;



}

catch(error){

console.log(error);

stats.innerHTML=
"Database error";

}



}



loadWardrobe();
