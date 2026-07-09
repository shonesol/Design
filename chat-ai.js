// fashion-chat.js

import { db, auth } from "./firebase.js";

import { askGemini } from "./gemini-ai.js";

import {
    collection,
    getDocs,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



// Temporary conversation memory
let chatHistory = [];



window.sendMessage = async function(){


    const input =
    document.getElementById("userMsg");


    const output =
    document.getElementById("chatReply");



    const msg =
    input.value.trim();



    if(!msg){

        output.innerText =
        "Please ask me a fashion question.";

        return;

    }



    const user =
    auth.currentUser;



    if(!user){

        output.innerText =
        "Please login first.";

        return;

    }



    try{


        output.innerText =
        "🤖 Fashion AI is thinking...";



        // GET USER WARDROBE

        const wardrobeSnap =
        await getDocs(

            collection(
                db,
                "users",
                user.uid,
                "wardrobe"
            )

        );



        let wardrobe = [];



        wardrobeSnap.forEach((item)=>{


            wardrobe.push(item.data());


        });






        // GET USER PROFILE

        const profileSnap =
        await getDoc(

            doc(
                db,
                "users",
                user.uid,
                "profile"
            )

        );



        let profile = {};



        if(profileSnap.exists()){

            profile =
            profileSnap.data();

        }




        // SAVE CHAT MEMORY

        chatHistory.push({

            user: msg

        });






        const prompt = `


You are FashionAI.

You are a professional human fashion stylist.

Your job is to help the user choose outfits,
combine colors, plan looks, and improve their style.


USER PROFILE:

Name:
${profile.name || "Unknown"}


Preferred Style:
${profile.style || "Not provided"}


Favorite Colors:
${profile.colors || "Not provided"}


Body Type:
${profile.bodyType || "Not provided"}



USER WARDROBE:

${JSON.stringify(
wardrobe,
null,
2
)}



RECENT CHAT:

${JSON.stringify(
chatHistory.slice(-6),
null,
2
)}



USER MESSAGE:

${msg}



INSTRUCTIONS:

- Answer like a real personal stylist.
- Use wardrobe items first.
- Recommend complete outfits.
- Explain color matching.
- Suggest shoes and accessories.
- Consider occasion.
- Consider weather if mentioned.
- Suggest alternatives.
- Ask questions if you need more information.
- Do not give boring generic answers.



`;






        const response =
        await askGemini(prompt);




        chatHistory.push({

            assistant: response

        });





        output.innerText =
        response;





        // VOICE RESPONSE

        if("speechSynthesis" in window){


            speechSynthesis.cancel();


            const speech =
            new SpeechSynthesisUtterance(response);


            speech.rate = 1;


            speech.pitch = 1;


            speechSynthesis.speak(speech);


        }





        input.value = "";



    }


    catch(error){


        console.error(error);


        output.innerText =
        "AI Error: " + error.message;


    }


};
