import { auth } from "./firebase.js";
import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const box = document.getElementById("laundryList");

// ==========================
// OPEN DATABASE
// ==========================
function openDatabase(uid) {
    return new Promise((resolve, reject) => {

        const request = indexedDB.open("FashionAI_" + uid, 1);

        request.onupgradeneeded = (event) => {

            const db = event.target.result;

            if (!db.objectStoreNames.contains("wardrobe")) {

                db.createObjectStore("wardrobe", {
                    keyPath: "id",
                    autoIncrement: true
                });

            }
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };

    });
}

// ==========================
// LOAD CLOTHES
// ==========================
async function loadLaundry(user) {

    if (!user) {
        box.innerHTML = "Please login first.";
        return;
    }

    try {

        box.innerHTML = "🧺 Loading wardrobe...";

        const db = await openDatabase(user.uid);

        if (!db.objectStoreNames.contains("wardrobe")) {
            box.innerHTML = "No wardrobe found.";
            return;
        }

        const transaction = db.transaction("wardrobe", "readonly");
        const store = transaction.objectStore("wardrobe");
        const request = store.getAll();

        request.onsuccess = () => {

            const clothes = request.result;

            if (clothes.length === 0) {
                box.innerHTML = "No clothes uploaded yet.";
                return;
            }

            clothes.reverse();

            let html = "";

            clothes.forEach((item) => {

                html += `
                    <div class="cloth-card">

                        <img
                            src="${item.image}"
                            alt="Clothing"
                            onclick="openCloth(
                                '${item.image}',
                                '${item.type || "Clothing"}',
                                '${item.color || "Unknown"}',
                                '${item.hex || ""}'
                            )">

                        <h3>${item.type || "Clothing"}</h3>

                        <p>🎨 Color: ${item.color || "Unknown"}</p>

                        <p>✨ Style: ${item.style || "Casual"}</p>

                        <p>🌦 Season: ${item.season || "All Seasons"}</p>

                        <button onclick="deleteCloth(${item.id})">
                            🗑 Delete
                        </button>

                    </div>
                `;
            });

            box.innerHTML = html;

        };

        request.onerror = () => {
            console.error(request.error);
            box.innerHTML = "Failed to load clothes.";
        };

    } catch (error) {

        console.error(error);
        box.innerHTML = "Database error.";

    }
}

// ==========================
// IMAGE VIEWER
// ==========================
window.openCloth = function (image, type, color, hex) {

    document.getElementById("imageModal").style.display = "flex";

    document.getElementById("previewImage").src = image;

    document.getElementById("details").innerHTML = `
        <h2>${type}</h2>
        <p>🎨 Color: ${color}</p>
        ${hex ? `<p>HEX: ${hex}</p>` : ""}
    `;
};

window.closeImage = function () {
    document.getElementById("imageModal").style.display = "none";
};

// ==========================
// DELETE
// ==========================
window.deleteCloth = async function (id) {

    const user = auth.currentUser;

    if (!user) return;

    const db = await openDatabase(user.uid);

    const transaction = db.transaction("wardrobe", "readwrite");

    transaction.objectStore("wardrobe").delete(id);

    transaction.oncomplete = () => {
        loadLaundry(user);
    };
};

// ==========================
// LOGIN
// ==========================
onAuthStateChanged(auth, (user) => {
    loadLaundry(user);
});
