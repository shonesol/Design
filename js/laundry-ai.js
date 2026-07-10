// laundry-ai.js
// FashionAI Laundry Intelligence



import {
getClothes
} from "./db.js";




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


const item =
request.result;



if(item){


item.laundryStatus =
status;



if(status==="Clean"){


item.lastWashed =
new Date()
.toISOString();


}



store.put(item);



}



resolve();



};



request.onerror=()=>{

reject(request.error);

};



});


}







// ==========================
// GET READY CLOTHES
// ==========================


export async function getAvailableClothes(
database
){


const clothes =
await getClothes(
database
);



return clothes.filter(
item=>

item.laundryStatus==="Clean"

||
item.laundryStatus==="Ready"

);


}







// ==========================
// LAUNDRY ADVICE
// ==========================


export function laundryAdvice(item){



if(
item.timesWorn>=5
){


return `
🧺 Consider washing this item.
It has been worn ${item.timesWorn} times.
`;

}



return `
✅ This item is ready to wear.
`;



}
