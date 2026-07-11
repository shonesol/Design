// dashboard.js
// FashionAI AI Dashboard Controller


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





let database = null;







// =====================================
// AUTHENTICATION
// =====================================


onAuthStateChanged(

auth,

async(user)=>{


if(!user){


console.log(
"User not logged in"
);


return;


}





try{


database = await getDatabase();



console.log(
"✅ FashionAI Dashboard Connected"
);



loadDashboard();



}


catch(error){


console.error(

"Dashboard Database Error:",

error

);


}



}

);









// =====================================
// LOAD DASHBOARD
// =====================================


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







updateDashboard(

clothes,

history,

style

);







generateSuggestions(

style,

clothes

);







loadShoppingAdvice();



}



catch(error){


console.error(

"Dashboard Loading Error:",

error

);


}



}









// =====================================
// UPDATE STATISTICS
// =====================================


function updateDashboard(

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


style.favoriteColors?.length

?

style.favoriteColors.join(", ")

:

"No style data yet";


}








const favoriteStyle =

document.getElementById(

"favoriteStyle"

);



if(favoriteStyle){


favoriteStyle.innerHTML =

style.fashionPersonality;


}





}









// =====================================
// AI MEMORY DISPLAY
// =====================================


function generateSuggestions(

style,

clothes

){



const box =

document.getElementById(

"suggestions"

);



if(!box){

return;

}





box.innerHTML = `


<div class="suggestion-card">


<h3>
🤖 FashionAI Memory
</h3>


<p>

Style Personality:

<strong>

${style.fashionPersonality}

</strong>

</p>



<p>

Favourite Styles:

${

style.favoriteStyles?.join(", ")

|| "Learning..."

}

</p>



<p>

Favourite Colors:

${

style.favoriteColors?.join(", ")

|| "Learning..."

}

</p>



<p>

Wardrobe Size:

${clothes.length}

items

</p>



</div>


`;



}









// =====================================
// SHOPPING AI
// =====================================


async function loadShoppingAdvice(){


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

!box ||

!result ||

!result.shoppingRecommendations

){


return;


}






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



catch(error){


console.error(

"Shopping AI Error:",

error

);


}



}









// =====================================
// BACKUP
// =====================================


const backupBtn =

document.getElementById(

"backupBtn"

);



if(backupBtn){


backupBtn.onclick = ()=>{


exportFashionAI(

database

);


alert(

"✅ FashionAI backup created"

);


};


}









// =====================================
// RESTORE
// =====================================


const restoreBtn =

document.getElementById(

"restoreBtn"

);



if(restoreBtn){


restoreBtn.onclick = async()=>{



const fileInput =

document.getElementById(

"restoreFile"

);





const file =

fileInput?.files[0];






if(!file){


alert(

"Choose a backup file first"

);


return;


}






await importFashionAI(

database,

file

);





alert(

"✅ FashionAI restored successfully"

);





loadDashboard();



};



}
