// db.js
// FashionAI Database Functions


// ==========================
// ADD CLOTHING
// ==========================

export function addClothing(
database,
clothing
){

return new Promise((resolve,reject)=>{


const transaction = database.transaction(
"wardrobe",
"readwrite"
);


const store =
transaction.objectStore(
"wardrobe"
);



const item = {

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
// GET ALL CLOTHES
// ==========================

export function getClothes(
database
){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
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
// UPDATE CLOTHING
// ==========================

export function updateClothing(
database,
item
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
store.put(item);



request.onsuccess=()=>{

resolve();

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
store.delete(id);



request.onsuccess=()=>{

resolve();

};



request.onerror=()=>{

reject(request.error);

};



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



request.onsuccess=()=>{


const clothing =
request.result;



if(clothing){


clothing.laundryStatus =
status;



store.put(clothing);


}



};



transaction.oncomplete=()=>{


resolve();


};



transaction.onerror=()=>{


reject(
transaction.error
);


};



});


}









// ==========================
// SAVE WEAR HISTORY
// ==========================


export function saveWearHistory(

database,

outfit

){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
[
"history",
"wardrobe"
],
"readwrite"
);



const history =
transaction.objectStore(
"history"
);



history.add({

outfit,

date:Date.now()

});






const wardrobe =
transaction.objectStore(
"wardrobe"
);



[
outfit.top,
outfit.bottom,
outfit.shoe

]
.forEach(item=>{


if(item?.id){


const request =
wardrobe.get(item.id);



request.onsuccess=()=>{


const clothing =
request.result;



if(clothing){


clothing.timesWorn =
(clothing.timesWorn || 0)+1;



clothing.lastWorn =
Date.now();



wardrobe.put(clothing);


}



};



}


});







transaction.oncomplete=()=>{


resolve();


};



transaction.onerror=()=>{


reject(
transaction.error
);


};



});


}









// ==========================
// GET WEAR HISTORY
// ==========================


export function getWearHistory(
database
){


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
request.result || []
);


};



request.onerror=()=>{


reject(request.error);


};



});


}









// ==========================
// SAVE OUTFIT PLAN
// ==========================


export function saveOutfitPlan(
database,
plan
){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"plans",
"readwrite"
);



const store =
transaction.objectStore(
"plans"
);



const request =
store.add({

...plan,

createdAt:Date.now()

});



request.onsuccess=()=>{


resolve(
request.result
);


};



request.onerror=()=>{


reject(request.error);


};



});


}









// ==========================
// GET PLANS
// ==========================


export function getOutfitPlans(
database
){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"plans",
"readonly"
);



const store =
transaction.objectStore(
"plans"
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
// DELETE PLAN
// ==========================


export function deleteOutfitPlan(
database,
id
){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"plans",
"readwrite"
);



const store =
transaction.objectStore(
"plans"
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
// SAVE AI MEMORY
// ==========================


export function savePreference(

database,

key,

data

){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"preferences",
"readwrite"
);



const store =
transaction.objectStore(
"preferences"
);



const request =
store.put({

id:key,

...data

});



request.onsuccess=()=>{


resolve();


};



request.onerror=()=>{


reject(
request.error
);


};



});


}









// ==========================
// GET AI MEMORY
// ==========================


export function getPreference(

database,

key="userProfile"

){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"preferences",
"readonly"
);



const store =
transaction.objectStore(
"preferences"
);



const request =
store.get(key);



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
