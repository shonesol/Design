// upload.js
// FashionAI Smart Clothing Upload

import { auth } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
    openDatabase,
    addClothing
} from "./db.js";

import {
    analyzeClothing
} from "./clothing-ai.js";



let currentUser = null;
let database = null;



// ==========================
// USER LOGIN
// ==========================

onAuthStateChanged(auth, async(user)=>{


    if(user){

        currentUser = user;

        database =
            await openDatabase(user.uid);


        console.log(
            "FashionAI Database Ready:",
            user.uid
        );

    }


});




// ==========================
// UPLOAD CLOTHING
// ==========================

window.uploadClothes = async function(){



const file =
document
.getElementById("file")
.files[0];



const status =
document
.getElementById("status");



if(!file){

    status.innerHTML =
    "❌ Select clothing image";

    return;

}



if(!currentUser){

    status.innerHTML =
    "❌ Please login first";

    return;

}




status.innerHTML =
"🤖 FashionAI is analyzing your clothing...";





const reader =
new FileReader();





reader.onload = async()=>{


try{


const image =
reader.result;



// ==========================
// AI VISION ANALYSIS
// ==========================


const ai =
await analyzeClothing(
image
);



console.log(
"Fashion AI Result:",
ai
);





// ==========================
// SAVE TO DATABASE
// ==========================


await addClothing(
database,
{


image:image,


// AI IDENTIFICATION

category:
ai.category,


type:
ai.type,


subCategory:
ai.subCategory,


gender:
ai.gender,



// COLORS

primaryColor:
ai.primaryColor,


secondaryColor:
ai.secondaryColor,


hex:
ai.hex,



// DETAILS

pattern:
ai.pattern,


material:
ai.material,


fabric:
ai.fabric,


texture:
ai.texture,


fit:
ai.fit,


sleeve:
ai.sleeve,


neckline:
ai.neckline,



// STYLE

style:
ai.style,


formality:
ai.formality,



// AI KNOWLEDGE

season:
ai.season,


weatherSuitability:
ai.weatherSuitability,


occasions:
ai.occasions,


culturalOrigin:
ai.culturalOrigin,



matchingColors:
ai.matchingColors,


matchingItems:
ai.matchingItems,


fashionTips:
ai.fashionTips,



// USER TRACKING

favorite:false,


laundryStatus:
"Clean",


timesWorn:0,


lastWorn:null,



confidence:
ai.confidence,



createdAt:
new Date().toISOString()


}

);






status.innerHTML = `


<h3>✅ Added to AI Wardrobe</h3>


<p>
👕 ${ai.type}
</p>


<p>
🎨 ${ai.primaryColor}
</p>


<p>
✨ ${ai.style}
</p>


<p>
⭐ Confidence:
${ai.confidence}%
</p>


`;




}

catch(error){


console.error(
"Upload Error:",
error
);


status.innerHTML =
"❌ AI analysis failed";


}


};



reader.readAsDataURL(file);



};
