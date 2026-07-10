// cloud-db.js
// FashionAI Cloud Wardrobe Database


import {
db
}
from "./firebase.js";


import {

collection,

addDoc,

getDocs,

deleteDoc,

doc,

query,

where

}

from

"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";





// ==========================
// SAVE CLOTHING TO CLOUD
// ==========================


export async function saveCloudClothing(
uid,
item
){


await addDoc(

collection(
db,
"users",
uid,
"wardrobe"
),

item

);


}






// ==========================
// LOAD USER WARDROBE
// ==========================


export async function loadCloudWardrobe(
uid
){


const snapshot =
await getDocs(

collection(
db,
"users",
uid,
"wardrobe"

)

);




let clothes=[];




snapshot.forEach(
(doc)=>{


clothes.push({

id:doc.id,

...doc.data()

});


});



return clothes;


}






// ==========================
// DELETE CLOTHING
// ==========================


export async function deleteCloudClothing(
uid,
id
){


await deleteDoc(

doc(

db,

"users",

uid,

"wardrobe",

id

)

);


}
