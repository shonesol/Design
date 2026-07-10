// db.js
// FashionAI Central Database Engine

const DATABASE_VERSION = 3;


// ==========================
// OPEN USER DATABASE
// ==========================

export function openDatabase(uid) {

    return new Promise((resolve, reject) => {


        const request = indexedDB.open(
            "FashionAI_" + uid,
            DATABASE_VERSION
        );


        request.onupgradeneeded = (event) => {


            // SAVED OUTFITS

if(
!db.objectStoreNames.contains("outfits")
){

db.createObjectStore(
"outfits",
{
keyPath:"id",
autoIncrement:true
}

);

}


// OUTFIT HISTORY

if(
!db.objectStoreNames.contains("history")
){

db.createObjectStore(
"history",
{
keyPath:"id",
autoIncrement:true
}

);

}
// Feedback memory

if(
!db.objectStoreNames.contains("feedback")
){

db.createObjectStore(
"feedback",
{
keyPath:"id",
autoIncrement:true
}
);

}
            const db = event.target.result;


            // ======================
            // WARDROBE STORAGE
            // ======================

            if (!db.objectStoreNames.contains("wardrobe")) {


                const wardrobe =
                    db.createObjectStore(
                        "wardrobe",
                        {
                            keyPath: "id",
                            autoIncrement: true
                        }
                    );


                wardrobe.createIndex(
                    "category",
                    "category"
                );


                wardrobe.createIndex(
                    "type",
                    "type"
                );


                wardrobe.createIndex(
                    "color",
                    "color"
                );


                wardrobe.createIndex(
                    "style",
                    "style"
                );


                wardrobe.createIndex(
                    "season",
                    "season"
                );


                wardrobe.createIndex(
                    "laundryStatus",
                    "laundryStatus"
                );


            }



            // ======================
            // WEAR HISTORY
            // ======================

            if (!db.objectStoreNames.contains("history")) {


                db.createObjectStore(
                    "history",
                    {
                        keyPath:"id",
                        autoIncrement:true
                    }
                );


            }



            // ======================
            // USER STYLE MEMORY
            // ======================

            if (!db.objectStoreNames.contains("preferences")) {


                db.createObjectStore(
                    "preferences",
                    {
                        keyPath:"id",
                        autoIncrement:true
                    }
                );


            }


        };



        request.onsuccess = (event)=>{


            resolve(
                event.target.result
            );


        };



        request.onerror = (event)=>{


            reject(
                event.target.error
            );


        };


    });


}






// ==========================
// ADD CLOTHING
// ==========================

export function addClothing(db, clothing){


    return new Promise((resolve,reject)=>{


        const transaction =
            db.transaction(
                "wardrobe",
                "readwrite"
            );


        const store =
            transaction.objectStore(
                "wardrobe"
            );


        const request =
            store.add(clothing);



        request.onsuccess=()=>{

            resolve(request.result);

        };


        request.onerror=()=>{

            reject(request.error);

        };


    });


}







// ==========================
// GET ALL CLOTHES
// ==========================

export function getClothes(db){


    return new Promise((resolve,reject)=>{


        const transaction =
            db.transaction(
                "wardrobe",
                "readonly"
            );


        const store =
            transaction.objectStore(
                "wardrobe"
            );


        const request =
            store.getAll();



        request.onsuccess=()=>{

            resolve(request.result);

        };



        request.onerror=()=>{

            reject(request.error);

        };


    });


}







// ==========================
// DELETE CLOTHING
// ==========================

export function deleteClothing(db,id){


    const transaction =
        db.transaction(
            "wardrobe",
            "readwrite"
        );


    transaction
    .objectStore("wardrobe")
    .delete(id);


}
// ==========================
// SAVE WEAR HISTORY
// ==========================

export function saveWearHistory(db, outfit){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(
"history",
"readwrite"
);



const store =
transaction.objectStore(
"history"
);



const request =
store.add({

outfit:outfit,

date:
new Date()
.toISOString()

});



request.onsuccess=()=>{

resolve(request.result);

};



request.onerror=()=>{

reject(request.error);

};


});


}






// ==========================
// GET WEAR HISTORY
// ==========================


export function getWearHistory(db){


return new Promise((resolve,reject)=>{


const transaction =
db.transaction(
"history",
"readonly"
);



const store =
transaction.objectStore(
"history"
);



const request =
store.getAll();



request.onsuccess=()=>{

resolve(request.result);

};



request.onerror=()=>{

reject(request.error);

};



});


}
