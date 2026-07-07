import {db,auth} from "./firebase.js";


import {

collection,
getDocs

} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";



async function loadProfile(){


const box =
document.getElementById("stats");



const user =
auth.currentUser;



if(!user){

box.innerHTML =
"Login first";

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




let colors={};

let categories={};



clothes.forEach(item=>{


// Colors count

if(item.color){

colors[item.color]=
(colors[item.color]||0)+1;

}


// Categories count

if(item.type){

categories[item.type]=
(categories[item.type]||0)+1;

}



});





let favoriteColor =
Object.keys(colors)
.sort(
(a,b)=>colors[b]-colors[a]
)[0]
||"Not enough data";





let favoriteStyle =
categories["shirt"]
?
"Smart Casual"
:
"Explorer Style";






box.innerHTML=

`

<h2>👕 Total Clothes</h2>

<p>
${clothes.length}
items
</p>


<h2>🎨 Favorite Color</h2>

<p>
${favoriteColor}
</p>



<h2>✨ Fashion Personality</h2>

<p>
${favoriteStyle}
</p>



<h2>📂 Categories</h2>

<pre>
${JSON.stringify(categories,null,2)}
</pre>

`;



}



auth.onAuthStateChanged(()=>{

loadProfile();

});
