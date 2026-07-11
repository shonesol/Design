// weather-service.js
// FashionAI Weather Intelligence


const WEATHER_API_KEY =
"YOUR_OPENWEATHER_API_KEY";





export async function getCurrentWeather(

latitude,

longitude

){



try{



const response =

await fetch(

`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`

);





const data =

await response.json();






const condition =

data.weather[0].main;






let season="Normal";



if(
data.main.temp >= 30
){

season="Hot";


}



if(
data.main.temp <= 18
){

season="Cold";


}






return {


temperature:

data.main.temp,



condition,



description:

data.weather[0].description,



humidity:

data.main.humidity,



season



};





}

catch(error){



console.error(
"Weather Error:",
error
);



return {


temperature:25,


condition:"Clear",


description:"Normal weather",


humidity:50,


season:"Normal"



};



}



}
