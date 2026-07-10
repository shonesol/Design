import {

initializeApp

}

from 

"https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import {

getAuth

}

from

"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

import {

getFirestore

}

from

"https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
const firebaseConfig = {

apiKey: "AIzaSyA1wmHCfPLOmw1u3zUM-M2bUlCUWJDv2Bk",

authDomain: "design-a0e45.firebaseapp.com",

projectId: "design-a0e45",

storageBucket: "design-a0e45.firebasestorage.app",

messagingSenderId: "752963168855",

appId: "1:752963168855:web:660513e16f91108e489112",

measurementId: "G-3FYBPXQRPW"

};







const app =

initializeApp(

firebaseConfig

);

export const auth =

getAuth(app);

export const db =

getFirestore(app);
