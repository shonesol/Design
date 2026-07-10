import {
getClothes
}
from "./db.js";



export async function increaseWearCount(
database,
ids
){


const transaction =
database.transaction(
"wardrobe",
"readwrite"
);



const store =
transaction.objectStore(
"wardrobe"
);



for(
let id of ids
){


const request =
store.get(id);



request.onsuccess=()=>{


let item =
request.result;



if(item){


item.timesWorn =
(item.timesWorn || 0)+1;


item.lastWorn =
new Date()
.toISOString();



store.put(item);


}



};



}



}
