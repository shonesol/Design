// upload.js
// FashionAI AI Clothing Upload System


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
addClothing
}
from "./db.js";


import {
optimizeImage
}
from "./image-preprocessor.js";


import {
analyzeClothing
}
from "./clothing-ai.js";




// ==========================
// VARIABLES
// ==========================

let database = null;

let user = null;







// ==========================
// LOGIN + DATABASE
// ==========================


onAuthStateChanged(

auth,

async(currentUser)=>{


if(!currentUser){


console.log(
"Waiting for login..."
);


return;


}



user = currentUser;



database = await getDatabase();



console.log(
"✅ Upload Database Ready"
);



}

);









// ==========================
// BUTTON
// ==========================


const uploadBtn =

document.getElementById(
"uploadBtn"
);





if(uploadBtn){



uploadBtn.onclick = async()=>{



try{



if(!database){


alert(
"Database loading..."
);


return;


}





const file =

document
.getElementById(
"clothingImage"
)
.files[0];





if(!file){


alert(
"Please select clothing image"
);


return;


}









// ==========================
// OPTIMIZE IMAGE
// ==========================


const image =

await optimizeImage(file);






document
.getElementById(
"preview"
)
.innerHTML =

`

<img src="${image}">

`;







document
.getElementById(
"result"
)
.innerHTML =

`

<h3>
🤖 FashionAI analysing...
</h3>

`;








// ==========================
// AI ANALYSIS
// ==========================


const ai =

await analyzeClothing(
image
);







console.log(
"AI RESULT",
ai
);









// ==========================
// CLOTHING OBJECT
// ==========================


const clothing = {


image:image,



name:

ai.name ||

ai.type ||

"Unknown Clothing",



type:

ai.type ||

"Clothing",



category:

normalizeCategory(
ai.category
),



color:

ai.primaryColor ||

ai.color ||

"Unknown",



material:

ai.material ||

"Unknown",



pattern:

ai.pattern ||

"Plain",



style:

ai.style ||

"Casual",



occasion:

Array.isArray(ai.occasions)

?

ai.occasions.join(", ")

:

(ai.occasion || "Daily Wear"),



season:

Array.isArray(ai.season)

?

ai.season.join(", ")

:

(ai.season || "All Season"),



brand:

ai.brand ||

"Unknown",



confidence:

Number(
ai.confidence
)||0,



favorite:false,



timesWorn:0,



laundryStatus:"Clean",



createdAt:

Date.now()


};









// ==========================
// SAVE
// ==========================


await addClothing(

database,

clothing

);








// ==========================
// REFRESH WARDROBE
// ==========================


window.dispatchEvent(

new Event(
"clothingAdded"
)

);







document
.getElementById(
"result"
)
.innerHTML =


`

<h2>
✅ Clothing Saved
</h2>


<p>
<b>Name:</b>
${clothing.name}
</p>


<p>
<b>Category:</b>
${clothing.category}
</p>


<p>
<b>Color:</b>
${clothing.color}
</p>


<p>
<b>Style:</b>
${clothing.style}
</p>


<p>
<b>Confidence:</b>
${clothing.confidence}%
</p>


`;





}

catch(error){


console.error(
"Upload Error",
error
);



document
.getElementById(
"result"
)
.innerHTML =


`

<h2>
❌ Upload Failed
</h2>


<p>
${error.message}
</p>

`;



}



};



}









// ==========================
// CATEGORY CLEANER
// ==========================


function normalizeCategory(category){


if(!category){

return "Other";

}



category =
category.toLowerCase();





if(

category.includes("shirt")

||

category.includes("top")

||

category.includes("blouse")

||

category.includes("tshirt")

){


return "Top";


}







if(

category.includes("pant")

||

category.includes("jean")

||

category.includes("trouser")

||

category.includes("skirt")

){


return "Bottom";


}







if(

category.includes("shoe")

||

category.includes("sneaker")

||

category.includes("boot")

){


return "Shoes";


}







if(

category.includes("dress")

){


return "Dress";


}





if(

category.includes("jacket")

||

category.includes("coat")

){


return "Outerwear";


}





return "Other";


}
