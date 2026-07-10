// tryon.js


import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";



let currentUser = null;

let wardrobeDB = null;



const personInput =
document.getElementById("personImage");


const clothInput =
document.getElementById("clothImage");





// ==========================
// LOGIN CHECK
// ==========================


onAuthStateChanged(auth, async(user)=>{


if(user){


currentUser=user;


wardrobeDB =
await openWardrobeDB(user.uid);


console.log(
"Try On User:",
user.uid
);


}


});







// ==========================
// OPEN USER WARDROBE
// ==========================


function openWardrobeDB(uid){


return new Promise((resolve,reject)=>{


const request =
indexedDB.open(
"FashionAI_"+uid,
1
);



request.onsuccess=(e)=>{


resolve(
e.target.result
);


};



request.onerror=(e)=>{


reject(e);


};



});


}









// ==========================
// PHOTO PREVIEW
// ==========================


personInput.onchange=()=>{


const img =
document.getElementById(
"personPreview"
);



img.src =
URL.createObjectURL(
personInput.files[0]
);



};









// ==========================
// CLOTH PREVIEW
// ==========================


clothInput.onchange=()=>{


const img =
document.getElementById(
"clothPreview"
);



img.src =
URL.createObjectURL(
clothInput.files[0]
);



};









// ==========================
// GENERATE TRY ON
// ==========================


window.generateTryOn = async function(){



const person =
personInput.files[0];



const cloth =
clothInput.files[0];



const loading =
document.getElementById(
"loading"
);



const result =
document.getElementById(
"resultImage"
);





if(!person){


alert(
"Upload your photo first"
);


return;


}





if(!cloth){


alert(
"Select clothes first"
);


return;


}





loading.innerHTML =
"🤖 AI is preparing your outfit...";







/*

NEXT STEP:

Send:

1. Person photo
2. Clothing photo

to Virtual Try-On AI model


AI returns:

Generated image
(person wearing selected clothes)


*/





// Temporary result

setTimeout(()=>{


loading.innerHTML =
"AI Try-On is ready for connection.";



},2000);




};
