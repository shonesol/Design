
import {auth} from "./firebase.js";


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
analyzeUserStyle
}
from "./style-learning.js";

let database = null;




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






const button =
document.getElementById(
"generateBtn"
);


const output =
document.getElementById(
"outfitResult"
);







// ==========================
// COLOR MATCHING AI
// ==========================


function colorScore(a,b){


if(!a || !b)
return 40;



a=a.toLowerCase();

b=b.toLowerCase();




if(a===b)
return 100;



const goodMatches=[


["black","white"],

["black","grey"],

["navy","white"],

["blue","brown"],

["beige","white"],

["green","brown"],

["red","black"],

["white","blue"]

];





for(let pair of goodMatches){


if(

pair.includes(a)

&&

pair.includes(b)

)

return 90;



}



return 60;


}








// ==========================
// OUTFIT SCORE
// ==========================


function scoreOutfit(
top,
bottom,
shoe,
profile
){


let score=0;



// COLOR MATCH

score +=
colorScore(
top.color,
bottom.color
);



score +=
colorScore(
bottom.color,
shoe.color
);





// STYLE MATCH

let outfitStyles=[

top.style?.toLowerCase(),

bottom.style?.toLowerCase(),

shoe.style?.toLowerCase()

];





profile.favoriteStyles.forEach(style=>{


if(
outfitStyles.includes(
style.toLowerCase()
)

)

{

score +=20;

}


});







// COLOR PREFERENCE


profile.favoriteColors.forEach(color=>{


if(

top.color
?.toLowerCase()
.includes(color)

)

{

score+=10;

}


});






return Math.min(
100,
Math.round(score/2)
);


}



// ==========================
// GENERATE OUTFITS
// ==========================


button.onclick =
async()=>{



if(!database){


output.innerHTML=
"Loading wardrobe...";


return;


}





const clothes =
await getClothes(
database
);





const available =
clothes.filter(
item=>

item.laundryStatus==="Clean"

||
item.laundryStatus==="Ready"

);







const tops =
available.filter(
item=>

item.category==="Top"

);






const bottoms =
available.filter(
item=>

item.category==="Bottom"

);






const shoes =
available.filter(
item=>

item.category==="Shoes"

);







if(
tops.length===0 ||
bottoms.length===0 ||
shoes.length===0
){


output.innerHTML=
`

<h3>
Need more clothes
</h3>

<p>
Upload tops, bottoms and shoes.
</p>

`;


return;


}







let outfits=[];







tops.forEach(top=>{


bottoms.forEach(bottom=>{


shoes.forEach(shoe=>{


const score =
scoreOutfit(
top,
bottom,
shoe
);



outfits.push({

top,

bottom,

shoe,

score


});



});


});


});








outfits.sort(
(a,b)=>
b.score-a.score
);








output.innerHTML="";






outfits
.slice(0,5)
.forEach(outfit=>{



output.innerHTML += `


<div class="outfit-card">


<h2>
🤖 AI Match
${outfit.score}%
</h2>



<img src="${outfit.top.image}" width="120">


<img src="${outfit.bottom.image}" width="120">


<img src="${outfit.shoe.image}" width="120">




<p>

👕 ${outfit.top.name}

<br>

👖 ${outfit.bottom.name}

<br>

👟 ${outfit.shoe.name}


</p>



<button onclick='saveOutfit(${JSON.stringify(outfit)})'>

❤️ Save Outfit

</button>



</div>


`;



});



};
import {
saveOutfit
}
from "./outfit-memory.js";



window.saveOutfit =
function(outfit){


saveOutfit(
database,
outfit
);


alert(
"❤️ Outfit saved to FashionAI memory"
);


};
