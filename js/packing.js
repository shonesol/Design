import {auth}
from "./firebase.js";


import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
openDatabase
}
from "./db.js";


import {
generatePackingPlan
}
from "./packing-ai.js";



let database;



onAuthStateChanged(
auth,
async(user)=>{


if(user){

database =
await openDatabase(
user.uid
);

}


});






document
.getElementById("packBtn")
.onclick =
async()=>{



const destination =
document
.getElementById(
"destination"
)
.value;



const days =
document
.getElementById(
"days"
)
.value;



const activities =
document
.getElementById(
"activities"
)
.value;





const result =
await generatePackingPlan(
database,
destination,
days,
activities
);





document
.getElementById(
"packingResult"
)
.innerHTML =
result;



};
