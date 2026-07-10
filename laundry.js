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





// LOAD CLOTHES

async function loadLaundry(user){


if(!user){

box.innerHTML =
"Please login first.";

return;

}



try{


box.innerHTML =
"🧺 Loading your AI wardrobe...";



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

onclick="openCloth(
'${item.image}',
'${item.type || "Clothing"}',
'${item.color || "Unknown"}',
'${item.hex || ""}'
)"

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






// OPEN BIG IMAGE

window.openCloth = function(
image,
type,
color,
hex
){


const modal =
document.getElementById(
"imageModal"
);



const preview =
document.getElementById(
"previewImage"
);



const details =
document.getElementById(
"details"
);



if(modal){


modal.style.display="flex";


preview.src=image;



details.innerHTML = `


<h2>${type}</h2>


<p>
🎨 Color:
${color}
</p>


${hex ? 
`<p>
HEX:
${hex}
</p>` 
:
""}


`;

}


};







// CLOSE IMAGE

window.closeImage=function(){


const modal =
document.getElementById(
"imageModal"
);


if(modal){

modal.style.display="none";

}


};







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







// LOGIN CHECK

onAuthStateChanged(
auth,
(user)=>{


loadLaundry(user);


});
