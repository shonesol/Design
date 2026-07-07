import { db, auth } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.getWeatherOutfit = async function () {
  const output = document.getElementById("weatherResult");
  const user = auth.currentUser;

  if (!user) {
    output.innerText = "Please login first";
    return;
  }

  // 🌍 STEP 1: Get weather (global default)
  const weatherRes = await fetch(
 // 🌍 GET USER LOCATION

navigator.geolocation.getCurrentPosition(async(position)=>{


const lat = position.coords.latitude;
const lon = position.coords.longitude;


// 🌦 GET GLOBAL WEATHER

const weatherRes = await fetch(

`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`

);


const weatherData = await weatherRes.json();


const temp =
weatherData.current_weather.temperature;


const weatherCode =
weatherData.current_weather.weathercode;


// Continue with your wardrobe AI here...

});
    if(!navigator.geolocation){

output.innerText =
"Your device does not support location.";

return;

}
      (error)=>{

output.innerText =
"Please allow location access for Weather AI.";

}
  );

  const weatherData = await weatherRes.json();
  const temp = weatherData.current_weather.temperature;
  const weatherCode = weatherData.current_weather.weathercode;

  // 👕 STEP 2: Get wardrobe
  const snapshot = await getDocs(collection(db, "users", user.uid, "wardrobe"));

  let wardrobe = [];
  snapshot.forEach(doc => wardrobe.push(doc.data()));
if (wardrobe.length === 0) {

output.innerText =
"Your wardrobe is empty. Upload clothes first.";

return;

}
  let outfit = "";

  // ☀️ HOT WEATHER
  if (temp >= 28) {
    let light = wardrobe.find(i => i.style === "casual") || wardrobe[0];

    outfit =
☀️ ${season} Weather (${temp}°C)
    output.innerText = 

`
🌍 Season:
${season}

🌡 Temperature:
${temp}°C


👗 AI Outfit:

${outfit}
`;
Wear:
👕 ${light?.type} - ${light?.color}
👖 Light and breathable clothes

Stay cool 😎`;
  }

  // 🌧 RAINY WEATHER
else if (
weatherCode >= 51 &&
weatherCode <= 67 ||
weatherCode >= 80 &&
weatherCode <= 99
)
    let hoodie = wardrobe.find(i => i.type === "hoodie");

    outfit = `🌧 Rainy Weather (${temp}°C)

Wear:
🧥 ${hoodie?.color || "dark"} hoodie
👖 Jeans
👟 Waterproof shoes

Stay dry ☔`;
  }

  // 🌙 COOL WEATHER
  else {
    let formal = wardrobe.find(i => i.type === "shirt");

    outfit = `🌙 Cool Weather (${temp}°C)

Wear:
👔 ${formal?.color || "nice"} shirt
👖 Jeans or trousers
👟 Clean shoes

Look smart 🔥`;
  }

  output.innerText = outfit;

  // 🔊 VOICE AI
  const speech = new SpeechSynthesisUtterance(outfit);
  speechSynthesis.speak(speech);
};
