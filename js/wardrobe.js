// wardrobe.js
// FashionAI Wardrobe Manager


import {
getDatabase
}
from "./database-manager.js";


import {
getClothes,
deleteClothing,
updateLaundryStatus,
updateClothing
}
from "./db.js";



// ==========================
// DATABASE
// ==========================

let database = null;




async function startWardrobe(){


try{


database = await getDatabase();



console.log(
"✅ FashionAI Wardrobe Connected"
);



loadWardrobe();



}

catch(error){


console.error(
"Wardrobe Database Error:",
error
);



}


}



startWardrobe();







// ==========================
// ELEMENTS
// ==========================


const wardrobe =
document.getElementById(
"wardrobe"
);



const search =
document.getElementById(
"searchClothes"
);



const filter =
document.getElementById(
"categoryFilter"
);







// ==========================
// EVENTS
// ==========================


if(search){

search.oninput = ()=>{

loadWardrobe();

};

}




if(filter){

filter.onchange = ()=>{

loadWardrobe();

};

}









// ==========================
// LOAD WARDROBE
// ==========================


async function loadWardrobe(){


if(!database){

return;

}



try{


const clothes =

await getClothes(
database
);



let items=[...clothes];




// SEARCH


if(search){


const keyword =

search.value
.toLowerCase()
.trim();



if(keyword){


items =
items.filter(item=>


(item.name || "")
.toLowerCase()
.includes(keyword)


||


(item.color || "")
.toLowerCase()
.includes(keyword)


||


(item.style || "")
.toLowerCase()
.includes(keyword)


);


}


}







// FILTER


if(

filter &&

filter.value !== "All"

){


items =
items.filter(item=>

item.category === filter.value

);


}







displayWardrobe(items);



updateStatistics();



}


catch(error){


console.error(
"Wardrobe Error",
error
);


}



}









// ==========================
// DISPLAY
// ==========================


function displayWardrobe(items){



if(!wardrobe){

return;

}



wardrobe.innerHTML="";





if(items.length===0){


wardrobe.innerHTML=


`

<div class="empty-wardrobe">

<h2>
👕 No clothes found
</h2>

<p>
Upload clothing to start FashionAI
</p>

</div>

`;

return;


}








items.forEach(item=>{



const card =
document.createElement(
"div"
);



card.className =
"wardrobe-card";




card.innerHTML=


`

<img 
src="${item.image}"
class="wardrobe-image"
>


<h3>
${item.name || item.type}
</h3>



<p>
<b>Category:</b>
${item.category}
</p>



<p>
<b>Color:</b>
${item.color}
</p>



<p>
<b>Style:</b>
${item.style}
</p>



<p>
<b>Laundry:</b>
${item.laundryStatus || "Clean"}
</p>



<p>
<b>Times worn:</b>
${item.timesWorn || 0}
</p>



<div class="wardrobe-buttons">


<button class="favorite-btn">
⭐ Favorite
</button>


<button class="clean-btn">
🧺 Clean
</button>


<button class="dirty-btn">
👕 Dirty
</button>


<button class="delete-btn">
🗑 Delete
</button>


</div>

`;





wardrobe.appendChild(card);






// FAVORITE


card.querySelector(
".favorite-btn"
)
.onclick=async()=>{


item.favorite =
!item.favorite;



await updateClothing(

database,

item

);



loadWardrobe();


};









// CLEAN


card.querySelector(
".clean-btn"
)
.onclick=async()=>{


await updateLaundryStatus(

database,

item.id,

"Clean"

);



loadWardrobe();


};









// DIRTY


card.querySelector(
".dirty-btn"
)
.onclick=async()=>{


await updateLaundryStatus(

database,

item.id,

"Dirty"

);



loadWardrobe();


};









// DELETE


card.querySelector(
".delete-btn"
)
.onclick=async()=>{


if(confirm(
"Delete this clothing?"
)){


await deleteClothing(

database,

item.id

);



loadWardrobe();


}



};




});



}









// ==========================
// STATISTICS
// ==========================


async function updateStatistics(){



const stats =

document.getElementById(
"wardrobeStats"
);



if(!stats){

return;

}




const clothes =

await getClothes(
database
);





stats.innerHTML=


`

<h2>
📊 Wardrobe Statistics
</h2>


<p>
👗 Total Clothes:
${clothes.length}
</p>



<p>
🧺 Clean:
${
clothes.filter(
x=>x.laundryStatus==="Clean"
).length
}
</p>



<p>
👕 Dirty:
${
clothes.filter(
x=>x.laundryStatus==="Dirty"
).length
}
</p>



<p>
⭐ Favorites:
${
clothes.filter(
x=>x.favorite
).length
}
</p>


`;



}








// ==========================
// AUTO REFRESH AFTER UPLOAD
// ==========================


window.addEventListener(
"clothingAdded",
()=>{


loadWardrobe();


}
);
