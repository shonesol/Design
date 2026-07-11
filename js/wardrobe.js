// wardrobe.js
// FashionAI Wardrobe Manager


import {
getDatabase
}
from "./database-manager.js";


import {
getClothes,
deleteClothing
}
from "./db.js";


import {
updateLaundryStatus
}
from "./laundry-ai.js";



// ==========================
// DATABASE
// ==========================

const database =
await getDatabase();



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
// LOAD WARDROBE
// ==========================

loadWardrobe();



// ==========================
// SEARCH
// ==========================

search.oninput = ()=>{

loadWardrobe();

};



// ==========================
// FILTER
// ==========================

filter.onchange = ()=>{

loadWardrobe();

};



// ==========================
// LOAD CLOTHES
// ==========================

async function loadWardrobe(){


const clothes =
await getClothes(
database
);



let items =
[...clothes];



// SEARCH

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

||

(item.brand || "")
.toLowerCase()
.includes(keyword)

);

}



// CATEGORY FILTER

const category =

filter.value;



if(category!="All"){

items =

items.filter(item=>

item.category===category

);

}



// DISPLAY

displayWardrobe(items);

}
// ==========================
// DISPLAY WARDROBE
// ==========================

function displayWardrobe(items){

wardrobe.innerHTML = "";



if(items.length===0){

wardrobe.innerHTML =

`

<div class="empty-wardrobe">

<h2>👕 No clothing found</h2>

<p>

Upload clothing or change your search.

</p>

</div>

`;

return;

}



items.forEach(item=>{

const card =
document.createElement("div");

card.className="wardrobe-card";



card.innerHTML =

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

<b>Brand:</b>

${item.brand || "Unknown"}

</p>

<p>

<b>Material:</b>

${item.material}

</p>

<p>

<b>Season:</b>

${item.season}

</p>

<p>

<b>Occasion:</b>

${item.occasion}

</p>

<p>

<b>Laundry:</b>

${item.laundryStatus}

</p>

<p>

<b>Times Worn:</b>

${item.timesWorn || 0}

</p>

<p>

<b>Confidence:</b>

${item.confidence || 0}%

</p>

${
item.favorite
?
"<p>⭐ Favorite</p>"
:
""
}

<div class="wardrobe-buttons">

<button
class="favorite-btn"
data-id="${item.id}"
>

⭐ Favorite

</button>

<button
class="clean-btn"
data-id="${item.id}"
>

🧺 Mark Clean

</button>

<button
class="dirty-btn"
data-id="${item.id}"
>

👕 Mark Dirty

</button>

<button
class="delete-btn"
data-id="${item.id}"
>

🗑 Delete

</button>

</div>

`;



wardrobe.appendChild(card);

});



// ==========================
// FAVORITE BUTTONS
// ==========================

document
.querySelectorAll(".favorite-btn")
.forEach(button=>{

button.onclick=()=>{

toggleFavorite(

Number(button.dataset.id)

);

};

});



// ==========================
// CLEAN BUTTON
// ==========================

document
.querySelectorAll(".clean-btn")
.forEach(button=>{

button.onclick=async()=>{

await updateLaundryStatus(

database,

Number(button.dataset.id),

"Clean"

);

loadWardrobe();

};

});



// ==========================
// DIRTY BUTTON
// ==========================

document
.querySelectorAll(".dirty-btn")
.forEach(button=>{

button.onclick=async()=>{

await updateLaundryStatus(

database,

Number(button.dataset.id),

"Dirty"

);

loadWardrobe();

};

});



// ==========================
// DELETE BUTTON
// ==========================

document
.querySelectorAll(".delete-btn")
.forEach(button=>{

button.onclick=async()=>{

if(

confirm(

"Delete this clothing item?"

)

){

await deleteClothing(

database,

Number(button.dataset.id)

);

loadWardrobe();

}

};

});

}
// ==========================
// TOGGLE FAVORITE
// ==========================

async function toggleFavorite(id){

const clothes =
await getClothes(database);

const item =
clothes.find(c=>c.id===id);

if(!item) return;

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

await new Promise((resolve,reject)=>{

const request =
store.put(item);

request.onsuccess=()=>resolve();

request.onerror=()=>reject(request.error);

});

loadWardrobe();

}



// ==========================
// WARDROBE STATISTICS
// ==========================

async function updateStatistics(){

const clothes =
await getClothes(database);

const total =
clothes.length;

const favorites =
clothes.filter(item=>item.favorite).length;

const clean =
clothes.filter(item=>
item.laundryStatus==="Clean"
).length;

const dirty =
clothes.filter(item=>
item.laundryStatus==="Dirty"
).length;

const stats =
document.getElementById(
"wardrobeStats"
);

if(!stats) return;

stats.innerHTML =

`

<h2>📊 Wardrobe Statistics</h2>

<p><b>Total Clothes:</b> ${total}</p>

<p><b>Favorites:</b> ${favorites}</p>

<p><b>Clean:</b> ${clean}</p>

<p><b>Needs Laundry:</b> ${dirty}</p>

`;

}



// ==========================
// REFRESH
// ==========================

async function refreshWardrobe(){

await loadWardrobe();

await updateStatistics();

}



// ==========================
// INITIALIZE
// ==========================

refreshWardrobe();
