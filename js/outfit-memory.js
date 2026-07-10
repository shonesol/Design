// FashionAI Outfit Memory



export function saveOutfit(
db,
outfit
){


const transaction =
db.transaction(
"outfits",
"readwrite"
);



const store =
transaction.objectStore(
"outfits"
);



store.add({

...outfit,

savedAt:
Date.now(),

liked:false

});


}







export function wearOutfit(
db,
outfit
){


const transaction =
db.transaction(
"history",
"readwrite"
);



const store =
transaction.objectStore(
"history"
);



store.add({

outfit:outfit,

date:
new Date()
.toISOString(),

rating:null


});


}







export function rateOutfit(
db,
id,
rating
){


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
store.get(id);



request.onsuccess=()=>{


let item =
request.result;



item.rating =
rating;



store.put(item);



};


}
