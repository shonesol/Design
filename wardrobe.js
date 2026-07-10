// wardrobe.js

import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


let currentUser = null;
let database = null;



// ==========================
// CREATE / OPEN USER WARDROBE
// ==========================


function openWardrobeDB(uid){


return new Promise((resolve,reject)=>{


const request =
indexedDB.open(
"FashionAI_" + uid,
1
);



request.onupgradeneeded=(event)=>{


const db =
event.target.result;



if(!db.objectStoreNames.contains("wardrobe")){


db.createObjectStore(

"wardrobe",

{

keyPath:"id",

autoIncrement:true

}

);


}



};





request.onsuccess=(event)=>{


database =
event.target.result;


resolve(database);



};



request.onerror=(error)=>{


reject(error);



};



});



}






// ==========================
// LOGIN CHECK
// ==========================


onAuthStateChanged(auth,async(user)=>{


if(user){


currentUser=user;


database =
await openWardrobeDB(
user.uid
);



loadWardrobe();


}


});









// ==========================
// SAVE CLOTHES
// ==========================


window.saveClothes=function(){



const file =
document
.getElementById("clothesImage")
.files[0];



const type =
document
.getElementById("category")
.value;



const color =
document
.getElementById("color")
.value;



const message =
document
.getElementById("message");





if(!file){


message.innerHTML =
"Choose an image first";


return;


}





const reader =
new FileReader();





reader.onload=function(){



const transaction =
database.transaction(

"wardrobe",

"readwrite"

);



const store =
transaction.objectStore(
"wardrobe"
);






store.add({


image:reader.result,


type:type,


color:color,


favorite:false,


createdAt:Date.now()


});





transaction.oncomplete=()=>{


message.innerHTML =
"Clothing saved successfully ✅";


loadWardrobe();



};





};





reader.readAsDataURL(file);





};









// ==========================
// LOAD WARDROBE
// ==========================


function loadWardrobe(){



const box =
document.getElementById("wardrobe");



if(!box || !database)
return;





const transaction =
database.transaction(

"wardrobe",

"readonly"

);



const store =
transaction.objectStore(
"wardrobe"
);



const request =
store.getAll();





request.onsuccess=function(){



const clothes =
request.result;



box.innerHTML="";





if(clothes.length===0){


box.innerHTML =
"No clothes added yet";


return;


}






clothes.forEach(item=>{



box.innerHTML += `


<div class="card">


<img src="${item.image}">


<h3>
${item.type}
</h3>


<p>
Color: ${item.color}
</p>


<p>
${item.favorite ? "❤️ Favorite":""}
</p>



<button onclick="favoriteCloth(${item.id})">

❤️ Favorite

</button>



<button onclick="deleteCloth(${item.id})">

🗑 Delete

</button>



</div>


`;



});





};



}










// ==========================
// FAVORITE
// ==========================


window.favoriteCloth=function(id){



const transaction =
database.transaction(

"wardrobe",

"readwrite"

);



const store =
transaction.objectStore(
"wardrobe"
);



const request =
store.get(id);




request.onsuccess=()=>{


let item =
request.result;



item.favorite =
true;



store.put(item);



loadWardrobe();



};



};









// ==========================
// DELETE
// ==========================


window.deleteCloth=function(id){



const transaction =
database.transaction(

"wardrobe",

"readwrite"

);



transaction
.objectStore("wardrobe")
.delete(id);




transaction.oncomplete=()=>{


loadWardrobe();



};



};
