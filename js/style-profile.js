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
openDatabase
}
from "./db.js";


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



showStyle();


}


});







async function showStyle(){



const style =
await analyzeUserStyle(
database
);





document
.getElementById(
"styleResult"
)
.innerHTML = `



<h2>
${style.fashionPersonality}
</h2>


<h3>
🎨 Favorite Colors
</h3>


<p>
${style.favoriteColors.join(", ")}
</p>



<h3>
✨ Favorite Styles
</h3>


<p>
${style.favoriteStyles.join(", ")}
</p>



<h3>
🤖 AI Advice
</h3>


<p>

Your wardrobe shows a
${style.fashionPersonality}
identity.

FashionAI will use this
when creating outfits.

</p>


`;



}
