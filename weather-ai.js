import { db, auth } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";

window.getWeatherOutfit = async function () {
  const output = document.getElementById("weatherResult");
  const user = auth.currentUser;

  if (!user) {
    output.innerText = "Please login first";
    return;
  }

  // 🌍 STEP 1: Get weather (Kampala default)
  const weatherRes = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=0.3476&longitude=32.5825&current_weather=true"
  );

  const weatherData = await weatherRes.json();
  const temp = weatherData.current_weather.temperature;
  const weatherCode = weatherData.current_weather.weathercode;

  // 👕 STEP 2: Get wardrobe
  const snapshot = await getDocs(collection(db, "users", user.uid, "wardrobe"));

  let wardrobe = [];
  snapshot.forEach(doc => wardrobe.push(doc.data()));

  let outfit = "";

  // ☀️ HOT WEATHER
  if (temp >= 28) {
    let light = wardrobe.find(i => i.style === "casual") || wardrobe[0];

    outfit = `☀️ Hot Weather (${temp}°C)

Wear:
👕 ${light?.type} - ${light?.color}
👖 Light and breathable clothes

Stay cool 😎`;
  }

  // 🌧 RAINY WEATHER
  else if (weatherCode >= 40 && weatherCode <= 67) {
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
