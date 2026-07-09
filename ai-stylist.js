// ai-stylist.js

import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import { askGemini } from "./gemini.js";


let currentUser = null;


// Check login status
onAuthStateChanged(auth, (user) => {

    currentUser = user;

});



window.askStylist = async function () {


    const question =
    document.getElementById("question").value.trim();


    const answer =
    document.getElementById("answer");



    if(question === ""){

        answer.innerText =
        "Please ask me what you want to wear.";

        return;

    }



    if(!currentUser){

        answer.innerText =
        "Please login first.";

        return;

    }



    try{


        answer.innerText =
        "🤖 AI Stylist is thinking...";



        // Get wardrobe

        const snapshot =
        await getDocs(

            collection(
                db,
                "users",
                currentUser.uid,
                "wardrobe"
            )

        );



        let clothes = [];



        snapshot.forEach((doc)=>{

            clothes.push(doc.data());

        });



        if(clothes.length === 0){


            answer.innerText =
            "Your wardrobe is empty. Upload clothes first.";

            return;

        }



        // Send wardrobe + question to Gemini

        const prompt = `

You are an expert personal fashion stylist.

User wardrobe:

${JSON.stringify(clothes, null, 2)}


User question:

${question}


Create a personalized outfit recommendation.

Include:

👕 Clothes to wear
👟 Shoes suggestion
⌚ Accessories suggestion
🎨 Color matching advice
✨ Style explanation

Use only items from the wardrobe when possible.

Keep the answer friendly and clear.

`;



        const result =
        await askGemini(prompt);



        answer.innerText =
        result;



        // Voice response

        if("speechSynthesis" in window){

            speechSynthesis.cancel();


            const speech =
            new SpeechSynthesisUtterance(result);


            speechSynthesis.speak(speech);

        }



    }

    catch(error){


        console.error(error);


        answer.innerText =
        "Something went wrong: " + error.message;


    }



};
