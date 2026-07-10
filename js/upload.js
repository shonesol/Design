import {auth} from "./firebase.js";


import {
onAuthStateChanged
}
from 
"https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
askGemini
}
from "./gemini.js";



let user=null;



onAuthStateChanged(
auth,
(current)=>{


user=current;


});





const button =
document.getElementById(
"uploadBtn"
);



button.onclick =
async()=>{


if(!user){

alert(
"Please login first"
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




const reader =
new FileReader();





reader.onload =
async()=>{


const image =
reader.result;



document
.getElementById(
"preview"
)
.innerHTML = `

<img src="${image}" width="200">

`;





const prompt = `


You are FashionAI Vision,
one of the world's best fashion recognition systems.


Analyze the clothing image carefully.


Identify:

1. Exact clothing name

Examples:

- Oxford shirt
- Polo shirt
- Blazer
- Hoodie
- Abaya
- Kimono
- Sari
- Kitenge dress
- Sneakers
- Loafers


2. Category

Use one:

Top
Bottom
Dress
Outerwear
Shoes
Accessories


3. Main color


4. Secondary colors


5. Pattern

Examples:

Plain
Striped
Floral
Checked
Printed
Geometric
Animal print


6. Fabric/material

Examples:

Cotton
Denim
Leather
Silk
Wool
Linen
Polyester


7. Style identity

Examples:

Casual
Smart Casual
Business
Luxury
Streetwear
Traditional
Minimalist
Old Money
Sporty


8. Occasion

Examples:

Office
Wedding
Travel
Party
Daily Wear


9. Season suitability


10. Gender style category


11. Fashion era/trend


Return ONLY valid JSON:


{
"name":"",
"type":"",
"category":"",
"color":"",
"secondaryColor":"",
"pattern":"",
"material":"",
"style":"",
"occasion":"",
"season":"",
"gender":"",
"trend":"",
"confidence":""
}


Do not explain.
Only JSON.

`;





const answer =
await askGemini(
prompt,
image
);





let clothing;



try{


clothing =
JSON.parse(
answer
);



}

catch(error){


console.log(
answer
);


alert(
"AI returned invalid data"
);


return;


}





saveClothing(
image,
clothing
);



};





reader.readAsDataURL(file);


};






// SAVE TO INDEXED DATABASE


function saveClothing(
image,
ai
){



const request =
indexedDB.open(
"FashionAI_"+user.uid,
1
);



request.onupgradeneeded =
e=>{


let db =
e.target.result;



if(
!db.objectStoreNames.contains(
"wardrobe"
)
){


db.createObjectStore(
"wardrobe",
{
keyPath:"id",
autoIncrement:true
}
);


}


};





request.onsuccess=e=>{


let db =
e.target.result;



let transaction =
db.transaction(
"wardrobe",
"readwrite"
);



let store =
transaction.objectStore(
"wardrobe"
);



store.add({


image:image,


...ai,


timesWorn:0,


laundryStatus:"Clean",


createdAt:
Date.now()


});



transaction.oncomplete=()=>{


document
.getElementById(
"result"
)
.innerHTML = `


<h3>
✅ Clothing Saved
</h3>


<p>
${ai.type}
</p>


<p>
🎨 ${ai.color}
</p>


<p>
✨ ${ai.style}
</p>


`;



};



};


}
