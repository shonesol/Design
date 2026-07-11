import {auth}
from "./firebase.js";


import {
onAuthStateChanged
}
from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
openDatabase,
getClothes,
getWearHistory
}
from "./db.js";

import {

exportFashionAI,
importFashionAI

}

from "./backup-ai.js";

import {
analyzeUserStyle
}
from "./style-learning.js";


import {
analyzeShoppingNeeds
}
from "./shopping-ai.js";

import {
exportFashionAI,
importFashionAI
}
from "./backup-restore.js";


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





// CLOTHING COUNT

document
.getElementById(
"totalClothes"
)
.innerHTML =
clothes.length;





// OUTFITS WORN

document
.getElementById(
"totalWorn"
)
.innerHTML =
history.length;







// COLORS

document
.getElementById(
"favoriteColors"
)
.innerHTML =

style.favoriteColors.length

?

style.favoriteColors.join(", ")

:

"No style data yet";







// STYLE

document
.getElementById(
"favoriteStyle"
)
.innerHTML =

style.fashionPersonality;







// AI SUGGESTIONS

generateSuggestions(
style,
clothes
);







// SHOPPING AI

loadShoppingAdvice();



}









async function loadShoppingAdvice(){


const result =
await analyzeShoppingNeeds(
database
);



let box =
document.getElementById(
"suggestions"
);



box.innerHTML += `

<h3>
🛍 AI Shopping Advice
</h3>

`;





result.shoppingRecommendations
.slice(0,3)
.forEach(item=>{


box.innerHTML += `


<div class="suggestion-card">


<h4>
${item.item}
</h4>


<p>
${item.reason}
</p>


</div>


`;


});


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


<div class="suggestion-card">


<h3>
🤖 FashionAI Memory
</h3>


<p>

Style Personality:

${style.fashionPersonality}

</p>



<p>

Favourite Styles:

${style.favoriteStyles.join(", ")}

</p>



<p>

Favourite Colors:

${style.favoriteColors.join(", ")}

</p>



<p>

Wardrobe Size:

${clothes.length} items

</p>


</div>


`;



}
document
.getElementById(
"backupBtn"
)
.onclick = ()=>{


exportFashionAI(
database
);


};





document
.getElementById(
"restoreBtn"
)
.onclick = async()=>{


const file =

document
.getElementById(
"restoreFile"
)
.files[0];



if(file){


await importFashionAI(

database,

file

);



alert(
"✅ FashionAI wardrobe restored"
);


}
// ==========================
// BACKUP
// ==========================


document
.getElementById(
"backupBtn"
)
.onclick = ()=>{


exportFashionAI(
database
);


};






// ==========================
// RESTORE
// ==========================


document
.getElementById(
"restoreBtn"
)
.onclick = async()=>{


const file =

document
.getElementById(
"restoreFile"
)
.files[0];





if(file){


await importFashionAI(

database,

file

);



alert(
"✅ FashionAI restored successfully"
);



}



};

};
