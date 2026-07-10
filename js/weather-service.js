// FashionAI Real Weather Service


const WEATHER_API_KEY =
"YOUR_OPENWEATHER_API_KEY";



export async function getCurrentWeather(
latitude,
longitude
){


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


condition:
data.weather[0].main,


description:
data.weather[0].description,


city:
data.name


};



}

catch(error){


console.error(
"Weather error:",
error
);



return null;


}


}
