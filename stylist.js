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
askStylist
}
from "./stylist-ai.js";



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
.getElementById("askBtn")
.onclick =
async()=>{


const question =
document
.getElementById("question")
.value;



const answer =
await askStylist(
database,
question
);



document
.getElementById("answer")
.innerHTML =
answer;



};
