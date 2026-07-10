import { auth } from "./firebase.js";


import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
openDatabase,
getClothes
}
from "./db.js";


import {
calculateFashionScore
}
from "./recommendation-engine.js";



let database=null;



onAuthStateChanged(
auth,
async(user)=>{


if(user){

database =
await openDatabase(
user.uid
);


console.log(
"FashionAI Outfit Ready"
);

}


});






document
.getElementById("generateBtn")
.onclick =
async()=>{


if(!database){

alert(
"Please wait. Loading wardrobe..."
);

return;

}



const clothes =
await getClothes(database);



if(clothes.length < 3){

document
.getElementById("outfitResult")
.innerHTML =
"Upload at least 3 clothes (top, bottom, shoes) first.";

return;

}





let tops =
clothes.filter(
item =>
item.category?.toLowerCase()
.includes("top")
);



let bottoms =
clothes.filter(
item =>
item.category?.toLowerCase()
.includes("bottom")
);



let shoes =
clothes.filter(
item =>
item.category?.toLowerCase()
.includes("shoe")
);





if(
tops.length===0 ||
bottoms.length===0 ||
shoes.length===0
){

document
.getElementById("outfitResult")
.innerHTML =
"AI needs a top, bottom and shoes in your wardrobe.";

return;

}





let occasion =
document
.getElementById("occasion")
.value;




let outfits=[];




tops.forEach(top=>{


bottoms.forEach(bottom=>{


shoes.forEach(shoe=>{


let result =
calculateFashionScore(

[
top,
bottom,
shoe
],

occasion,

null,

null

);




outfits.push({

top,
bottom,
shoe,

score:
result.score,

details:
result.details


});



});


});


});






outfits.sort(
(a,b)=>
b.score-a.score
);




showOutfits(
outfits.slice(0,5)
);



};







function showOutfits(outfits){


const box =
document
.getElementById(
"outfitResult"
);



box.innerHTML="";



outfits.forEach(item=>{


box.innerHTML += `


<div class="outfit-card">


<h2>
⭐ ${item.score}% Match
</h2>



<div class="images">

<img src="${item.top.image}">

<img src="${item.bottom.image}">

<img src="${item.shoe.image}">

</div>



<p>

👕 ${item.top.type}

<br>

👖 ${item.bottom.type}

<br>

👟 ${item.shoe.type}

</p>



<p>

🎨 Color:
${item.details.color}%

<br>

🔥 Trend:
${item.details.trend}%

</p>



<button onclick='wearThis(${JSON.stringify(outfit)})'>

👕 Wear This

</button>
import {
wearOutfit
}
from "./outfit-memory.js";



window.wearThis =
function(outfit){


wearOutfit(
database,
outfit
);


alert(
"FashionAI recorded your outfit"
);


};


<button>
👔 Wear This
</button>


</div>


`;



});


}
