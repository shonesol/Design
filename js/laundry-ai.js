// laundry-ai.js
// FashionAI Laundry Intelligence System


import {
getClothes,
updateClothing
}
from "./db.js";




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


const item =
request.result;



if(item){



item.laundryStatus =
status;





// when washed

if(
status==="Clean"
){

item.lastWashed =
new Date()
.toISOString();


}






// when worn

if(
status==="Worn"
){


item.timesWorn =

(item.timesWorn || 0) + 1;



item.lastWorn =

new Date()
.toISOString();


}







store.put(item);



}



resolve(true);



};





request.onerror = ()=>{


reject(
request.error
);


};



});


}









// ==========================
// MARK OUTFIT WORN
// ==========================


export async function markOutfitWorn(

database,

outfit

){



const clothes=[


outfit.top,

outfit.bottom,

outfit.shoe


];





for(
const item of clothes
){


await updateLaundryStatus(

database,

item.id,

"Worn"

);


}



}









// ==========================
// GET AVAILABLE CLOTHES
// ==========================


export async function getAvailableClothes(

database

){



const clothes =

await getClothes(

database

);





return clothes.filter(item=>


item.laundryStatus==="Clean"

||

item.laundryStatus==="Ready"


);



}









// ==========================
// SEND ITEM TO LAUNDRY
// ==========================


export async function sendToLaundry(

database,

item

){



await updateLaundryStatus(

database,

item.id,

"Dirty"

);


}









// ==========================
// MARK CLOTHES CLEAN
// ==========================


export async function markClean(

database,

item

){



await updateLaundryStatus(

database,

item.id,

"Clean"

);


}









// ==========================
// LAUNDRY ADVICE AI
// ==========================


export function laundryAdvice(item){



if(
item.timesWorn >= 5
){


return `

🧺 Wash recommended.

${item.name || item.type}

has been worn ${item.timesWorn} times.

`;



}





if(
item.laundryStatus==="Dirty"
){


return `

⚠️ This item needs washing before FashionAI recommends it.

`;



}





return `

✅ ${item.name || item.type}

is ready for your next outfit.

`;



}
