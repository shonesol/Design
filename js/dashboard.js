import {auth}
from "./firebase.js";


import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
openDatabase,
getClothes
}
from "./db.js";


import {
getWearHistory
}
from "./history.js";


import {
analyzeUserStyle
}
from "./style-learning.js";





let database;



onAuthStateChanged(
auth,
async(user)=>{


if(user){


database =
await openDatabase(
user.uid
);



loadDashboard();


}



});






async function loadDashboard(){



const clothes =
await getClothes(
database
);



const history =
await getWearHistory(
database
);



const style =
await analyzeUserStyle(
database
);





document
.getElementById(
"totalClothes"
)
.innerHTML =
clothes.length;





document
.getElementById(
"totalWorn"
)
.innerHTML =
history.length;





document
.getElementById(
"favoriteColors"
)
.innerHTML =
style.favoriteColors.join(
", "
);





document
.getElementById(
"favoriteStyle"
)
.innerHTML =
style.favoriteStyles.join(
", "
);






generateSuggestions(
style,
clothes
);



}







function generateSuggestions(
style,
clothes
){


let box =
document
.getElementById(
"suggestions"
);



box.innerHTML = `


<p>
🤖 FashionAI learned your style:
</p>


<ul>

<li>
You prefer:
${style.favoriteStyles.join(", ")}
</li>


<li>
Your favorite colors:
${style.favoriteColors.join(", ")}
</li>


<li>
Your wardrobe contains:
${clothes.length}
items
</li>


</ul>


`;



}
