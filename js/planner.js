// planner.js
// FashionAI Outfit Planner Engine


import {
getDatabase
}
from "./database-manager.js";


import {
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



document
.getElementById(
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

Season:
${currentWeather.season}

`;



}

catch(error){


document
.getElementById(
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

document
.getElementById(
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


output.innerHTML=

`

<h3>
Upload more clothes first
</h3>

<p>

Need tops, bottoms and shoes.

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
// DISPLAY OUTFIT
// ==========================


function displayGeneratedOutfit(
outfit
){


if(!outfit){

return;

}



output.innerHTML=

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

👕 ${outfit.top.name}

<br>

👖 ${outfit.bottom.name}

<br>

👟 ${outfit.shoe.name}

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

document
.getElementById(
"planDate"
)
.value,


occasion:

document
.getElementById(
"planOccasion"
)
.value,


notes:

document
.getElementById(
"planNotes"
)
.value,



outfit:selectedOutfit,


createdAt:Date.now()


};




await savePlan(
plan
);



alert(
"✅ Outfit planned successfully"
);



loadPlans();


};







// ==========================
// SAVE TO DATABASE
// ==========================


function savePlan(plan){


return new Promise(
(resolve,reject)=>{


const transaction =

database.transaction(

"plans",

"readwrite"

);



const store =

transaction.objectStore(
"plans"
);



const request =

store.add(plan);



request.onsuccess=()=>resolve();



request.onerror=()=>reject(
request.error
);



});

}







// ==========================
// LOAD PLANS
// ==========================


async function loadPlans(){


const transaction =

database.transaction(
"plans",
"readonly"
);



const store =

transaction.objectStore(
"plans"
);



const request =
store.getAll();



request.onsuccess=()=>{


displayPlans(
request.result
);


};



}





// ==========================
// DISPLAY PLANS
// ==========================


function displayPlans(data){


plans.innerHTML="";



if(data.length===0){


plans.innerHTML=

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

👕 ${plan.outfit.top.name}

<br>

👖 ${plan.outfit.bottom.name}

<br>

👟 ${plan.outfit.shoe.name}

</p>


</div>

`;

});


}





loadPlans();
