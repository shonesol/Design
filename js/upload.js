// upload.js
// FashionAI Upload & AI Recognition Engine

import { auth } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {
    askGemini
} from "./gemini.js";

import {
    FASHION_VISION_PROMPT
} from "./fashion-vision-prompt.js";

import {
    optimizeImage
} from "./image-preprocessor.js";

import {
    addClothing
} from "./db.js";

import {
    getDatabase
} from "./database-manager.js";

import {
    exportFashionAI
} from "./backup-manager.js";



// ==========================
// USER & DATABASE
// ==========================

let user = null;
let database = null;


// ==========================
// LOGIN
// ==========================

onAuthStateChanged(
    auth,
    async (current) => {

        if (!current) {
            return;
        }

        user = current;

        database = await getDatabase();

        console.log("✅ FashionAI Local Database Ready");

    }
);



// ==========================
// BUTTON
// ==========================

const button =
document.getElementById("uploadBtn");



button.onclick = async () => {

    if (!user) {

        alert("Please login first.");

        return;

    }

    if (!database) {

        alert("Database is loading...");

        return;

    }



    const file =
    document
    .getElementById("clothingImage")
    .files[0];



    if (!file) {

        alert("Choose a clothing image.");

        return;

    }



    // ==========================
    // OPTIMIZE IMAGE
    // ==========================

    const image =
    await optimizeImage(file);



    // ==========================
    // PREVIEW
    // ==========================

    document
    .getElementById("preview")
    .innerHTML =

    `
    <img src="${image}" width="220">
    `;



    document
    .getElementById("result")
    .innerHTML =

    `
    <h3>🤖 FashionAI Vision Pro</h3>
    <p>Analyzing clothing...</p>
    `;
      // ==========================
    // GEMINI AI ANALYSIS
    // ==========================

    try {

        const answer =
        await askGemini(

            FASHION_VISION_PROMPT,

            image

        );



        let ai =
        JSON.parse(answer);



        // ==========================
        // NORMALIZE AI DATA
        // ==========================

        const clothing = {

            image,

            name:
            ai.name || "Unknown",

            type:
            ai.type || "Unknown",

            category:
            ai.category || "Unknown",

            subcategory:
            ai.subcategory || "",

            color:
            ai.primaryColor ||
            ai.color ||
            "Unknown",

            secondaryColor:
            Array.isArray(ai.secondaryColors)
            ? ai.secondaryColors.join(", ")
            : (ai.secondaryColor || ""),

            pattern:
            ai.pattern || "Plain",

            material:
            ai.material || "Unknown",

            texture:
            ai.texture || "",

            fit:
            ai.fit || "",

            length:
            ai.length || "",

            sleeveLength:
            ai.sleeveLength || "",

            neckline:
            ai.neckline || "",

            closure:
            ai.closure || "",

            style:
            ai.style || "Casual",

            aesthetic:
            ai.aesthetic || "",

            occasion:
            ai.occasion || "Daily Wear",

            season:
            ai.season || "All Seasons",

            formality:
            ai.formality || "",

            brand:
            ai.brand || "Unknown",

            logoVisible:
            ai.logoVisible || false,

            countryStyle:
            ai.countryStyle || "",

            traditionalWear:
            ai.traditionalWear || false,

            gender:
            ai.gender || "Unisex",

            ageGroup:
            ai.ageGroup || "Adult",

            confidence:
            Number(ai.confidence) || 0,

            favorite: false,

            timesWorn: 0,

            laundryStatus: "Clean",

            createdAt: Date.now()

        };



        // ==========================
        // SAVE TO DATABASE
        // ==========================

        await addClothing(
            database,
            clothing
        );



        // ==========================
        // AUTOMATIC BACKUP
        // ==========================

        await exportFashionAI(
            database
        );
              // ==========================
        // SUCCESS
        // ==========================

        document
        .getElementById("result")
        .innerHTML =

        `

        <h2>✅ Clothing Saved Successfully</h2>

        <p><b>Name:</b> ${clothing.name}</p>

        <p><b>Category:</b> ${clothing.category}</p>

        <p><b>Type:</b> ${clothing.type}</p>

        <p><b>Primary Color:</b> ${clothing.color}</p>

        <p><b>Secondary Color:</b> ${clothing.secondaryColor}</p>

        <p><b>Material:</b> ${clothing.material}</p>

        <p><b>Pattern:</b> ${clothing.pattern}</p>

        <p><b>Style:</b> ${clothing.style}</p>

        <p><b>Occasion:</b> ${clothing.occasion}</p>

        <p><b>Season:</b> ${clothing.season}</p>

        <p><b>Brand:</b> ${clothing.brand}</p>

        <p><b>Confidence:</b> ${clothing.confidence}%</p>

        <hr>

        <p>
        💾 FashionAI automatically backed up your wardrobe.
        </p>

        `;

    }

    catch(error){

        console.error(
            "FashionAI Error:",
            error
        );

        document
        .getElementById("result")
        .innerHTML =

        `

        <h2>❌ AI Error</h2>

        <p>
        FashionAI could not analyze this clothing image.
        </p>

        <p>
        Please try another photo with:
        </p>

        <ul>

        <li>✅ Good lighting</li>

        <li>✅ One clothing item only</li>

        <li>✅ Plain background</li>

        <li>✅ Entire clothing visible</li>

        </ul>

        `;

    }

};
