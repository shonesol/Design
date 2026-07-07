import {storage,db,auth} from "./firebase.js";


import {

ref,
uploadBytes,
getDownloadURL

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";


import {

collection,
addDoc,
getDocs,
deleteDoc,
doc

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



// SAVE CLOTHES

window.saveClothes = async function(){


const file =
document.getElementById("clothesImage").files[0];


const category =
document.getElementById("category").value;


const color =
document.getElementById("color").value;


const message =
document.getElementById("message");


const user=auth.currentUser;



if(!user){

message.innerHTML="Login first";

return;

}



if(!file){

message.innerHTML="Choose image";

return;

}



const imageRef =
ref(
storage,
"wardrobe/"+user.uid+"/"+Date.now()
);



await uploadBytes(imageRef,file);



const url =
await getDownloadURL(imageRef);



await addDoc(

collection(
db,
"users",
user.uid,
"wardrobe"
),

{


image:url,

category:category,

color:color,

createdAt:new Date()

}


);



message.innerHTML=
"Clothing saved ✅";


loadWardrobe();


};




// LOAD WARDROBE


async function loadWardrobe(){


const box=
document.getElementById("wardrobe");


box.innerHTML="";


const user=auth.currentUser;


if(!user)return;



const snap =
await getDocs(

collection(
db,
"users",
user.uid,
"wardrobe"
)

);



snap.forEach(item=>{


let data=item.data();



box.innerHTML +=`

<div class="card">


<img src="${data.image}">


<h3>${data.category}</h3>


<p>
Color: ${data.color}
</p>


<button onclick="removeCloth('${item.id}')">
Delete
</button>


</div>


`;



});


}





// DELETE

window.removeCloth=async function(id){


const user=auth.currentUser;


await deleteDoc(

doc(
db,
"users",
user.uid,
"wardrobe",
id

)

);


loadWardrobe();


}





auth.onAuthStateChanged(()=>{

loadWardrobe();

});
