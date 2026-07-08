import { storage, db, auth } from "./firebase.js";

import {
ref,
uploadBytes,
getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";


import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



// ==========================
// SAVE CLOTHES
// ==========================

window.saveClothes = async function(){


const file =
document.getElementById("clothesImage").files[0];


let category =
document.getElementById("category").value;


const color =
document.getElementById("color").value;


const message =
document.getElementById("message");



const user =
auth.currentUser;



if(!user){

message.innerHTML =
"Please login first";

return;

}



if(!file){

message.innerHTML =
"Choose an image";

return;

}



// Convert categories to AI friendly names

category = category.toLowerCase();



if(category.includes("t-shirt") || category.includes("tshirt")){
category = "shirt";
}


if(category.includes("pant")){
category = "trousers";
}


if(category.includes("sneaker") || category.includes("shoe")){
category = "shoes";
}


try{


message.innerHTML="Uploading...";



// Upload image

const imageRef =
ref(
storage,
"wardrobe/" + user.uid + "/" + Date.now()
);



await uploadBytes(
imageRef,
file
);



const imageUrl =
await getDownloadURL(imageRef);





// Save to Firestore

await addDoc(

collection(
db,
"users",
user.uid,
"wardrobe"
),

{


imageUrl:imageUrl,


type:category,


color:color,


style:"casual",


favorite:false,


createdAt:Date.now()


}

);



message.innerHTML =
"Clothing saved successfully ✅";



loadWardrobe();



}


catch(error){


console.error(error);


message.innerHTML =
error.message;


}



};






// ==========================
// LOAD WARDROBE
// ==========================


async function loadWardrobe(){


const box =
document.getElementById("wardrobe");


if(!box)return;



const user =
auth.currentUser;



if(!user){

box.innerHTML =
"Login first";

return;

}



box.innerHTML =
"Loading clothes...";



const snapshot =
await getDocs(

collection(
db,
"users",
user.uid,
"wardrobe"
)

);



box.innerHTML="";



if(snapshot.empty){

box.innerHTML =
"No clothes uploaded yet";

return;

}



snapshot.forEach((item)=>{


const data =
item.data();



box.innerHTML += `


<div class="card">


<img src="${data.imageUrl}" width="200">


<h3>
${data.type}
</h3>


<p>
Color: ${data.color}
</p>


<p>
Style: ${data.style}
</p>



<p>
${data.favorite ? "❤️ Favorite" : ""}
</p>



<button onclick="favoriteCloth('${item.id}')">

❤️ Favorite

</button>



<button onclick="removeCloth('${item.id}')">

🗑 Delete

</button>



</div>


`;



});


}







// ==========================
// FAVORITE
// ==========================


window.favoriteCloth = async function(id){


const user =
auth.currentUser;


await updateDoc(

doc(
db,
"users",
user.uid,
"wardrobe",
id
),

{

favorite:true

}

);



loadWardrobe();


};







// ==========================
// DELETE
// ==========================


window.removeCloth = async function(id){


const user =
auth.currentUser;



await deleteDoc(

doc(
db,
"users",
user.uid,
"wardrobe",
id
)

);



loadWardrobe();


};






// Load after login

onAuthStateChanged(auth,()=>{

loadWardrobe();

});
