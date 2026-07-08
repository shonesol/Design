import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-check.js";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_API_KEY",
  authDomain: "design-a0e45.firebaseapp.com",
  databaseURL: "https://design-a0e45-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "design-a0e45",
  storageBucket: "design-a0e45.firebasestorage.app",
  messagingSenderId: "752963168855",
  appId: "1:752963168855:web:668b25771e5a85e4489112",
  measurementId: "G-Y803FMNDL3"
};

const app = initializeApp(firebaseConfig);

// Enable Firebase App Check
const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaEnterpriseProvider(
    "6LcyFUotAAAAABa1cYw872nLz_Uc8rJXACDqSb7E"
  ),
  isTokenAutoRefreshEnabled: true
});

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export { appCheck };
