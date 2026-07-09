import { db, auth } from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



window.getWeatherOutfit = async function(){


const output =
document.getElementById("weatherResult");


const user =
auth.currentUser;



if(!user){

output.innerText =
"Please login first";

return;

}



if(!navigator.geolocation){

output.innerText =
"Location not supported";

return;

}




navigator.geolocation.getCurrentPosition(async(position)=>{


try{


const lat =
position.coords.latitude;


const lon =
position.coords.longitude;




// GET WEATHER

const weatherRes =
await fetch(

`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`

);



const weather =
await weatherRes.json();



const temp =
weather.current_weather.temperature;


const code =
weather.current_weather.weathercode;




// GET WARDROBE

const snapshot =
await getDocs(

collection(
db,
"users",
user.uid,
"wardrobe"
)

);



let wardrobe=[];


snapshot.forEach(doc=>{

wardrobe.push(doc.data());

});



if(wardrobe.length===0){

output.innerText =
"Upload clothes first";

return;

}




let selected;



// HOT

if(temp >= 28){


selected =
wardrobe.find(
item=>item.style==="casual"
)
||
wardrobe[0];


}


// RAIN

else if(
code >=51 &&
code <=99
){


selected =
wardrobe.find(
item=>item.type==="hoodie"
)
||
wardrobe[0];


}


// COOL

else{


selected =
wardrobe.find(
item=>item.type==="shirt"
)
||
wardrobe[0];


}




const result = `

🌦 Weather:
${temp}°C


👕 Recommended Outfit:

${selected.color}
${selected.type}


✨ Reason:

Chosen based on your weather and wardrobe.

`;



output.innerText=result;




speechSynthesis.speak(
new SpeechSynthesisUtterance(result)
);



}

catch(error){

console.error(error);

output.innerText =
"Weather AI error: "+error.message;

}



});


};
