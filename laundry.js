// laundry.js

import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";



const box = document.getElementById("laundryList");



async function loadLaundry(user) {


    if (!user) {

        box.innerHTML = "Please login first.";
        return;

    }


    try {


        box.innerHTML = "Loading wardrobe...";


        const snapshot = await getDocs(

            collection(
                db,
                "users",
                user.uid,
                "wardrobe"
            )

        );



        if (snapshot.empty) {

            box.innerHTML =
            "No clothes added yet.";

            return;

        }



        let html = "";



        snapshot.forEach((doc) => {


            const item = doc.data();



            html += `

            <div class="card">

                <img 
                src="${item.imageUrl || 'placeholder.jpg'}"
                width="150"
                alt="clothing"
                >


                <h3>
                ${item.type || item.category || "Clothing"}
                </h3>


                <p>
                Color:
                ${item.color || "Unknown"}
                </p>


                <p>
                Status:
                ${item.status || "Clean"}
                </p>


            </div>

            `;


        });



        box.innerHTML = html;



    } catch(error) {


        console.error(error);


        box.innerHTML =
        "Error: " + error.message;


    }


}



// Wait for Firebase login

onAuthStateChanged(auth, (user)=>{


    loadLaundry(user);


});
