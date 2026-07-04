// IMPORTS
import { storage, auth, db } from "./firebase.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";


// 🧠 STEP 1: (REAL AI FUNCTION)
async function analyzeClothingWithAI(imageUrl) {
  const API_KEY = "YOUR_GOOGLE_VISION_API_KEY";

  const body = {
    requests: [
      {
        image: { source: { imageUri: imageUrl } },
        features: [
          { type: "LABEL_DETECTION", maxResults: 10 },
          { type: "IMAGE_PROPERTIES" }
        ]
      }
    ]
  };

  const res = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    }
  );

  const data = await res.json();

  const labels = data.responses[0].labelAnnotations || [];
  const colors = data.responses[0].imagePropertiesAnnotation?.dominantColors?.colors || [];

  let type = "unknown";
  let color = "unknown";
  let style = "casual";

  labels.forEach(l => {
    const desc = l.description.toLowerCase();

    if (desc.includes("shirt")) type = "shirt";
    if (desc.includes("jeans")) type = "jeans";
    if (desc.includes("dress")) type = "dress";
    if (desc.includes("shoe")) type = "shoes";
    if (desc.includes("hoodie")) type = "hoodie";
  });

  if (colors.length > 0) {
    const rgb = colors[0].color;

    if (rgb.red > 200 && rgb.green < 100) color = "red";
    else if (rgb.blue > 200) color = "blue";
    else if (rgb.red < 50 && rgb.green < 50) color = "black";
    else if (rgb.red > 200 && rgb.green > 200) color = "white";
  }

  if (type === "shirt") style = "formal";
  if (type === "dress") style = "elegant";
  if (type === "hoodie") style = "casual";

  return { type, color, style };
}


// 👇 STEP 2 GOES HERE (REPLACE OLD uploadClothes)
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

  // 🧠 AI CALL HERE
  const ai = await analyzeClothingWithAI(url);

  await addDoc(collection(db, "users", user.uid, "wardrobe"), {
    imageUrl: url,
    type: ai.type,
    color: ai.color,
    style: ai.style,
    createdAt: Date.now()
  });

  status.innerText = "AI analyzed your clothing successfully!";
};
