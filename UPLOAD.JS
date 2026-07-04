import { storage, auth } from "./firebase.js";
import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

window.uploadClothes = function () {
  const file = document.getElementById("file").files[0];
  const status = document.getElementById("status");

  if (!file) {
    status.innerText = "Select a file first";
    return;
  }

  const storageRef = ref(storage, "clothes/" + file.name);

  uploadBytes(storageRef, file).then(() => {
    getDownloadURL(storageRef).then(url => {
      status.innerText = "Uploaded successfully!";
      console.log("Image URL:", url);
    });
  });
};
