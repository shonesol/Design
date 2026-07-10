// laundry.js

import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


const box = document.getElementById("laundryList");



// OPEN USER DATABASE

function openDatabase(uid){

return new Promise((resolve,reject)=>{


const request = indexedDB.open(
"FashionAI_"+uid,
1
);



request.onsuccess = (event)=>{

resolve(event.target.result);

};



request.onerror = (event)=>{

reject(event.target.error);

};


});

}





// LOAD CLOTHES FROM INDEXEDDB

async function loadLaundry(user){


if(!user){

box.innerHTML =
"Please login first.";

return;

}



try{


box.innerHTML =
"🧺 Loading your wardrobe...";



const db =
await openDatabase(user.uid);



const transaction =
db.transaction(
"wardrobe",
"readonly"
);



const store =
transaction.objectStore(
"wardrobe"
);



const request =
store.getAll();



request.onsuccess = ()=>{


const clothes =
request.result;



if(clothes.length === 0){

box.innerHTML =
"No clothes uploaded yet.";

return;

}



let html="";



clothes.reverse().forEach((item)=>{


html += `


<div class="cloth-card">


<img 
src="${item.image}"
alt="clothing"
>


<h3>
${item.type || "Clothing"}
</h3>


<p>
🎨 Color:
${item.color || "Unknown"}
</p>


<p>
✨ Style:
${item.style || "Casual"}
</p>


<p>
🌦 Season:
${item.season || "All"}
</p>



<button onclick="deleteCloth(${item.id})">
🗑 Delete
</button>


</div>


`;

});


box.innerHTML = html;


};



}catch(error){


console.error(
"Loading error:",
error
);


box.innerHTML =
"Error loading clothes";


}


}





// DELETE CLOTH

window.deleteCloth = async function(id){


const user = auth.currentUser;


if(!user) return;



const db =
await openDatabase(user.uid);



const transaction =
db.transaction(
"wardrobe",
"readwrite"
);



const store =
transaction.objectStore(
"wardrobe"
);



store.delete(id);



transaction.oncomplete=()=>{


loadLaundry(user);


};


};





// WAIT FOR LOGIN

onAuthStateChanged(
auth,
(user)=>{


loadLaundry(user);


});
