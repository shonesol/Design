import { auth } from "./firebase.js";

import {
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


const generateBtn =
document.getElementById("generateBtn");


const output =
document.getElementById("outfitResult");


let userID = null;

let db = null;



// LOGIN

onAuthStateChanged(auth, async(user)=>{


if(user){

userID=user.uid;

db =
await openDatabase(user.uid);

console.log(
"AI Wardrobe Ready"
);


}


});





// OPEN DATABASE

function openDatabase(uid){

return new Promise((resolve,reject)=>{


let request =
indexedDB.open(
"FashionAI_"+uid,
1
);



request.onsuccess=e=>{

resolve(e.target.result);

};


request.onerror=e=>{

reject(e);

};


});


}







// GET ALL CLOTHES

function getClothes(){


return new Promise((resolve)=>{


let transaction =
db.transaction(
"wardrobe",
"readonly"
);


let store =
transaction.objectStore(
"wardrobe"
);


let request =
store.getAll();


request.onsuccess=()=>{

resolve(request.result);

};


});


}








// COLOR AI SCORE

function colorScore(a,b){


if(!a || !b)

return 50;



if(
a.toLowerCase()
==
b.toLowerCase()
)

return 100;



return 75;


}








// OUTFIT SCORE

function outfitScore(top,bottom,shoe){


let score=0;


score +=
colorScore(
top.color,
bottom.color
);


score +=
colorScore(
bottom.color,
shoe.color
);


return Math.round(score/2);


}







// GENERATE OUTFITS


generateBtn.onclick =
async()=>{


if(!db){

output.innerHTML=
"Loading AI wardrobe...";

return;

}



let clothes =
await getClothes();



if(clothes.length<3){


output.innerHTML=
"Upload more clothes first";


return;


}




let tops =
clothes.filter(c=>

[
"shirt",
"tshirt",
"t-shirt",
"hoodie",
"jacket"
]
.includes(
c.type.toLowerCase()
)

);



let bottoms =
clothes.filter(c=>

[
"jeans",
"trousers",
"pants",
"skirt"
]
.includes(
c.type.toLowerCase()
)

);



let shoes =
clothes.filter(c=>

c.type
.toLowerCase()
.includes("shoe")

);





let outfits=[];



tops.forEach(top=>{


bottoms.forEach(bottom=>{


shoes.forEach(shoe=>{


let score =
outfitScore(
top,
bottom,
shoe
);



outfits.push({

top,
bottom,
shoe,
score

});


});


});


});





// BEST FIRST

outfits.sort(
(a,b)=>
b.score-a.score
);






output.innerHTML="";





outfits.slice(0,5)
.forEach((outfit)=>{



output.innerHTML += `


<div class="outfit-card">


<h2>
AI Match:
${outfit.score}%
</h2>



<img src="${outfit.top.image}">


<img src="${outfit.bottom.image}">


<img src="${outfit.shoe.image}">



<p>

👕 ${outfit.top.type}

<br>

👖 ${outfit.bottom.type}

<br>

👟 ${outfit.shoe.type}

</p>



<button onclick='saveWorn(${JSON.stringify(outfit)})'>

Wear This Outfit

</button>


</div>


`;



});





};










// SAVE LAST WORN


window.saveWorn=function(outfit){



let history =
JSON.parse(
localStorage.getItem(
"wearHistory"
)
||
"[]"
);



history.push({

date:new Date()
.toISOString(),


outfit:outfit


});



localStorage.setItem(

"wearHistory",

JSON.stringify(history)

);



alert(
"Outfit saved as worn"
);


};
