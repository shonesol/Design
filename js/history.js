// history.js
// FashionAI Wear Memory System


// ==========================
// SAVE WORN OUTFIT
// ==========================


export function saveWornOutfit(
database,
outfit,
occasion="Casual"
){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"history",
"readwrite"
);



const store =
transaction.objectStore(
"history"
);



const record = {


date:
new Date().toISOString(),



occasion:occasion,



outfit:{


top:outfit.top.id,


bottom:outfit.bottom.id,


shoe:outfit.shoe.id


},



rating:null



};





const request =
store.add(record);




request.onsuccess=()=>{


resolve(
record
);


};



request.onerror=()=>{


reject(
request.error
);


};


});

}
// ==========================
// GET HISTORY
// ==========================


export function getWearHistory(database){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
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


resolve(
request.result
);


};



request.onerror=()=>{


reject(
request.error
);


};



});


}
