// upload.js
// FashionAI Upload & AI Recognition Engine


import {
askGemini
}
from "./gemini.js";


import {
FASHION_VISION_PROMPT
}
from "./fashion-vision-prompt.js";


import {
optimizeImage
}
from "./image-preprocessor.js";


import {
addClothing
}
from "./db.js";


import {
getDatabase
}
from "./database-manager.js";

import {
exportFashionAI
}
from "./backup-manager.js";



let database = null;





// ==========================
// CONNECT DATABASE
// ==========================


database =
await getDatabase();



console.log(
"✅ FashionAI Upload Database Ready"
);







// ==========================
// UPLOAD BUTTON
// ==========================


const button =
document.getElementById(
"uploadBtn"
);





button.onclick =
async()=>{



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
"Choose a clothing image."
);


return;


}






// ==========================
// IMAGE OPTIMIZATION
// ==========================


const image =

await optimizeImage(
file
);







// PREVIEW


document
.getElementById(
"preview"
)
.innerHTML =


`

<img 
src="${image}" 
width="220">

`;







document
.getElementById(
"result"
)
.innerHTML =


`

<h3>
🤖 FashionAI Vision Pro
</h3>

<p>
Analyzing clothing...
</p>

`;








try{



const answer =

await askGemini(

FASHION_VISION_PROMPT,

image

);







let ai;



try{


ai =
JSON.parse(answer);


}

catch(error){


console.log(answer);


throw new Error(
"AI returned invalid JSON"
);


}









// ==========================
// NORMALIZE CLOTHING DATA
// ==========================


const clothing = {


image,


name:
ai.name || "Unknown",



type:
ai.type || "Unknown",



category:
ai.category || "Unknown",



subcategory:
ai.subcategory || "",




color:

ai.primaryColor ||

ai.color ||

"Unknown",





secondaryColor:

Array.isArray(ai.secondaryColors)

?

ai.secondaryColors.join(", ")

:

(ai.secondaryColor || ""),






pattern:

ai.pattern || "Plain",





material:

ai.material || "Unknown",




texture:

ai.texture || "",




fit:

ai.fit || "",




style:

ai.style || "Casual",





occasion:

ai.occasion || "Daily Wear",




season:

ai.season || "All Seasons",




brand:

ai.brand || "Unknown",





countryStyle:

ai.countryStyle || "",





traditionalWear:

ai.traditionalWear || false,




gender:

ai.gender || "Unisex",




confidence:

Number(ai.confidence) || 0,





favorite:false,


timesWorn:0,



laundryStatus:

"Clean",




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



await exportFashionAI(
database
);



// ==========================
// RESULT
// ==========================


document
.getElementById(
"result"
)
.innerHTML =


`

<h2>
✅ Clothing Saved Successfully
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
<b>Type:</b>
${clothing.type}
</p>


<p>
<b>Color:</b>
${clothing.color}
</p>


<p>
<b>Material:</b>
${clothing.material}
</p>


<p>
<b>Style:</b>
${clothing.style}
</p>


<p>
<b>Occasion:</b>
${clothing.occasion}
</p>


<p>
<b>Season:</b>
${clothing.season}
</p>


<p>
<b>Confidence:</b>
${clothing.confidence}%
</p>

`;






}

catch(error){


console.error(
"FashionAI Upload Error:",
error
);



document
.getElementById(
"result"
)
.innerHTML =


`

<h2>
❌ AI Error
</h2>


<p>
FashionAI could not analyze this image.
</p>


`;



}

};
