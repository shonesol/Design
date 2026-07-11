// upload.js
// FashionAI Upload & Clothing Recognition


import { auth } from "./firebase.js";


import {
onAuthStateChanged
}
from
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
addClothing
}
from "./db.js";


import {
getDatabase
}
from "./database-manager.js";


import {
optimizeImage
}
from "./image-preprocessor.js";


// AI clothing recognition

import {
analyzeClothing
}
from "./clothing-ai.js";




// ==========================
// VARIABLES
// ==========================


let user = null;

let database = null;





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


database = await getDatabase();



console.log(
"✅ FashionAI Upload Database Ready"
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


const uploadButton =

document.getElementById(
"uploadBtn"
);






if(uploadButton){



uploadButton.onclick = async()=>{



try{



if(!user){


alert(
"Please login first"
);


return;


}




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
"Choose a clothing image"
);


return;


}







// ==========================
// OPTIMIZE IMAGE
// ==========================


const image =

await optimizeImage(file);







const preview =

document.getElementById(
"preview"
);



if(preview){


preview.innerHTML =

`

<img 

src="${image}"

width="220"

>

`;



}








const result =

document.getElementById(
"result"
);



if(result){


result.innerHTML =

`

<h3>
🤖 FashionAI analysing clothing...
</h3>

`;

}





// ==========================
// AI ANALYSIS
// ==========================


let ai;



try{


ai = await analyzeClothing(

image

);


}

catch(error){


console.error(
"AI Error:",
error
);


throw new Error(
"AI could not analyse image"
);


}









// ==========================
// CREATE CLOTHING OBJECT
// ==========================


const clothing = {


image,


name:

ai.name ||

"Unknown Clothing",



type:

ai.type ||

"Unknown",




category:

normalizeCategory(

ai.category

),




color:

ai.primaryColor ||

"Unknown",




secondaryColor:

ai.secondaryColor ||

"",




material:

ai.material ||

ai.fabric ||

"Unknown",




texture:

ai.texture ||

"",




pattern:

ai.pattern ||

"Plain",




style:

ai.style ||

"Casual",




formality:

ai.formality ||

"",




occasion:

Array.isArray(ai.occasions)

?

ai.occasions.join(", ")

:

"Daily Wear",




season:

Array.isArray(ai.season)

?

ai.season.join(", ")

:

"All Season",




weatherSuitability:

Array.isArray(ai.weatherSuitability)

?

ai.weatherSuitability.join(", ")

:

"",




matchingColors:

Array.isArray(ai.matchingColors)

?

ai.matchingColors.join(", ")

:

"",




fashionTips:

ai.fashionTips ||

"",




brand:

ai.brand ||

"Unknown",




confidence:

Number(ai.confidence)

|| 0,




favorite:false,



timesWorn:0,



laundryStatus:"Clean",



createdAt:

Date.now()



};









// ==========================
// SAVE TO DATABASE
// ==========================


await addClothing(

database,

clothing

);









// ==========================
// SUCCESS MESSAGE
// ==========================


if(result){


result.innerHTML =

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
<b>Color:</b>
${clothing.color}
</p>


<p>
<b>Style:</b>
${clothing.style}
</p>


<p>
<b>Material:</b>
${clothing.material}
</p>


<p>
<b>Occasion:</b>
${clothing.occasion}
</p>


<p>
<b>Laundry:</b>
${clothing.laundryStatus}
</p>


<p>
<b>AI Confidence:</b>
${clothing.confidence}%
</p>


`;



}




}

catch(error){


console.error(
"Upload Failed:",
error
);



const result =

document.getElementById(
"result"
);



if(result){


result.innerHTML =

`

<h2>
❌ Upload Failed
</h2>


<p>

${error.message}

</p>

`;



}



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

category.includes("shirt")

||

category.includes("top")

||

category.includes("blouse")

||

category.includes("t-shirt")

||

category.includes("tshirt")

){

return "Top";

}






if(

category.includes("jean")

||

category.includes("pant")

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
