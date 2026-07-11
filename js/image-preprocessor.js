// image-preprocessor.js
// FashionAI Image Optimizer

export async function optimizeImage(file){

return new Promise((resolve)=>{

const reader = new FileReader();

reader.onload = ()=>{

const img = new Image();

img.onload = ()=>{

const canvas =
document.createElement("canvas");

const MAX_SIZE = 1024;

let width = img.width;
let height = img.height;



if(width > height){

if(width > MAX_SIZE){

height *= MAX_SIZE / width;
width = MAX_SIZE;

}

}else{

if(height > MAX_SIZE){

width *= MAX_SIZE / height;
height = MAX_SIZE;

}

}



canvas.width = width;
canvas.height = height;

const ctx =
canvas.getContext("2d");

ctx.drawImage(
img,
0,
0,
width,
height
);



resolve(

canvas.toDataURL(
"image/jpeg",
0.9
)

);

};



img.src = reader.result;

};



reader.readAsDataURL(file);

});

}
