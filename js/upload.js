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



try{


database = await getDatabase(

user.uid

);


console.log(
"✅ Upload Database Ready"
);



}

catch(error){


console.error(
"Database Error:",
error
);


}



}

);








// ==========================
// UPLOAD BUTTON
// ==========================


const uploadBtn = document.getElementById(
"uploadBtn"
);



if(uploadBtn){



uploadBtn.onclick = async()=>{


try{



if(!database){


alert(
"Database not ready. Login first."
);


return;


}




const file = document
.getElementById(
"clothingImage"
)
.files[0];




if(!file){


alert(
"Select clothing image"
);


return;


}





// IMAGE PROCESSING

const image = await optimizeImage(file);





document.getElementById(
"preview"
).innerHTML =

`

<img src="${image}" width="220">

`;





document.getElementById(
"result"
).innerHTML =

`

<h3>
🤖 FashionAI analysing...
</h3>

`;






// ==========================
// GEMINI ANALYSIS
// ==========================


const ai = await analyzeClothing(
image
);



console.log(
"AI RESPONSE:",
ai
);






// ==========================
// SAVE OBJECT
// ==========================


const clothing = {


image:image,


name:
ai.type || "Unknown Clothing",



type:
ai.type || "Unknown",



category:
normalizeCategory(
ai.category
),



color:
ai.primaryColor || "Unknown",



secondaryColor:
ai.secondaryColor || "",



material:
ai.material || "Unknown",



pattern:
ai.pattern || "Plain",



style:
ai.style || "Casual",



occasion:

Array.isArray(ai.occasions)

?

ai.occasions.join(",")

:

"Daily Wear",




season:

Array.isArray(ai.season)

?

ai.season.join(",")

:

"All Season",




confidence:

Number(ai.confidence)||0,



favorite:false,



timesWorn:0,



laundryStatus:"Clean",



createdAt:Date.now()

};






// SAVE TO PHONE DATABASE


await addClothing(

database,

clothing

);







document.getElementById(
"result"
).innerHTML =


`

<h2>
✅ Saved Successfully
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
<b>AI Confidence:</b>
${clothing.confidence}%
</p>


`;



window.dispatchEvent(
new Event("clothingAdded")
);



}

catch(error){


console.error(
"UPLOAD ERROR:",
error
);



document.getElementById(
"result"
).innerHTML =


`

<h3>
❌ Upload Failed
</h3>

<p>
${error.message}
</p>

`;



}



};



}








// ==========================
// CATEGORY NORMALIZER
// ==========================


function normalizeCategory(category){


if(!category){

return "Other";

}


category =
category.toLowerCase();



if(
category.includes("shirt") ||
category.includes("top") ||
category.includes("blouse")
){

return "Top";

}




if(
category.includes("pant") ||
category.includes("jean") ||
category.includes("trouser") ||
category.includes("skirt")
){

return "Bottom";

}




if(
category.includes("shoe") ||
category.includes("sneaker")
){

return "Shoes";

}




if(
category.includes("dress")
){

return "Dress";

}




if(
category.includes("jacket") ||
category.includes("coat")
){

return "Outerwear";

}



return "Other";


}
