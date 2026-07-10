import { db, auth } from "./firebase.js";
import { askGemini } from "./gemini-ai.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


window.chatAI = async function () {

    const question =
        document.getElementById("message")
        .value
        .toLowerCase();


    const reply =
        document.getElementById("reply");


    const user = auth.currentUser;


    if (!user) {
        reply.innerText = "Please login first";
        return;
    }


    try {

        const snapshot = await getDocs(
            collection(
                db,
                "users",
                user.uid,
                "wardrobe"
            )
        );


        let wardrobe = [];


        snapshot.forEach(doc => {
            wardrobe.push(doc.data());
        });


        console.log("User:", user);
        console.log("Wardrobe:", wardrobe);


        const answer = await askGemini(`
You are an expert fashion stylist.

User wardrobe:
${JSON.stringify(wardrobe, null, 2)}

Question:
${question}

Use the wardrobe when possible.
If something is missing, recommend what to buy.
Keep the answer friendly and practical.
`);


        console.log("Gemini:", answer);


        reply.innerText = answer;


        speechSynthesis.speak(
            new SpeechSynthesisUtterance(answer)
        );


    } catch(error) {

        console.error("AI Chat Error:", error);

        reply.innerText = "Something went wrong: " + error.message;

    }

};
