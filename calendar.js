import {db,auth} from "./firebase.js";


import {

collection,
addDoc,
getDocs

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



window.planOutfit = async function(){


const user =
auth.currentUser;


const date =
document.getElementById("date").value;


const event =
document.getElementById("event").value;


const output =
document.getElementById("planResult");



if(!user){

output.innerText="Login first";

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



let clothes=[];


snapshot.forEach(doc=>{

clothes.push(doc.data());

});



if(clothes.length===0){

output.innerText=
"Upload clothes first";

return;

}



let item =
clothes[
Math.floor(
Math.random()*clothes.length
)
];



let outfit =

`
📅 Date:
${date}


🎯 Event:
${event}


👗 Outfit:

${item.color || ""}
${item.type || "clothes"}


✨ AI Advice:

Dress confidently and match your accessories.
`;




await addDoc(

collection(
db,
"users",
user.uid,
"calendar"

),

{

date:date,

event:event,

outfit:outfit,

createdAt:Date.now()

}

);



output.innerText=
outfit;



loadSchedule();


};





async function loadSchedule(){


const box =
document.getElementById("schedule");


const user =
auth.currentUser;


if(!user)return;



const snapshot =
await getDocs(

collection(
db,
"users",
user.uid,
"calendar"

)

);



box.innerHTML="";



snapshot.forEach(doc=>{


let data=doc.data();



box.innerHTML +=

`

<div class="card">

<pre>
${data.outfit}
</pre>

</div>

`;



});


}



auth.onAuthStateChanged(()=>{

loadSchedule();

});
