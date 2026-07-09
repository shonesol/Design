// tryon.js


let stream;



// START CAMERA

window.startCamera = function(){


const video =
document.getElementById("camera");



navigator.mediaDevices
.getUserMedia({

video:{
facingMode:"user"
}

})

.then((cameraStream)=>{


stream = cameraStream;


video.srcObject =
cameraStream;


})


.catch((error)=>{


console.error(error);


alert(
"Camera permission denied"
);


});


};





// TRY ON CLOTHES


window.tryOn = function(){



const cloth =
document
.getElementById("clothImage")
.files[0];



const preview =
document
.getElementById("preview");




if(!cloth){


alert(
"Please upload clothes first"
);


return;


}





// Remove previous outfit

const oldCloth =
document.querySelector(".cloth-overlay");



if(oldCloth){

oldCloth.remove();

}






const img =
document.createElement("img");



img.src =
URL.createObjectURL(cloth);



img.className =
"cloth-overlay";




preview.appendChild(img);



};
