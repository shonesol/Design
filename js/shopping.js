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

import {
auth
}
from "./firebase.js";


import {
onAuthStateChanged
}
from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
openDatabase,
getClothes
}
from "./db.js";


import {
analyzeWardrobeNeeds
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



loadAdvice();


}


});







async function loadAdvice(){



const clothes =
await getClothes(
database
);





const advice =
analyzeWardrobeNeeds(
clothes
);





const box =
document.getElementById(
"shoppingResult"
);





box.innerHTML="";





if(advice.length===0){


box.innerHTML=

`
<h2>
✅ Your wardrobe is balanced
</h2>
`;


return;


}






advice.forEach(item=>{



box.innerHTML += `


<div class="card">


<h2>
🛒 ${item.item}
</h2>


<p>

${item.reason}

</p>


</div>


`;


});



}


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
