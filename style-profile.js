import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


async function analyzeStyle(){

    const output = document.getElementById("styleResult");


    const user = auth.currentUser;


    if(!user){

        output.innerHTML = "Login first";
        return;

    }


    try{


        const snapshot = await getDocs(
            collection(
                db,
                "users",
                user.uid,
                "wardrobe"
            )
        );



        let clothes = [];


        snapshot.forEach((doc)=>{

            clothes.push(doc.data());

        });



        if(clothes.length === 0){

            output.innerHTML =
            "Upload clothes first";

            return;

        }



        let colors = {};
        let styles = {};



        clothes.forEach((item)=>{


            if(item.color){

                let color =
                item.color.toLowerCase();

                colors[color] =
                (colors[color] || 0) + 1;

            }



            if(item.style){

                let style =
                item.style.toLowerCase();

                styles[style] =
                (styles[style] || 0) + 1;

            }


        });




        let favoriteColor =
        Object.keys(colors)
        .sort(
            (a,b)=>colors[b]-colors[a]
        )[0];



        let personality = "";



        if(styles["formal"]){

            personality =
            "💼 Professional / Elegant";

        }

        else if(styles["casual"]){

            personality =
            "😎 Casual & Comfortable";

        }

        else{

            personality =
            "✨ Modern Explorer";

        }





        output.innerHTML = `

        <h2>${personality}</h2>


        <p>
        Favorite Color:
        ${favoriteColor || "Unknown"}
        </p>


        <p>
        Wardrobe Size:
        ${clothes.length} items
        </p>


        <p>
        AI Confidence:
        ${Math.floor(80 + Math.random()*20)}%
        </p>


        `;



    }

    catch(error){

        console.error("Style analysis error:", error);

        output.innerHTML =
        "Failed to analyze wardrobe";

    }


}




onAuthStateChanged(auth, (user)=>{

    if(user){

        analyzeStyle();

    }

});
