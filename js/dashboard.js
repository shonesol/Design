// dashboard.js
// FashionAI Dashboard Controller


import { auth } from "./firebase.js";


import {
onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
getDatabase
}
from "./database-manager.js";


import {
getClothes,
getWearHistory
}
from "./db.js";


import {
exportFashionAI,
importFashionAI
}
from "./backup-restore.js";


import {
analyzeUserStyle
}
from "./style-learning.js";


import {
analyzeShoppingNeeds
}
from "./shopping-ai.js";




// ==========================
// VARIABLES
// ==========================


let database = null;





// ==========================
// FIREBASE LOGIN
// ==========================


onAuthStateChanged(

auth,

async(user)=>{


if(!user){


console.log(
"❌ No user logged in"
);


return;


}



try{


console.log(
"User:",
user.uid
);



database = await getDatabase();



console.log(
"✅ FashionAI Database Connected"
);



loadDashboard();



}

catch(error){


console.error(
"Database connection failed:",
error
);


}


});


 




// ==========================
// LOAD DASHBOARD
// ==========================


async function loadDashboard(){


try{


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





updateStats(

clothes,

history,

style

);





showMemory(

style,

clothes

);





loadShoppingAI();



}

catch(error){


console.error(

"Dashboard Error:",

error

);


}



}









// ==========================
// UPDATE CARDS
// ==========================


function updateStats(

clothes,

history,

style

){



const totalClothes =

document.getElementById(
"totalClothes"
);



if(totalClothes){

totalClothes.innerHTML =
clothes.length;

}





const totalWorn =

document.getElementById(
"totalWorn"
);



if(totalWorn){

totalWorn.innerHTML =
history.length;

}





const favoriteColors =

document.getElementById(
"favoriteColors"
);



if(favoriteColors){


favoriteColors.innerHTML =

style.favoriteColors.length

?

style.favoriteColors.join(", ")

:

"Learning";

}





const favoriteStyle =

document.getElementById(
"favoriteStyle"
);



if(favoriteStyle){


favoriteStyle.innerHTML =

style.fashionPersonality;


}





const confidence =

document.getElementById(
"confidence"
);



if(confidence){


confidence.innerHTML =

style.confidence + "%";


}



}









// ==========================
// AI MEMORY
// ==========================


function showMemory(

style,

clothes

){


const box =

document.getElementById(
"suggestions"
);



if(!box)

return;





box.innerHTML = `


<div class="suggestion-card">


<h3>
🤖 FashionAI Memory
</h3>



<p>

Fashion Personality:

<b>

${style.fashionPersonality}

</b>

</p>




<p>

Favourite Styles:

${

style.favoriteStyles.length

?

style.favoriteStyles.join(", ")

:

"Learning..."

}

</p>





<p>

Favourite Colors:

${

style.favoriteColors.length

?

style.favoriteColors.join(", ")

:

"Learning..."

}

</p>





<p>

Wardrobe Size:

<b>

${clothes.length}

items

</b>

</p>



</div>


`;



}









// ==========================
// SHOPPING AI
// ==========================


async function loadShoppingAI(){


try{


const result =

await analyzeShoppingNeeds(

database

);



const box =

document.getElementById(
"suggestions"
);



if(

result &&

result.shoppingRecommendations &&

box

){



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



}

catch(error){


console.log(

"Shopping AI not available"

);


}



}









// ==========================
// BACKUP
// ==========================


const backupButton =

document.getElementById(
"backupBtn"
);



if(backupButton){


backupButton.onclick = async()=>{


if(!database){

alert(
"Database not ready"
);

return;

}



await exportFashionAI(

database

);



alert(

"✅ FashionAI backup completed"

);



};


}









// ==========================
// RESTORE
// ==========================


const restoreButton =

document.getElementById(
"restoreBtn"
);



if(restoreButton){


restoreButton.onclick = async()=>{


const file =

document
.getElementById(
"restoreFile"
)
.files[0];




if(!file){


alert(

"Choose backup file first"

);


return;


}




await importFashionAI(

database,

file

);



alert(

"✅ FashionAI restored"

);



loadDashboard();



};


}
