
import {auth} from "./firebase.js";

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



let database=null;



onAuthStateChanged(
auth,
async(user)=>{


if(user){


database =
await openDatabase(
user.uid
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
// COLOR MATCHING AI
// ==========================


function colorScore(a,b){


if(!a || !b)
return 40;



a=a.toLowerCase();

b=b.toLowerCase();




if(a===b)
return 100;



const goodMatches=[


["black","white"],

["black","grey"],

["navy","white"],

["blue","brown"],

["beige","white"],

["green","brown"],

["red","black"],

["white","blue"]

];





for(let pair of goodMatches){


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
// OUTFIT SCORE
// ==========================


// ==========================
// FASHIONAI SMART OUTFIT SCORE
// ==========================

function scoreOutfit(
top,
bottom,
shoe,
profile,
weather,
occasionStyles
){


let score = 0;



// COLOR MATCHING

score += colorScore(
top.color,
bottom.color
);


score += colorScore(
bottom.color,
shoe.color
);




// PERSONAL STYLE MATCH

let styles = [

top.style?.toLowerCase(),

bottom.style?.toLowerCase(),

shoe.style?.toLowerCase()

];



profile.favoriteStyles.forEach(style=>{


if(
styles.includes(
style.toLowerCase()
)

){

score += 15;

}


});




// FAVORITE COLORS

profile.favoriteColors.forEach(color=>{


if(

top.color
?.toLowerCase()
.includes(color)

){

score +=10;

}


});




// OCCASION MATCH

occasionStyles.forEach(style=>{


if(
styles.includes(
style.toLowerCase()
)

){

score +=15;

}


});




// WEATHER MATCH

if(
weather.condition==="Rainy"
){


if(
shoe.name
?.toLowerCase()
.includes("boot")

){

score +=10;

}


}




return Math.min(
100,
Math.round(score)
);


}



// COLOR MATCH

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





// STYLE MATCH

let outfitStyles=[

top.style?.toLowerCase(),

bottom.style?.toLowerCase(),

shoe.style?.toLowerCase()

];





profile.favoriteStyles.forEach(style=>{


if(
outfitStyles.includes(
style.toLowerCase()
)

)

{

score +=20;

}


});







// COLOR PREFERENCE


profile.favoriteColors.forEach(color=>{


if(

top.color
?.toLowerCase()
.includes(color)

)

{

score+=10;

}


});






return Math.min(
100,
Math.round(score/2)
);


}



// ==========================
// GENERATE OUTFITS
// ==========================

button.onclick =
async()=>{


if(!database){

output.innerHTML=
"Loading wardrobe...";

return;

}



const clothes =
await getClothes(database);



const profile =
await analyzeUserStyle(database);





const occasion =
document
.getElementById("occasion")
.value;





const location =
await getUserLocation();



const weather =
await getCurrentWeather(

location.latitude,

location.longitude

);





const occasionStyles =
getOccasionStyle(
occasion
);



generateOutfits(
clothes,
profile,
weather,
occasionStyles
);


};
async function generateOutfits(
clothes,
profile,
weather,
occasionStyles
){


let outfits=[];


const tops =
clothes.filter(
c=>c.category==="Top"
);



const bottoms =
clothes.filter(
c=>c.category==="Bottom"
);



const shoes =
clothes.filter(
c=>c.category==="Shoes"
);





for(const top of tops){


for(const bottom of bottoms){


for(const shoe of shoes){



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

function displayOutfits(outfits){


output.innerHTML="";



if(outfits.length===0){


output.innerHTML=`

<h3>
No AI outfit found
</h3>

<p>
Try uploading more clothes.
</p>

`;

return;


}




outfits.forEach(outfit=>{


output.innerHTML += `


<div class="outfit-card">


<h2>
🤖 AI Match ${outfit.score}%
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



<button onclick='wearOutfit(${JSON.stringify(outfit)})'>

👕 Wear This Outfit

</button>


</div>


`;


});


}
