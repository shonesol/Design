// planner.js
// FashionAI Outfit Planner Engine


import {
getDatabase
}
from "./database-manager.js";


import {
getClothes,
saveOutfitPlan,
getOutfitPlans,
deleteOutfitPlan
}
from "./db.js";


import {
scoreOutfit
}
from "./outfit-score.js";


import {
getOccasionStyle
}
from "./occasion-ai.js";


import {
getCurrentWeather
}
from "./weather-service.js";


import {
getUserLocation
}
from "./location.js";





// ==========================
// DATABASE
// ==========================


const database =

await getDatabase();





// ==========================
// VARIABLES
// ==========================


let selectedOutfit = null;

let currentWeather = null;






// ==========================
// ELEMENTS
// ==========================


const generateButton =

document.getElementById(
"generatePlan"
);



const saveButton =

document.getElementById(
"savePlan"
);



const output =

document.getElementById(
"generatedOutfit"
);



const plans =

document.getElementById(
"plansList"
);








// ==========================
// LOAD WEATHER
// ==========================


async function loadWeather(){


try{


const location =

await getUserLocation();



currentWeather =

await getCurrentWeather(

location.latitude,

location.longitude

);



document.getElementById(
"weatherBox"
)
.innerHTML =

`

🌤 Condition:
${currentWeather.condition}

<br>

🌡 Temperature:
${currentWeather.temperature}°

<br>

🍂 Season:
${currentWeather.season}

`;



}

catch(error){


document.getElementById(
"weatherBox"
)
.innerHTML =

"Weather unavailable";


}


}



loadWeather();








// ==========================
// GENERATE OUTFIT
// ==========================


generateButton.onclick =

async()=>{


const occasion =

document.getElementById(
"planOccasion"
)
.value;



const clothes =

await getClothes(
database
);





const tops =

clothes.filter(item=>

item.category==="Top"

);



const bottoms =

clothes.filter(item=>

item.category==="Bottom"

);



const shoes =

clothes.filter(item=>

item.category==="Shoes"

);





if(

tops.length===0 ||

bottoms.length===0 ||

shoes.length===0

){


output.innerHTML =

`

<h3>
Upload more clothes first
</h3>

<p>
FashionAI needs tops, bottoms and shoes.
</p>

`;

return;


}






const styles =

getOccasionStyle(
occasion
);





let best = null;

let highest = 0;





for(const top of tops){


for(const bottom of bottoms){


for(const shoe of shoes){



const score =

await scoreOutfit(

database,

top,

bottom,

shoe,

{},

currentWeather,

styles

);





if(score > highest){


highest = score;


best = {

top,

bottom,

shoe,

score

};


}



}



}



}







selectedOutfit = best;



displayGeneratedOutfit(
best
);



};









// ==========================
// DISPLAY GENERATED OUTFIT
// ==========================


function displayGeneratedOutfit(outfit){


if(!outfit){

return;

}



output.innerHTML =

`

<div class="outfit-preview">


<img src="${outfit.top.image}">


<img src="${outfit.bottom.image}">


<img src="${outfit.shoe.image}">


</div>



<h3>

🤖 AI Match:
${outfit.score}%

</h3>



<p>

👕 ${outfit.top.name || outfit.top.type}

<br>

👖 ${outfit.bottom.name || outfit.bottom.type}

<br>

👟 ${outfit.shoe.name || outfit.shoe.type}

</p>

`;

}









// ==========================
// SAVE PLAN
// ==========================


saveButton.onclick =

async()=>{


if(!selectedOutfit){


alert(
"Generate an outfit first"
);


return;


}



const plan = {


date:

document.getElementById(
"planDate"
)
.value,



occasion:

document.getElementById(
"planOccasion"
)
.value,



notes:

document.getElementById(
"planNotes"
)
.value,



outfit:selectedOutfit,



createdAt:Date.now()


};





await saveOutfitPlan(

database,

plan

);





alert(

"✅ Outfit planned successfully"

);



loadPlans();



};









// ==========================
// LOAD PLANS
// ==========================


async function loadPlans(){


const data =

await getOutfitPlans(

database

);



displayPlans(data);



}









// ==========================
// DISPLAY PLANS
// ==========================


function displayPlans(data){


plans.innerHTML="";



if(data.length===0){


plans.innerHTML =

`

<div class="empty-plan">

No outfit plans yet.

</div>

`;

return;

}




data.forEach(plan=>{


plans.innerHTML +=

`

<div class="plan-card">


<h3>

📅 ${plan.date}

</h3>



<p>

Occasion:
${plan.occasion}

</p>



<p>

👕 ${plan.outfit.top.name || plan.outfit.top.type}

<br>

👖 ${plan.outfit.bottom.name || plan.outfit.bottom.type}

<br>

👟 ${plan.outfit.shoe.name || plan.outfit.shoe.type}

</p>



<button onclick="removePlan(${plan.id})">

🗑 Delete Plan

</button>


</div>

`;

});


}









// ==========================
// DELETE PLAN
// ==========================


window.removePlan =

async function(id){


await deleteOutfitPlan(

database,

id

);



alert(

"✅ Plan deleted"

);



loadPlans();


};







loadPlans();
