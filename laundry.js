import {db,auth} from "./firebase.js";


import {

collection,
getDocs,
updateDoc,
doc

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



async function loadClothes(){


const box =
document.getElementById("clothesList");


const user =
auth.currentUser;


if(!user)return;



const snapshot =
await getDocs(

collection(
db,
"user",
user.uid,
"wardrobe"

)

);



box.innerHTML="";



snapshot.forEach(item=>{


const data =
item.data();



box.innerHTML +=

`

<div class="card">


<h3>
${data.color || ""}
${data.type || "Clothing"}
</h3>



<p>

Status:
${data.status || "Clean"}

</p>



<button onclick="markWorn('${item.id}')">

👕 Mark Worn

</button>



<button onclick="markClean('${item.id}')">

✨ Mark Clean

</button>


</div>

`;



});


}





window.markWorn = async function(id){


const user =
auth.currentUser;



await updateDoc(

doc(
db,
"users",
user.uid,
"wardrobe",
id

),

{

status:"Needs Washing",

lastWorn:Date.now()

}

);



loadClothes();


};





window.markClean = async function(id){


const user =
auth.currentUser;



await updateDoc(

doc(
db,
"users",
user.uid,
"wardrobe",
id

),

{

status:"Clean"

}

);



loadClothes();


};





auth.onAuthStateChanged(()=>{

loadClothes();

});
