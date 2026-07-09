// ai-stylist.js

import { db, auth } from "./firebase.js";

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

let currentUser = null;

// Wait for login
onAuthStateChanged(auth, (user) => {
    currentUser = user;
});

window.askStylist = async function () {

    const answer = document.getElementById("answer");
    const question = document
        .getElementById("question")
        .value
        .trim()
        .toLowerCase();

    if (question === "") {
        answer.innerText = "Please type a question.";
        return;
    }

    if (!currentUser) {
        answer.innerText = "Please login first.";
        return;
    }

    try {

        answer.innerText = "Thinking... 🤔";

        const snapshot = await getDocs(
            collection(
                db,
                "users",
                currentUser.uid,
                "wardrobe"
            )
        );

        let clothes = [];

        snapshot.forEach((doc) => {
            clothes.push(doc.data());
        });

        if (clothes.length === 0) {
            answer.innerText =
                "Your wardrobe is empty. Upload some clothes first.";
            return;
        }

        const getItem = (category) => {
            return clothes.find(item =>
                item.category &&
                item.category.toLowerCase() === category
            );
        };

        let result = "";

        // PARTY
        if (question.includes("party")) {

            const shirt = getItem("shirt");
            const trouser = getItem("trouser");

            result = `🎉 Party Outfit

👕 ${shirt ? shirt.color + " shirt" : "Stylish shirt"}

👖 ${trouser ? trouser.color + " trouser" : "Matching trousers"}

🔥 Add clean shoes and a nice watch.`;

        }

        // WEDDING
        else if (question.includes("wedding")) {

            const dress = getItem("dress");
            const suit = getItem("suit");

            result = `💍 Wedding Outfit

${dress
? "👗 " + dress.color + " dress"
: suit
? "🤵 " + suit.color + " suit"
: "👔 Elegant formal wear"}

✨ Add smart shoes and accessories.`;

        }

        // OFFICE
        else if (
            question.includes("office") ||
            question.includes("work")
        ) {

            const shirt = getItem("shirt");

            result = `💼 Office Outfit

👔 ${shirt ? shirt.color + " shirt" : "White shirt"}

👞 Smart shoes

Professional and clean.`;

        }

        // DATE
        else if (question.includes("date")) {

            result = `❤️ Date Outfit

Wear your best matching outfit.

Choose neutral colors and clean shoes.

Confidence is your best accessory.`;

        }

        // INTERVIEW
        else if (question.includes("interview")) {

            result = `📄 Interview Outfit

Wear formal clothes.

Avoid bright colors.

Look neat and professional.`;

        }

        // CASUAL
        else if (question.includes("casual")) {

            const random =
                clothes[Math.floor(Math.random() * clothes.length)];

            result = `😊 Casual Outfit

Wear your ${random.color} ${random.category}.

Perfect for everyday comfort.`;

        }

        // GENERAL
        else {

            const random =
                clothes[Math.floor(Math.random() * clothes.length)];

            result = `✨ Today's Outfit

Wear your ${random.color} ${random.category}.

You will look great today!`;

        }

        answer.innerText = result;

        if ("speechSynthesis" in window) {
            speechSynthesis.cancel();
            speechSynthesis.speak(
                new SpeechSynthesisUtterance(result)
            );
        }

    } catch (error) {

        console.error(error);

        answer.innerText =
            "Error: " + error.message;

    }
};
