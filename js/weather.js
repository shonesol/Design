// weather.js
// FashionAI Weather Intelligence


const WEATHER_API_KEY = "YOUR_WEATHER_API_KEY";



// ==========================
// GET CURRENT WEATHER
// ==========================

export async function getWeather(latitude, longitude){


try{


const response =
await fetch(

`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`

);



const data =
await response.json();




return {


temperature:
data.main.temp,


humidity:
data.main.humidity,


condition:
data.weather[0].main,


description:
data.weather[0].description



};



}

catch(error){


console.error(
"Weather Error:",
error
);


return null;


}


}






// ==========================
// FASHION WEATHER ANALYSIS
// ==========================


export function analyzeWeather(weather){



if(!weather)
return {};



let advice = [];



let avoid = [];





// HOT

if(weather.temperature >= 28){


advice.push(
"Light breathable fabrics",
"Cotton",
"Linen",
"Short sleeves"
);


avoid.push(
"Heavy jackets",
"Thick wool"
);


}





// COOL

else if(
weather.temperature >= 18
&&
weather.temperature <28
){


advice.push(
"Light jacket",
"Long sleeves",
"Layering"
);


}





// COLD

else{


advice.push(
"Coat",
"Sweater",
"Wool",
"Warm layers"
);


}





// RAIN

if(
weather.condition
.toLowerCase()
.includes("rain")
){


advice.push(
"Waterproof jacket",
"Boots"
);



avoid.push(
"Suede shoes",
"Light fabrics"
);



}





return {


temperature:
weather.temperature,


condition:
weather.condition,


wearRecommendations:
advice,


avoid

};


}
