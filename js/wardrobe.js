// wardrobe.js
// FashionAI Wardrobe Manager


import {
getDatabase
}
from "./database-manager.js";


import {
getClothes,
deleteClothing,
updateLaundryStatus
}
from "./db.js";




// ==========================
// DATABASE
// ==========================

let database = null;



database = await getDatabase();

console.log(
"✅ FashionAI Wardrobe Connected"
);




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


try{


const clothes =

await getClothes(
database
);



let items = [...clothes];





// SEARCH

if(search){


const keyword =

search.value
.toLowerCase()
.trim();



if(keyword){


items = items.filter(item=>


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


if(filter && filter.value !== "All"){


items = items.filter(item=>

item.category === filter.value

);


}





displayWardrobe(items);



updateStatistics();



}



catch(error){


console.error(

"Wardrobe Error:",

error

);



wardrobe.innerHTML =

`
<h3>
❌ Unable to load wardrobe
</h3>
`;



}



}









// ==========================
// DISPLAY CLOTHES
// ==========================


function displayWardrobe(items){


if(!wardrobe){

return;

}



wardrobe.innerHTML="";





if(items.length===0){


wardrobe.innerHTML =

`

<div class="empty-wardrobe">


<h2>
👕 No clothes found
</h2>


<p>
Upload clothes to start FashionAI
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





card.innerHTML =


`

<img

src="${item.image}"

class="wardrobe-image"

>




<h3>

${item.name || item.type || "Clothing"}

</h3>




<p>

<b>Category:</b>

${item.category}

</p>




<p>

<b>Color:</b>

${item.color || "Unknown"}

</p>



<p>

<b>Style:</b>

${item.style || "Unknown"}

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





// BUTTONS


card.querySelector(
".favorite-btn"
)
.onclick = ()=>{


toggleFavorite(item.id);


};





card.querySelector(
".clean-btn"
)
.onclick = async()=>{


await updateLaundryStatus(

database,

item.id,

"Clean"

);



loadWardrobe();


};






card.querySelector(
".dirty-btn"
)
.onclick = async()=>{


await updateLaundryStatus(

database,

item.id,

"Dirty"

);



loadWardrobe();


};






card.querySelector(
".delete-btn"
)
.onclick = async()=>{


const confirmDelete =

confirm(
"Delete this clothing?"
);



if(confirmDelete){


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
// FAVORITE
// ==========================


async function toggleFavorite(id){


const clothes =

await getClothes(
database
);



const item =

clothes.find(
c=>c.id===id
);



if(!item){

return;

}



item.favorite =

!item.favorite;





const transaction =

database.transaction(

"wardrobe",

"readwrite"

);



const store =

transaction.objectStore(
"wardrobe"
);



store.put(item);




transaction.oncomplete = ()=>{


loadWardrobe();


};



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





stats.innerHTML =


`

<h2>
📊 Wardrobe Statistics
</h2>


<p>
Total Clothes:
${clothes.length}
</p>


<p>
Clean:
${
clothes.filter(
x=>x.laundryStatus==="Clean"
).length
}
</p>


<p>
Dirty:
${
clothes.filter(
x=>x.laundryStatus==="Dirty"
).length
}
</p>


<p>
Favorites:
${
clothes.filter(
x=>x.favorite
).length
}
</p>


`;



}








// ==========================
// START
// ==========================


loadWardrobe();
