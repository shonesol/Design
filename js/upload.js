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
// LOGIN
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



database = await getDatabase(

user.uid

);



console.log(
"✅ Upload Database Ready"
);



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
"Choose clothing image"
);


return;


}





// Optimize image


const image =

await optimizeImage(file);






document
.getElementById(
"preview"
)
.innerHTML =

`

<img src="${image}" width="220">

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








// AI ANALYSIS


const ai =

await analyzeClothing(

image

);









// CREATE CLOTHING OBJECT


const clothing = {


image,


name:

ai.name ||

"Unknown Clothing",



type:

ai.type ||

"",




category:

normalizeCategory(

ai.category

),




color:

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

ai.occasion ||

"Daily Wear",




season:

ai.season ||

"All Season",




brand:

ai.brand ||

"Unknown",




confidence:

Number(

ai.confidence

)

|| 0,





favorite:false,



timesWorn:0,



laundryStatus:"Clean",



createdAt:Date.now()



};








await addClothing(

database,

clothing

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
Name: ${clothing.name}
</p>


<p>
Category: ${clothing.category}
</p>


<p>
Color: ${clothing.color}
</p>


<p>
Style: ${clothing.style}
</p>


<p>
Laundry: ${clothing.laundryStatus}
</p>


`;




}

catch(error){


console.error(
"Upload Error:",
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
// CATEGORY NORMALIZER
// ==========================


function normalizeCategory(category){



if(!category)

return "Other";



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

)

return "Top";





if(

category.includes("jean")

||

category.includes("pant")

||

category.includes("trouser")

||

category.includes("skirt")

)

return "Bottom";






if(

category.includes("shoe")

||

category.includes("sneaker")

||

category.includes("boot")

)

return "Shoes";







if(

category.includes("dress")

)

return "Dress";





return "Other";

}
