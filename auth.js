import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


// ==========================
// SIGN UP
// ==========================

window.signup = async function(){

const email =
document.getElementById("email").value.trim();

const password =
document.getElementById("password").value.trim();

const msg =
document.getElementById("msg");


if(!email || !password){

msg.innerHTML =
"Please enter email and password";

return;

}


try{


await createUserWithEmailAndPassword(

auth,

email,

password

);


msg.innerHTML =
"Account created successfully ✅";


setTimeout(()=>{

window.location.href="dashboard.html";

},1000);



}

catch(error){


msg.innerHTML =
error.message;


}


};



// ==========================
// LOGIN
// ==========================


window.login = async function(){


const email =
document.getElementById("email").value.trim();


const password =
document.getElementById("password").value.trim();


const msg =
document.getElementById("msg");



if(!email || !password){

msg.innerHTML =
"Please enter email and password";

return;

}



try{


await signInWithEmailAndPassword(

auth,

email,

password

);



msg.innerHTML =
"Login successful ✅";



setTimeout(()=>{


window.location.href="dashboard.html";


},1000);



}


catch(error){


msg.innerHTML =
error.message;


}


};



// ==========================
// PASSWORD RESET
// ==========================


window.resetPassword = async function(){


const email =
document.getElementById("email").value.trim();



if(!email){

alert(
"Enter your email first"
);

return;

}



try{


await sendPasswordResetEmail(

auth,

email

);



alert(
"Password reset email sent ✅"
);



}

catch(error){


alert(
error.message
);


}



};



// ==========================
// LOGOUT
// ==========================


window.logout = async function(){


try{


await signOut(auth);



window.location.href =
"index.html";



}

catch(error){


console.log(error.message);


}


};



// ==========================
// CHECK LOGIN STATUS
// ==========================


onAuthStateChanged(auth,(user)=>{


if(user){


console.log(

"User logged in:",

user.email

);


}

else{


console.log(

"No user logged in"

);


}



});
