let cameraStream;


// OPEN CAMERA

window.startCamera = function(){

const video =
document.getElementById("camera");


navigator.mediaDevices
.getUserMedia({
    video:true
})

.then(stream=>{

cameraStream = stream;

video.srcObject = stream;

})

.catch(error=>{

console.error(error);

alert("Camera permission denied");

});

};




// TRY ON

window.tryOn = function(){


const cloth =
document
.getElementById("clothImage")
.files[0];


const preview =
document.getElementById("preview");



if(!cloth){

alert("Select clothes first");
return;

}



// Remove previous clothes

const oldCloth =
document.querySelector(".try-cloth");


if(oldCloth){

oldCloth.remove();

}



// Create clothing image

const img =
document.createElement("img");


img.src =
URL.createObjectURL(cloth);



img.className =
"try-cloth";



img.style.position =
"absolute";


img.style.width =
"220px";


img.style.top =
"130px";


img.style.left =
"50%";


img.style.transform =
"translateX(-50%)";


img.style.opacity =
"0.85";



preview.appendChild(img);


};
