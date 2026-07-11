// backup-manager.js
// FashionAI Backup & Restore Engine


// ==========================
// EXPORT DATABASE
// ==========================


export async function exportFashionAI(database){


const data = {};



const stores = [

"wardrobe",

"history",

"outfits",

"feedback",

"preferences"

];





for(const storeName of stores){



data[storeName] = await getStoreData(

database,

storeName

);



}






const backupFile = {

app:"FashionAI",

version:1,

createdAt:new Date().toISOString(),

data:data

};







const blob = new Blob(

[

JSON.stringify(

backupFile,

null,

2

)

],

{

type:"application/json"

}

);







const url = URL.createObjectURL(blob);






const link = document.createElement("a");


link.href=url;


link.download=

"FashionAI_Backup.json";



link.click();






URL.revokeObjectURL(url);





alert(
"✅ FashionAI backup created"
);



}









// ==========================
// IMPORT DATABASE
// ==========================


export async function importFashionAI(

database,

file

){



const text =

await file.text();





const backup =

JSON.parse(text);







if(
!backup.data
){


throw new Error(
"Invalid FashionAI backup"
);


}






for(
const storeName in backup.data
){



await saveStoreData(

database,

storeName,

backup.data[storeName]

);



}





}









// ==========================
// READ STORE
// ==========================


function getStoreData(

database,

storeName

){



return new Promise((resolve,reject)=>{



const transaction =

database.transaction(

storeName,

"readonly"

);



const store =

transaction.objectStore(

storeName

);



const request =

store.getAll();





request.onsuccess=()=>{


resolve(
request.result
);


};





request.onerror=()=>{


reject(
request.error
);


};



});



}









// ==========================
// WRITE STORE
// ==========================


function saveStoreData(

database,

storeName,

items

){



return new Promise((resolve,reject)=>{



const transaction =

database.transaction(

storeName,

"readwrite"

);



const store =

transaction.objectStore(

storeName

);





// clear old data

store.clear();






items.forEach(item=>{


store.put(item);


});






transaction.oncomplete=()=>{


resolve(true);


};





transaction.onerror=()=>{


reject(
transaction.error
);


};



});



}
