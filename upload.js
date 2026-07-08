import { storage, auth, db } from "./firebase.js";


import { 
ref,
uploadBytes,
getDownloadURL
} 
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";


import {
collection,
addDoc
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";





// AI CLOTHING ANALYSIS

async function analyzeClothingWithAI(imageUrl){


const API_KEY = "AIzaSyA1wmHCfPLOmw1u3zUM-M2bUl 
";


const body = {

requests:[

{

image:{
source:{
imageUri:imageUrl
}
},

features:[

{
type:"LABEL_DETECTION",
maxResults:10
},

{
type:"IMAGE_PROPERTIES"
}

]

}

]

};



const response = await fetch(

`https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(body)

}

);



const data = await response.json();



const labels =
data.responses?.[0]?.labelAnnotations || [];


const colors =
data.responses?.[0]
?.imagePropertiesAnnotation
?.dominantColors
?.colors || [];




let type="unknown";

let color="unknown";

let style="casual";





labels.forEach(item=>{


let text =
item.description.toLowerCase();



if(text.includes("shirt"))
type="shirt";


if(text.includes("jeans"))
type="jeans";


if(text.includes("shoe"))
type="shoes";


if(text.includes("dress"))
type="dress";


if(text.includes("hoodie"))
type="hoodie";


});





if(colors.length){


const rgb =
colors[0].color;



if(rgb.red>200 && rgb.green<100)
color="red";


else if(rgb.blue>150)
color="blue";


else if(
rgb.red<60 &&
rgb.green<60 &&
rgb.blue<60
)
color="black";


else if(
rgb.red>200 &&
rgb.green>200 &&
rgb.blue>200
)
color="white";


}




if(type==="shirt")
style="formal";


if(type==="dress")
style="elegant";


if(type==="hoodie")
style="casual";



return {
type,
color,
style
};


}







// UPLOAD FUNCTION

window.uploadClothes = async function(){


const file =
document.getElementById("file").files[0];


const status =
document.getElementById("status");



if(!file){

status.innerText="Select a file first";

return;

}




const user =
auth.currentUser;



if(!user){

status.innerText="Please login first";

return;

}




try{



status.innerText="Uploading...";



const storageRef =
ref(
storage,
"clothes/"+Date.now()+"_"+file.name
);



await uploadBytes(
storageRef,
file
);



const url =
await getDownloadURL(storageRef);





status.innerText="Analyzing clothing...";



const ai =
await analyzeClothingWithAI(url);





await addDoc(

collection(
db,
"users",
user.uid,
"wardrobe"
),

{

imageUrl:url,

type:ai.type,

color:ai.color,

style:ai.style,

createdAt:new Date()

}

);





status.innerText=
"✅ Clothing uploaded and AI analyzed!";



console.log("Saved:",ai);



}

catch(error){


console.error(error);


status.innerText=
"Error: "+error.message;


}



};
