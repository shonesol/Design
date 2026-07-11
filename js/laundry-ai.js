// laundry-ai.js
// FashionAI Laundry Intelligence


import {
getClothes
}
from "./db.js";




// ==========================
// AUTO CHECK LAUNDRY STATUS
// ==========================


export async function autoLaundryCheck(

database

){



const clothes =

await getClothes(

database

);





clothes.forEach(item=>{



let newStatus =

item.laundryStatus;





// After 5 wears

if(

item.timesWorn >= 5

){


newStatus =
"Needs Washing";


}





// After washing

if(

item.lastWashed &&

Date.now() -

new Date(item.lastWashed).getTime()

>

14 *

24 *

60 *

60 *

1000

){


newStatus =
"Needs Washing";


}





if(

newStatus !== item.laundryStatus

){



updateLaundryStatus(

database,

item.id,

newStatus

);



}



});



}








// ==========================
// UPDATE STATUS
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



item.timesWorn = 0;



}



store.put(item);



}



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
// AVAILABLE CLOTHES
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
// LAUNDRY ADVICE
// ==========================


export function laundryAdvice(item){



if(

item.laundryStatus==="Needs Washing"

){


return `

🧺 Wash this item.

Worn ${item.timesWorn || 0} times.

`;



}





return `

✅ Ready to wear.

`;



}
