// db.js
// FashionAI Main Database Controller


// ==========================
// ADD CLOTHING
// ==========================

export function addClothing(database, clothing){

return new Promise((resolve,reject)=>{


const tx =
database.transaction(
"wardrobe",
"readwrite"
);


const store =
tx.objectStore(
"wardrobe"
);



const item={

...clothing,

laundryStatus:
clothing.laundryStatus || "Clean",

timesWorn:
clothing.timesWorn || 0,

createdAt:
Date.now()

};



const request =
store.add(item);



request.onsuccess=()=>{

resolve(request.result);

};



request.onerror=()=>{

reject(request.error);

};



});


}





// ==========================
// GET CLOTHES
// ==========================


export function getClothes(database){


return new Promise((resolve,reject)=>{


const tx =
database.transaction(
"wardrobe",
"readonly"
);


const store =
tx.objectStore(
"wardrobe"
);



const request =
store.getAll();



request.onsuccess=()=>{

resolve(
request.result || []
);

};



request.onerror=()=>{

reject(request.error);

};


});


}







// ==========================
// DELETE CLOTHING
// ==========================


export function deleteClothing(
database,
id
){


return new Promise((resolve,reject)=>{


const tx =
database.transaction(
"wardrobe",
"readwrite"
);



const store =
tx.objectStore(
"wardrobe"
);



const request =
store.delete(id);



request.onsuccess=()=>resolve();



request.onerror=()=>reject(
request.error
);



});


}







// ==========================
// UPDATE CLOTHING
// ==========================


export function updateClothing(
database,
item
){


return new Promise((resolve,reject)=>{


const tx =
database.transaction(
"wardrobe",
"readwrite"
);



const store =
tx.objectStore(
"wardrobe"
);



const request =
store.put(item);



request.onsuccess=()=>resolve();



request.onerror=()=>reject(
request.error
);



});


}








// ==========================
// WEAR HISTORY
// ==========================


export function saveWearHistory(
database,
outfit
){


return new Promise((resolve,reject)=>{


const tx =
database.transaction(
[
"history",
"wardrobe"
],
"readwrite"
);



tx.objectStore(
"history"
)
.add({

outfit,

date:Date.now()

});





[
outfit.top,
outfit.bottom,
outfit.shoe

].forEach(item=>{


if(item?.id){


const store =
tx.objectStore(
"wardrobe"
);



const request =
store.get(item.id);



request.onsuccess=()=>{


const clothing =
request.result;



if(clothing){


clothing.timesWorn =
(clothing.timesWorn||0)+1;



clothing.lastWorn =
Date.now();



store.put(clothing);


}



};


}



});





tx.oncomplete=()=>resolve();


tx.onerror=()=>reject(
tx.error
);



});


}









// ==========================
// GET HISTORY
// ==========================


export function getWearHistory(database){


return new Promise((resolve,reject)=>{


const tx =
database.transaction(
"history",
"readonly"
);



const request =
tx.objectStore(
"history"
)
.getAll();



request.onsuccess=()=>{

resolve(
request.result || []
);

};



request.onerror=()=>reject(
request.error
);



});


}









// ==========================
// OUTFIT PLANS
// USING outfits STORE
// ==========================


export function saveOutfitPlan(
database,
plan
){


return new Promise((resolve,reject)=>{


const tx =
database.transaction(
"outfits",
"readwrite"
);



const request =
tx.objectStore(
"outfits"
)
.add({

...plan,

createdAt:Date.now()

});



request.onsuccess=()=>{

resolve(request.result);

};



request.onerror=()=>{

reject(request.error);

};


});


}






export function getOutfitPlans(database){


return new Promise((resolve,reject)=>{


const tx =
database.transaction(
"outfits",
"readonly"
);



const request =
tx.objectStore(
"outfits"
)
.getAll();



request.onsuccess=()=>{


resolve(
request.result || []
);


};



request.onerror=()=>reject(
request.error
);



});


}






export function deleteOutfitPlan(
database,
id
){


return new Promise((resolve,reject)=>{


const tx =
database.transaction(
"outfits",
"readwrite"
);



const request =
tx.objectStore(
"outfits"
)
.delete(id);



request.onsuccess=()=>resolve();


request.onerror=()=>reject(
request.error
);



});


}








// ==========================
// PREFERENCES
// ==========================


export function savePreference(
database,
key,
data
){


return new Promise((resolve,reject)=>{


const tx =
database.transaction(
"preferences",
"readwrite"
);



const request =
tx.objectStore(
"preferences"
)
.put({

id:key,

...data

});



request.onsuccess=()=>resolve();


request.onerror=()=>reject(
request.error
);



});


}






export function getPreference(
database,
key="userProfile"
){


return new Promise((resolve,reject)=>{


const tx =
database.transaction(
"preferences",
"readonly"
);



const request =
tx.objectStore(
"preferences"
)
.get(key);



request.onsuccess=()=>{


resolve(
request.result
);


};



request.onerror=()=>reject(
request.error
);



});


}
// ==========================
// UPDATE LAUNDRY STATUS
// ==========================

export function updateLaundryStatus(
database,
id,
status
){

return new Promise((resolve,reject)=>{


const transaction =

database.transaction(
"wardrobe",
"readwrite"
);



const store =

transaction.objectStore(
"wardrobe"
);



const request =

store.get(id);



request.onsuccess = ()=>{


const item = request.result;



if(item){


item.laundryStatus = status;



store.put(item);


}


};



transaction.oncomplete = ()=>{


resolve();


};



transaction.onerror = ()=>{


reject(
transaction.error
);


};



});


}
