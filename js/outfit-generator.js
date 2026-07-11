// outfit-generator.js
// FashionAI Outfit Generator 2.0


import {
getClothes,
saveWearHistory
}
from "./db.js";


import {
getDatabase
}
from "./database-manager.js";


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


import {
likeOutfit,
dislikeOutfit
}
from "./feedback-ai.js";


import {
scoreOutfit
}
from "./outfit-score.js";


import {
saveOutfitPlan
}
from "./db.js";


let database=null;


let currentProfile=null;

let currentWeather=null;

let currentOccasion=null;







// ==========================
// DATABASE CONNECTION
// ==========================


try{


database =
await getDatabase();



console.log(
"✅ FashionAI Outfit Engine Ready"
);


}

catch(error){


console.error(
"Database Error:",
error
);


}









const button =
document.getElementById(
"generateBtn"
);



const output =
document.getElementById(
"outfitResult"
);









if(button){


button.onclick = async()=>{


if(!database){


output.innerHTML =
"Database loading...";


return;


}






try{


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





}

catch(error){


console.error(error);


output.innerHTML =
"❌ FashionAI could not generate outfit";


}



};



}









// ==========================
// GENERATE OUTFITS
// ==========================


async function generateOutfits(

clothes,

profile,

weather,

occasionStyles

){



let outfits=[];





const clean =

clothes.filter(item =>

item.laundryStatus==="Clean"

||

item.laundryStatus==="Ready"

);







const tops =

clean.filter(item=>

item.category==="Top"

);





const bottoms =

clean.filter(item=>

item.category==="Bottom"

);





const shoes =

clean.filter(item=>

item.category==="Shoes"

);







if(
!tops.length ||
!bottoms.length ||
!shoes.length
){


output.innerHTML=

`

<h3>
👗 Wardrobe incomplete
</h3>


<p>
Upload tops, bottoms and shoes.
</p>

`;


return;


}







for(const top of tops){


for(const bottom of bottoms){


for(const shoe of shoes){



const score =

await scoreOutfit(

database,

top,

bottom,

shoe,

profile,

weather,

occasionStyles

);







const worn =

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
// DISPLAY
// ==========================


async function displayOutfits(outfits){



output.innerHTML="";





if(!outfits.length){


output.innerHTML=

`

<h3>
No new outfit available
</h3>

`;

return;


}






for(
let i=0;
i<outfits.length;
i++
){


const outfit =
outfits[i];





const explanation =

await explainOutfit(

outfit,

currentProfile,

currentOccasion,

currentWeather

);






window[
"outfit_"+i
]=outfit;






output.innerHTML +=


`

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



<h3>
✨ FashionAI Advice
</h3>


<p>
${explanation}
</p>



<button onclick="wearOutfit(${i})">

👕 Wear This Outfit

</button>



<button onclick="loveOutfit(${i})">

❤️ Love It

</button>



<button onclick="hateOutfit(${i})">

❌ Don't Like

</button>


</div>

<button onclick='planOutfit(${JSON.stringify(outfit)})'>

📅 Plan This Outfit

</button>
`;



}



}









// ==========================
// WEAR MEMORY
// ==========================


window.wearOutfit = async(index)=>{


const outfit =
window[
"outfit_"+index
];



await saveWearHistory(

database,

outfit

);



alert(
"✅ FashionAI remembered this outfit"
);



};









// ==========================
// AI FEEDBACK
// ==========================


window.loveOutfit = async(index)=>{


const outfit =
window[
"outfit_"+index
];



await likeOutfit(

database,

outfit

);



alert(
"❤️ FashionAI learned your style"
);



};







window.hateOutfit = async(index)=>{


const outfit =
window[
"outfit_"+index
];



await dislikeOutfit(

database,

outfit

);



alert(
"❌ FashionAI will adjust future outfits"
);



};
// ==========================
// PLAN OUTFIT
// ==========================


window.planOutfit =

async function(outfit){


const plan = {


date:

new Date()
.toISOString()
.split("T")[0],



occasion:

currentOccasion || "Casual",



notes:

"Created from AI Outfit Generator",



outfit,



createdAt:

Date.now()


};




await saveOutfitPlan(

database,

plan

);



alert(

"📅 Outfit added to planner"

);


};
