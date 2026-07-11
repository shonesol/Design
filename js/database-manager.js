// FashionAI Central Database Manager


import {
auth
}
from "./firebase.js";


import {
onAuthStateChanged
}
from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
openDatabase
}
from "./db.js";



let database = null;



let ready = false;



export function getDatabase(){


return new Promise((resolve)=>{


if(ready){


resolve(database);


return;


}




onAuthStateChanged(

auth,

async(user)=>{


if(user){


database =

await openDatabase(

user.uid

);



ready=true;



console.log(
"✅ FashionAI Database Connected"
);



resolve(database);



}



});


});


}
