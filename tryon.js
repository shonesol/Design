let userPhoto;



// OPEN CAMERA

window.startCamera=function(){


const video =
document.getElementById("camera");



navigator.mediaDevices
.getUserMedia({

video:true

})

.then(stream=>{


video.srcObject=stream;


})

.catch(()=>{

alert(
"Camera permission denied"
);

});


};





// TRY ON PREVIEW


window.tryOn=function(){


const video =
document.getElementById("camera");


const cloth =
document.getElementById("clothImage")
.files[0];



if(!cloth){

alert("Select clothes first");

return;

}




const img =
document.createElement("img");



img.src =
URL.createObjectURL(cloth);



img.style.width="200px";


img.style.position="absolute";

img.style.top="150px";

img.style.left="80px";



document
.getElementById("preview")
.appendChild(img);



alert(
"Basic try-on preview created"
);



};
