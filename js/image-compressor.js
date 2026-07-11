// FashionAI Image Compression Engine


export function compressImage(

file,

maxWidth = 800,

quality = 0.7

){


return new Promise((resolve,reject)=>{


const reader =
new FileReader();



reader.onload = (event)=>{


const img =
new Image();



img.onload = ()=>{


const canvas =
document.createElement(
"canvas"
);



let width =
img.width;



let height =
img.height;





// Resize proportionally


if(width > maxWidth){


height =
height *
(maxWidth / width);



width =
maxWidth;


}




canvas.width =
width;


canvas.height =
height;





const ctx =
canvas.getContext(
"2d"
);



ctx.drawImage(

img,

0,

0,

width,

height

);







const compressed =

canvas.toDataURL(

"image/jpeg",

quality

);





resolve(
compressed
);



};





img.src =
event.target.result;



};





reader.onerror = ()=>{


reject(
reader.error
);


};



reader.readAsDataURL(file);



});


}
