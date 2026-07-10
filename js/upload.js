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


import {
openDatabase,
addClothing
}
from "./db.js";



let user = null;

let database = null;





// ==========================
// LOGIN CHECK
// ==========================

onAuthStateChanged(
auth,
async(current)=>{


if(current){


user=current;


database =
await openDatabase(
user.uid
);


console.log(
"FashionAI Database Ready"
);


}


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





document
.getElementById(
"result"
)
.innerHTML =
"🤖 FashionAI analyzing...";







const prompt = `


You are FashionAI Vision,
an advanced global fashion recognition AI.


Analyze this clothing image.


Return ONLY JSON.


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


Recognize worldwide fashion including:

African fashion,
Asian fashion,
European fashion,
traditional clothing,
modern clothing,
shoes and accessories.


`;







const answer =
await askGemini(
prompt,
image
);








let ai;



try{


ai =
JSON.parse(
answer
);



}

catch(error){


console.log(answer);


document
.getElementById(
"result"
)
.innerHTML =
"AI formatting error";


return;


}







// ==========================
// SAVE USING db.js
// ==========================


await addClothing(

database,

{


image:image,


...ai,


timesWorn:0,


favorite:false,


laundryStatus:"Clean",


createdAt:
Date.now()


}

);







document
.getElementById(
"result"
)
.innerHTML = `


<h3>
✅ Clothing Saved
</h3>


<p>
👕 ${ai.name}
</p>


<p>
🎨 ${ai.color}
</p>


<p>
✨ ${ai.style}
</p>


<p>
⭐ Confidence:
${ai.confidence}
</p>


`;





};






reader.readAsDataURL(file);



};
