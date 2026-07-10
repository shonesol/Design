// wardrobe.js
// Local AI Wardrobe using IndexedDB


let db;



// ==========================
// CREATE DATABASE
// ==========================

const request =
indexedDB.open("FashionAI_Wardrobe",1);



request.onupgradeneeded = function(e){

db = e.target.result;


if(!db.objectStoreNames.contains("clothes")){

db.createObjectStore(
"clothes",
{
keyPath:"id",
autoIncrement:true
}

);

}

};



request.onsuccess=function(e){

db=e.target.result;

loadWardrobe();

};




// ==========================
// SAVE CLOTH
// ==========================


window.saveClothes=function(){



const file =
document
.getElementById("clothesImage")
.files[0];



const category =
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

message.innerHTML=
"Choose clothing image";

return;

}



const reader =
new FileReader();



reader.onload=function(){



const transaction =
db.transaction(
["clothes"],
"readwrite"
);



const store =
transaction.objectStore(
"clothes"
);



store.add({

image:reader.result,

type:category,

color:color,

style:"casual",

favorite:false,

date:new Date()

});



transaction.oncomplete=function(){


message.innerHTML=
"Clothing saved ✅";


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



if(!box)return;



box.innerHTML=
"Loading...";



const transaction =
db.transaction(
["clothes"],
"readonly"
);



const store =
transaction.objectStore(
"clothes"
);



const request =
store.getAll();



request.onsuccess=function(){



const clothes =
request.result;



box.innerHTML="";



if(clothes.length===0){

box.innerHTML=
"No clothes saved";

return;

}



clothes.forEach(item=>{



box.innerHTML += `


<div class="card">


<img 
src="${item.image}"
width="200">


<h3>
${item.type}
</h3>


<p>
Color: ${item.color}
</p>


<p>
Style: ${item.style}
</p>


<p>
${item.favorite?"❤️ Favorite":""}
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
db.transaction(
["clothes"],
"readwrite"
);



const store =
transaction.objectStore(
"clothes"
);



const get =
store.get(id);



get.onsuccess=function(){


let item=get.result;


item.favorite=true;


store.put(item);


loadWardrobe();


};


};






// ==========================
// DELETE
// ==========================


window.deleteCloth=function(id){


const transaction =
db.transaction(
["clothes"],
"readwrite"
);



transaction
.objectStore("clothes")
.delete(id);



transaction.oncomplete=function(){

loadWardrobe();

};


};
