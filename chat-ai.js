import {db,auth} from "./firebase.js";

import {askGemini} from "./gemini-ai.js";

import {

collection,
getDocs,
doc,
getDoc

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import {db,auth} from "./firebase.js";

import {askGemini} from "./gemini-ai.js";

import {
collection,
getDocs,
doc,
getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.sendMessage = async function () {
  const msg = document.getElementById("userMsg").value.toLowerCase();
  const output = document.getElementById("chatReply");

  const user = auth.currentUser;

  if (!user) {
    output.innerText = "Please login first";
    return;
  }

  // 🧠 GET USER WARDROBE
  const snapshot = await getDocs(collection(db, "users", user.uid, "wardrobe"));

  let wardrobe = [];

  snapshot.forEach(doc => wardrobe.push(doc.data()));

  const response = await askGemini(

`

You are a professional personal fashion stylist.


USER PROFILE:

Name:
${profile.name || "User"}

Preferred Style:
${profile.style || "Unknown"}

Favorite Colors:
${profile.colors || "Unknown"}

Favorite Occasion:
${profile.occasion || "Any"}



USER WARDROBE:

${JSON.stringify(wardrobe, null, 2)}



USER QUESTION:

${msg}



Give a personalized outfit recommendation.
Use the user's wardrobe where possible.
Explain why the outfit matches their style.

`

);


output.innerText = response;


// 🔊 VOICE RESPONSE

const speech =
new SpeechSynthesisUtterance(response);

speechSynthesis.speak(speech);
