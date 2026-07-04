import { storage, auth, db } from "./firebase.js";

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

import {
  doc,
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

window.uploadClothes = async function () {
  const file = document.getElementById("file").files[0];
  const status = document.getElementById("status");

  if (!file) {
    status.innerText = "Select a file first";
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    status.innerText = "Not logged in!";
    return;
  }

  const storageRef = ref(storage, "clothes/" + Date.now() + file.name);

  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  // 🧠 SIMPLE AI DETECTION (basic rules)
  const ai = analyzeClothing(file.name);

  // Save to Firestore
  await addDoc(collection(db, "users", user.uid, "wardrobe"), {
    imageUrl: url,
    type: ai.type,
    color: ai.color,
    style: ai.style,
    createdAt: Date.now()
  });

  status.innerText = "Uploaded + AI analyzed!";
};
function analyzeClothing(filename) {
  filename = filename.toLowerCase();

  let type = "unknown";
  let color = "unknown";
  let style = "casual";

  // TYPE DETECTION
  if (filename.includes("shirt")) type = "shirt";
  if (filename.includes("jeans")) type = "jeans";
  if (filename.includes("hoodie")) type = "hoodie";
  if (filename.includes("dress")) type = "dress";
  if (filename.includes("shoe")) type = "shoes";

  // COLOR DETECTION
  if (filename.includes("black")) color = "black";
  if (filename.includes("white")) color = "white";
  if (filename.includes("blue")) color = "blue";
  if (filename.includes("red")) color = "red";

  // STYLE LOGIC
  if (type === "hoodie" || type === "jeans") style = "casual";
  if (type === "shirt") style = "formal";
  if (type === "dress") style = "elegant";

  return { type, color, style };
}
