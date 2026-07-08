import { auth } from "./firebase.js";
import { askGemini } from "./gemini-ai.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const msg = document.getElementById("msg");

// SIGN UP
window.signup = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    msg.innerText = "Account created successfully!";
  } catch (error) {
    msg.innerText = error.message;
  }
};

// LOGIN
window.login = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);

    msg.innerText = "Login successful!";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);

  } catch (error) {
    msg.innerText = error.message;
  }
};
