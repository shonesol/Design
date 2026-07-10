import {
askGemini
}
from "./gemini.js";



let userImage=null;



document
.getElementById("personImage")
.onchange=function(e){


const file =
e.target.files[0];



const reader =
new FileReader();



reader.onload=function(){


userImage =
reader.result;


};



reader.readAsDataURL(file);


};






document
.getElementById("tryBtn")
.onclick =
async()=>{


if(!userImage){


alert(
"Upload your photo first"
);


return;


}




const prompt = `


You are a professional virtual fashion stylist.


Analyze this person's photo.


Suggest how this outfit would look on them.


Consider:

- body proportions
- colors
- style balance
- occasion
- fashion trends


Give a detailed styling recommendation.


`;





const result =
await askGemini(
prompt,
userImage
);



document
.getElementById("result")
.innerHTML =
result;



};
