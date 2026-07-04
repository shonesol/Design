import { db, auth } from "./firebase.js";

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.getOutfitSuggestion = async function () {
  const user = auth.currentUser;
  const output = document.getElementById("outfit");

  if (!user) {
    output.innerText = "Login first";
    return;
  }

  const snapshot = await getDocs(collection(db, "users", user.uid, "wardrobe"));

  let wardrobe = [];

  snapshot.forEach(doc => {
    wardrobe.push(doc.data());
  });

  // 🧠 SIMPLE OUTFIT AI
  let shirt = wardrobe.find(i => i.type === "shirt");
  let jeans = wardrobe.find(i => i.type === "jeans");
  let shoes = wardrobe.find(i => i.type === "shoes");

  let outfit = `👕 Shirt: ${shirt?.color || "none"} ${shirt?.type || ""}
👖 Pants: ${jeans?.color || "none"} ${jeans?.type || ""}
👟 Shoes: ${shoes?.color || "none"} ${shoes?.type || ""}

✨ Style: Smart casual recommended`;

  output.innerText = outfit;

  // 🔊 Voice AI
  const speech = new SpeechSynthesisUtterance(outfit);
  speechSynthesis.speak(speech);
};
