// tryon.js


const personInput =
document.getElementById("personImage");


const clothInput =
document.getElementById("clothImage");




personInput.onchange = ()=>{


const img =
document.getElementById("personPreview");


img.src =
URL.createObjectURL(
personInput.files[0]
);


};





clothInput.onchange = ()=>{


const img =
document.getElementById("clothPreview");


img.src =
URL.createObjectURL(
clothInput.files[0]
);


};





window.generateTryOn = async function(){



const person =
personInput.files[0];


const cloth =
clothInput.files[0];



const loading =
document.getElementById("loading");




if(!person || !cloth){


alert(
"Please upload your photo and clothes"
);


return;


}



loading.innerHTML =
"🤖 AI is designing your outfit...";





/*

HERE WE SEND:

1. PERSON PHOTO
2. CLOTHING PHOTO

TO AI VIRTUAL TRY-ON API


Example:

Firebase Function
       |
       |
AI Image Model
       |
       |
Generated dressed image


*/





loading.innerHTML =
"AI connection is ready. Add your image model API here.";





};
