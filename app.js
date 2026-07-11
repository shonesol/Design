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


// ======================
// FIREBASE CONFIG
// ======================

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



// ======================
// HTML ELEMENTS
// ======================

const uploadBtn = document.getElementById("uploadBtn");

const clothingImage = document.getElementById("clothingImage");

const message = document.getElementById("message");

const clothesList = document.getElementById("clothesList");

const stats = document.getElementById("stats");

const search = document.getElementById("search");

const category = document.getElementById("category");


// Dashboard cards

const totalClothes =
document.getElementById("totalClothes");

const favoriteStyle =
document.getElementById("favoriteStyle");

const confidence =
document.getElementById("confidence");



let wardrobe=[];




// ======================
// UPLOAD CLOTHING
// ======================

uploadBtn.onclick = async()=>{


const file = clothingImage.files[0];


if(!file){

alert("Choose an image first");

return;

}



let item={

name:file.name,

category:detectCategory(file.name),

style:"Learning",

createdAt:new Date()

};



message.innerHTML=
"🤖 AI analysing...";



try{


await addDoc(

collection(db,"clothes"),

item

);



message.innerHTML=
"✅ Clothing saved";


loadWardrobe();


}

catch(error){


console.error(error);


message.innerHTML=
"❌ Error saving data";


}



};






// ======================
// CATEGORY DETECTION
// ======================

function detectCategory(name){


name=name.toLowerCase();


if(name.includes("shirt"))
return "Shirt";


if(name.includes("dress"))
return "Dress";


if(name.includes("shoe"))
return "Shoes";


if(name.includes("trouser") ||
name.includes("pant"))
return "Trouser";


return "Unknown";


}






// ======================
// LOAD DASHBOARD
// ======================


async function loadWardrobe(){


try{


const snapshot =
await getDocs(

collection(db,"clothes")

);



wardrobe=[];



snapshot.forEach(doc=>{

wardrobe.push(doc.data());

});



displayClothes(wardrobe);



updateDashboard();



}

catch(error){


console.error(error);


clothesList.innerHTML=
"Database error";


}



}






// ======================
// DISPLAY CLOTHES
// ======================


function displayClothes(items){


clothesList.innerHTML="";



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


</div>

`;


});


}






// ======================
// DASHBOARD UPDATE
// ======================


function updateDashboard(){


stats.innerHTML=

`
Total Clothes: ${wardrobe.length}
`;



if(totalClothes){

totalClothes.innerHTML=
wardrobe.length;

}



if(favoriteStyle){

favoriteStyle.innerHTML=
"Learning";

}



if(confidence){

confidence.innerHTML=
"60%";

}



}






// ======================
// SEARCH
// ======================


search.oninput=()=>{


let text =
search.value.toLowerCase();



let result =
wardrobe.filter(item=>

item.name
.toLowerCase()
.includes(text)

);



displayClothes(result);


};






// ======================
// FILTER
// ======================


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






// START

loadWardrobe();
