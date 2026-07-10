// feedback-learning.js
// FashionAI Recommendation Learning


import {
openDatabase
} from "./db.js";




// ==========================
// SAVE OUTFIT FEEDBACK
// ==========================


export function saveFeedback(
database,
outfit,
rating
){


return new Promise((resolve,reject)=>{


const transaction =
database.transaction(
"feedback",
"readwrite"
);



const store =
transaction.objectStore(
"feedback"
);




const feedback = {


outfit:{


top:outfit.top.id,

bottom:outfit.bottom.id,

shoe:outfit.shoe.id

},



rating:rating,



date:
new Date()
.toISOString()



};





const request =
store.add(
feedback
);




request.onsuccess=()=>{

resolve(feedback);

};



request.onerror=()=>{

reject(request.error);

};



});

}
