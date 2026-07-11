// auth.js
// FashionAI Authentication + Local Database Creator


import {
auth
}
from "./firebase.js";


import {

createUserWithEmailAndPassword,

signInWithEmailAndPassword,

onAuthStateChanged,

signOut

}
from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
openDatabase
}
from "./db.js";





// =================================
// SIGN UP
// =================================


export async function registerUser(

email,

password

){


try{


const result =

await createUserWithEmailAndPassword(

auth,

email,

password

);



const user = result.user;





// CREATE LOCAL DATABASE


await openDatabase(

user.uid

);





console.log(

"✅ FashionAI local database created"

);





return user;



}

catch(error){


console.error(error);

throw error;


}



}









// =================================
// LOGIN
// =================================


export async function loginUser(

email,

password

){


try{


const result =

await signInWithEmailAndPassword(

auth,

email,

password

);



const user = result.user;





// OPEN USER DATABASE


await openDatabase(

user.uid

);





console.log(

"✅ FashionAI database loaded"

);





return user;



}

catch(error){


console.error(error);

throw error;


}



}









// =================================
// CURRENT USER LISTENER
// =================================


export function checkUser(

callback

){



onAuthStateChanged(

auth,

async(user)=>{


if(user){


await openDatabase(

user.uid

);


}



callback(user);



}


);



}









// =================================
// LOGOUT
// =================================


export function logoutUser(){


return signOut(auth);


}
