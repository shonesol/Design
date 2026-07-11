
// outfit-generator.js
// FashionAI Outfit Generator 2.0


import {auth}
from "./firebase.js";


import {
onAuthStateChanged
}
from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
openDatabase,
getClothes,
saveWearHistory
}
from "./db.js";


import {
analyzeUserStyle
}
from "./style-learning.js";

import {
learnUserFashion
}
from "./ai-learning.js";

import {
checkRecentlyWorn
}
from "./history-ai.js";


import {
getUserLocation
}
from "./location.js";


import {
getCurrentWeather
}
from "./weather-service.js";


import {
getOccasionStyle
}
from "./occasion-ai.js";


import {
explainOutfit
}
from "./fashion-stylist-ai.js";




// DATABASE

let database = null;


// MEMORY

let currentProfile = null;

let currentWeather = null;

let currentOccasion = null;





// LOGIN


onAuthStateChanged(
auth,
async(user)=>{


if(user){


database =
await openDatabase(
user.uid
);


console.log(
"FashionAI Outfit Engine Ready"
);


}



});








const button =
document.getElementById(
"generateBtn"
);



const output =
document.getElementById(
"outfitResult"
);









// ==========================
// COLOR MATCH AI
// ==========================


function colorScore(a,b){


if(!a || !b)

return 40;



a=a.toLowerCase();

b=b.toLowerCase();





if(a===b)

return 100;





const matches=[


["black","white"],

["black","grey"],

["navy","white"],

["blue","brown"],

["beige","white"],

["green","brown"],

["red","black"],

["white","blue"]

];





for(
let pair of matches
){


if(
pair.includes(a)
&&
pair.includes(b)
)

return 90;



}



return 60;


}









// ==========================
// SMART OUTFIT SCORE
// ==========================


function scoreOutfit(

top,

bottom,

shoe,

profile,

weather,

occasionStyles

){



let score=0;





// COLORS

score += colorScore(
top.color,
bottom.color
);



score += colorScore(
bottom.color,
shoe.color
);






// USER STYLE


let styles=[


top.style?.toLowerCase(),

bottom.style?.toLowerCase(),

shoe.style?.toLowerCase()


];





profile.favoriteStyles
.forEach(style=>{


if(
styles.includes(
style.toLowerCase()
)

){


score+=15;


}


});







// FAVORITE COLORS


profile.favoriteColors
.forEach(color=>{


if(

top.color
?.toLowerCase()
.includes(color)

){


score+=10;


}



});







// OCCASION


occasionStyles
.forEach(style=>{


if(
styles.includes(
style.toLowerCase()
)

){


score+=15;


}


});








// WEATHER


if(
weather.condition==="Rainy"
){


if(
shoe.name
?.toLowerCase()
.includes("boot")

){


score+=10;


}


}







return Math.min(

100,

Math.round(score)

);


}









// ==========================
// GENERATE BUTTON
// ==========================


button.onclick = async()=>{



if(!database){


output.innerHTML=
"Loading FashionAI...";


return;


}






const clothes =
await getClothes(
database
);



await learnUserFashion(
database
);


currentProfile =
await analyzeUserStyle(
database
);







currentOccasion =
document
.getElementById(
"occasion"
)
.value;






const location =
await getUserLocation();






currentWeather =
await getCurrentWeather(

location.latitude,

location.longitude

);






const occasionStyles =
getOccasionStyle(
currentOccasion
);






generateOutfits(

clothes,

currentProfile,

currentWeather,

occasionStyles

);



};









// ==========================
// AI OUTFIT ENGINE
// ==========================


async function generateOutfits(

clothes,

profile,

weather,

occasionStyles

){



let outfits=[];





const cleanClothes =
clothes.filter(item=>

item.laundryStatus==="Clean"
||
item.laundryStatus==="Ready"

);







const tops =
cleanClothes.filter(item=>

item.category==="Top"

);





const bottoms =
cleanClothes.filter(item=>

item.category==="Bottom"

);





const shoes =
cleanClothes.filter(item=>

item.category==="Shoes"

);







if(
tops.length===0 ||
bottoms.length===0 ||
shoes.length===0

){


output.innerHTML=

`

<h3>
Upload more clothes
</h3>

<p>
Need tops, bottoms and shoes.
</p>

`;

return;


}








for(
const top of tops
){


for(
const bottom of bottoms
){


for(
const shoe of shoes
){





let score =
scoreOutfit(

top,

bottom,

shoe,

profile,

weather,

occasionStyles

);







let worn =
await checkRecentlyWorn(

database,

{

top,

bottom,

shoe

}

);







if(!worn){


outfits.push({

top,

bottom,

shoe,

score


});


}




}



}



}








outfits.sort(

(a,b)=>

b.score-a.score

);






displayOutfits(

outfits.slice(0,5)

);



}









// ==========================
// DISPLAY RESULTS
// ==========================


async function displayOutfits(
outfits
){



output.innerHTML="";





if(
outfits.length===0
){


output.innerHTML=

`

<h3>
No new outfit found
</h3>

`;

return;


}







for(
const outfit of outfits
){



const explanation =

await explainOutfit(

outfit,

currentProfile,

currentOccasion,

currentWeather

);






output.innerHTML +=

`

<div class="outfit-card">


<h2>

🤖 AI Match

${outfit.score}%

</h2>



<img src="${outfit.top.image}" width="120">


<img src="${outfit.bottom.image}" width="120">


<img src="${outfit.shoe.image}" width="120">





<p>

👕 ${outfit.top.name || outfit.top.type}

<br>

👖 ${outfit.bottom.name || outfit.bottom.type}

<br>

👟 ${outfit.shoe.name || outfit.shoe.type}

</p>




<h3>
✨ FashionAI Advice
</h3>


<p>

${explanation}

</p>




<button onclick='wearOutfit(${JSON.stringify(outfit)})'>

👕 Wear This Outfit

</button>



</div>

`;



}



}









// ==========================
// SAVE HISTORY
// ==========================


window.wearOutfit =
async function(outfit){



await saveWearHistory(

database,

outfit

);



alert(

"✅ FashionAI remembered your outfit"

);



};
