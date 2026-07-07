import { auth } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


// SIGN UP
window.signup = async function(){

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const msg = document.getElementById("msg");


try{

await createUserWithEmailAndPassword(
auth,
email,
password
);

msg.innerHTML="Account created successfully ✅";

window.location.href="dashboard.html";


}catch(error){

msg.innerHTML=error.message;

}

}


// LOGIN
window.login = async function(){

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;
const msg=document.getElementById("msg");


try{

await signInWithEmailAndPassword(
auth,
email,
password
);

msg.innerHTML="Login successful ✅";

window.location.href="dashboard.html";


}catch(error){

msg.innerHTML=error.message;

}

}


// PASSWORD RESET
window.resetPassword=async function(){

const email=document.getElementById("email").value;

await sendPasswordResetEmail(
auth,
email
);

alert("Password reset email sent");

}


// LOGOUT
window.logout=async function(){

await signOut(auth);

window.location.href="index.html";

}
