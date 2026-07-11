// FashionAI Backup & Restore System


import {
getClothes,
getWearHistory,
getFeedback,
addClothing
}
from "./db.js";




// =================================
// EXPORT USER DATA
// =================================


export async function exportFashionAI(

database

){



const wardrobe =

await getClothes(
database
);



const history =

await getWearHistory(
database
);



const feedback =

await getFeedback(
database
);





const backup = {


version:1,


created:

new Date()
.toISOString(),



wardrobe,


history,


feedback



};






const file =

new Blob(

[
JSON.stringify(
backup,
null,
2
)
],

{
type:"application/json"
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



link.download=

"FashionAI_Backup.json";



link.click();





URL.revokeObjectURL(
url
);



}









// =================================
// IMPORT USER DATA
// =================================


export function importFashionAI(

database,

file

){


return new Promise((resolve,reject)=>{


const reader =

new FileReader();





reader.onload = async()=>{


try{


const backup =

JSON.parse(
reader.result
);





for(
const item of backup.wardrobe
){


await addClothing(

database,

item

);


}





resolve(true);



}

catch(error){


reject(error);


}



};





reader.onerror=()=>{


reject(
reader.error
);


};



reader.readAsText(file);



});


}
