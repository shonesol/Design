import { db, auth } from "./firebase.js";
import { collection, getDocs } from "firebase/firestore";

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

  let response = "";

  // 💬 SIMPLE AI INTENT LOGIC
  if (msg.includes("party")) {
    let dress = wardrobe.find(i => i.type === "dress") || wardrobe[0];

    response = `🎉 Party Outfit Suggestion:
Wear your ${dress?.color || "nice"} ${dress?.type || "outfit"}.
Add stylish shoes and confidence 🔥`;
  }

  else if (msg.includes("work") || msg.includes("office")) {
    let shirt = wardrobe.find(i => i.type === "shirt");

    response = `💼 Work Outfit:
Go with your ${shirt?.color || "white"} ${shirt?.type || "shirt"}.
Keep it clean and formal.`;
  }

  else if (msg.includes("hoodie")) {
    let hoodie = wardrobe.find(i => i.type === "hoodie");

    response = `🧥 Hoodie Style:
Pair your ${hoodie?.color || "black"} hoodie with jeans and sneakers.`;
  }

  else {
    let random = wardrobe[Math.floor(Math.random() * wardrobe.length)];

    response = `👗 Try this:
Wear your ${random?.color} ${random?.type}.
Looks stylish and balanced ✨`;
  }

  output.innerText = response;

  // 🔊 VOICE RESPONSE
  const speech = new SpeechSynthesisUtterance(response);
  speechSynthesis.speak(speech);
};
