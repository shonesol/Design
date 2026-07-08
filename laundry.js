import {db,auth} from "./firebase.js";

import {
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


async function loadLaundry(){

const box =
document.getElementById("laundryList");


const user =
auth.currentUser;


if(!user){

box.innerHTML="Login first";
return;

}


const snapshot =
await getDocs(

collection(
db,
"users",
user.uid,
"wardrobe"
)

);


let html="";


snapshot.forEach(doc=>{

const item=doc.data();


html += `

<div class="card">

<img src="${item.imageUrl}" width="150">

<h3>
${item.type}
</h3>

<p>
Status:
${item.status || "Clean"}
</p>

</div>

`;

});


box.innerHTML = html || "No clothes added yet";


}



auth.onAuthStateChanged(()=>{

loadLaundry();

});
