// location.js
// FashionAI User Location Intelligence



export function getUserLocation(){


return new Promise((resolve,reject)=>{


if(!navigator.geolocation){


reject(
"Location not supported"
);


return;


}





navigator.geolocation.getCurrentPosition(


(position)=>{


resolve({


latitude:
position.coords.latitude,


longitude:
position.coords.longitude



});


},



(error)=>{


console.error(error);



reject(error);


},



{


enableHighAccuracy:true,


timeout:10000


}



);



});


}
