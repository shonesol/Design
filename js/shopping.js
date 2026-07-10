import {
auth
}
from "./firebase.js";


import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
openDatabase
}
from "./db.js";


import {
analyzeShoppingNeeds
}
from "./shopping-ai.js";



let database;




onAuthStateChanged(
auth,
async(user)=>{


if(user){


database =
await openDatabase(
user.uid
);


}


});







document
.getElementById("analyzeBtn")
.onclick =
async()=>{


const result =
await analyzeShoppingNeeds(
database
);





document
.getElementById(
"shoppingResult"
)
.innerHTML = `


<h2>
AI Recommendations
</h2>


${

result
.shoppingRecommendations
.map(item=>`


<div>


<h3>
${item.item}
</h3>


<p>
${item.reason}
</p>


</div>


`)
.join("")

}


`;



};
