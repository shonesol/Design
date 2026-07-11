// upload-test.js
// FashionAI Upload Debug Test


import { auth } from "./firebase.js";

import {
onAuthStateChanged
}
from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
getDatabase
}
from "./database-manager.js";


import {
analyzeClothing
}
from "./clothing-ai.js";


import {
addClothing
}
from "./db.js";


let database = null;
let user = null;



const resultBox =
document.getElementById("result");



function show(message){

resultBox.innerHTML +=

`
<p>${message}</p>
`;

}




onAuthStateChanged(

auth,

async(currentUser)=>{


if(!currentUser){

show("❌ No Firebase user logged in");

return;

}


user=currentUser;

show("✅ Firebase login OK");



try{


database = await getDatabase(
user.uid
);


show("✅ IndexedDB connected");


}

catch(error){


show(
"❌ Database error: " + error.message
);


}



});








document
.getElementById("uploadBtn")
.onclick = async()=>{


try{


show("⏳ Upload started");



const file =
document
.getElementById("clothingImage")
.files[0];



if(!file){

show("❌ No image selected");

return;

}



show(
"✅ Image selected: " + file.name
);






const reader = new FileReader();



reader.onload = async()=>{


const image =
reader.result;


show("✅ Image converted");



try{


const ai =
await analyzeClothing(image);



show(
"✅ Gemini returned response"
);



show(
JSON.stringify(ai)
);



const clothing={

image:image,

name:ai.type || "Unknown",

category:ai.category || "Other",

color:ai.primaryColor || "Unknown",

style:ai.style || "Unknown",

createdAt:Date.now()

};



await addClothing(

database,

clothing

);



show(
"✅ Saved to phone database"
);



}

catch(error){


show(
"❌ AI/SAVE ERROR: "
+
error.message
);


}



};



reader.readAsDataURL(file);



}

catch(error){


show(
"❌ ERROR: "
+
error.message
);


}


};
