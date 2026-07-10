// wardrobe-db.js

export function createWardrobeDB(userId){

    const request = indexedDB.open(
        "FashionAI_" + userId,
        1
    );


    request.onupgradeneeded = function(event){

        const db = event.target.result;


        if(!db.objectStoreNames.contains("wardrobe")){

            db.createObjectStore(
                "wardrobe",
                {
                    keyPath:"id",
                    autoIncrement:true
                }
            );

        }


    };


    request.onsuccess = function(){

        console.log(
            "Wardrobe database created for:",
            userId
        );

    };


    request.onerror = function(error){

        console.error(
            "Wardrobe database error:",
            error
        );

    };

}
