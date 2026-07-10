// db.js

const DB_VERSION = 1;

export function openDatabase(uid) {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open("FashionAI_" + uid, DB_VERSION);

        request.onupgradeneeded = (event) => {

            const db = event.target.result;

            // Wardrobe
            if (!db.objectStoreNames.contains("wardrobe")) {

                const wardrobe = db.createObjectStore("wardrobe", {
                    keyPath: "id",
                    autoIncrement: true
                });

                wardrobe.createIndex("category", "category");
                wardrobe.createIndex("type", "type");
                wardrobe.createIndex("style", "style");
                wardrobe.createIndex("season", "season");
                wardrobe.createIndex("favorite", "favorite");
                wardrobe.createIndex("laundryStatus", "laundryStatus");

            }

            // Wear history
            if (!db.objectStoreNames.contains("history")) {

                db.createObjectStore("history", {
                    keyPath: "id",
                    autoIncrement: true
                });

            }

            // Favorites
            if (!db.objectStoreNames.contains("favorites")) {

                db.createObjectStore("favorites", {
                    keyPath: "id",
                    autoIncrement: true
                });

            }

            // User preferences
            if (!db.objectStoreNames.contains("preferences")) {

                db.createObjectStore("preferences", {
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
