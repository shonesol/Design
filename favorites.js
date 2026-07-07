import {db,auth} from "./firebase.js";

import {

collection,
getDocs,
updateDoc,
doc

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



async function loadFavorites(){


const box =
document.getElementById("favorites");


const user =
auth.currentUser;


if(!user)return;



const snapshot =
await getDocs(

collection(
db,
"users",
user.uid,
"wardrobe"
)

);



box.innerHTML="";



snapshot.forEach(item=>{


let data=item.data();



if(data.favorite){


box.innerHTML +=`

<div class="card">

<img src="${data.image}" width="200">


<h3>
${data.color}
${data.type}
</h3>


⭐ Rating:
${data.rating || 0}/5


</div>

`;

}


});


}





auth.onAuthStateChanged(()=>{

loadFavorites();

});
