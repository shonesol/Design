// backup-restore.js
// FashionAI Backup & Restore Engine


import {
getClothes,
getWearHistory,
getSavedOutfits
}
from "./db.js";






// ==========================
// EXPORT FASHIONAI DATA
// ==========================


export async function exportFashionAI(db){



const wardrobe =

await getClothes(
db
);




const history =

await getWearHistory(
db
);




const outfits =

await getSavedOutfits(
db
);







const backup = {


app:
"FashionAI",


version:
"1.0",



createdAt:
new Date()
.toISOString(),



wardrobe,


history,


outfits


};







const file = new Blob(

[
JSON.stringify(
backup,
null,
2
)
],

{
type:
"application/json"
}

);






const url =

URL.createObjectURL(
file
);







const link =

document.createElement(
"a"
);



link.href=url;


link.download =
"FashionAI_Backup.json";



link.click();






URL.revokeObjectURL(url);



}









// ==========================
// RESTORE DATA
// ==========================


export async function importFashionAI(

db,

file

){



return new Promise((resolve,reject)=>{



const reader =
new FileReader();






reader.onload =
async()=>{


try{



const data =

JSON.parse(
reader.result
);






// RESTORE WARDROBE


if(
data.wardrobe
){


for(
const item of data.wardrobe
){



const transaction =

db.transaction(
"wardrobe",
"readwrite"
);



transaction
.objectStore(
"wardrobe"
)
.add(item);



}

}




// RESTORE HISTORY


if(
data.history
){



for(
const item of data.history
){



const transaction =

db.transaction(
"history",
"readwrite"
);



transaction
.objectStore(
"history"
)
.add(item);



}

}





// RESTORE OUTFITS


if(
data.outfits
){



for(
const item of data.outfits
){



const transaction =

db.transaction(
"outfits",
"readwrite"
);



transaction
.objectStore(
"outfits"
)
.add(item);



}

}






resolve(true);



}

catch(error){


reject(error);


}



};







reader.readAsText(file);



});



}
