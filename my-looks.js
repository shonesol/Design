import {db,auth} from "./firebase.js";


import {

collection,
getDocs,
deleteDoc,
doc

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



async function loadLooks(){


const box =
document.getElementById("looks");



const user =
auth.currentUser;


if(!user)return;



const snapshot =
await getDocs(

collection(
db,
"users",
user.uid,
"looks"

)

);



box.innerHTML="";



snapshot.forEach(item=>{


let data=item.data();



box.innerHTML +=

`

<div class="card">


<pre>
${data.outfit}
</pre>


<button onclick="deleteLook('${item.id}')">

Delete

</button>


</div>

`;



});


}



window.deleteLook = async function(id){


const user =
auth.currentUser;



await deleteDoc(

doc(
db,
"users",
user.uid,
"looks",
id

)

);


loadLooks();


};



auth.onAuthStateChanged(()=>{

loadLooks();

});
