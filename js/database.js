// FashionAI Database Manager


export function openFashionDatabase(uid){


return new Promise((resolve,reject)=>{


const request =
indexedDB.open(
"FashionAI_"+uid,
2
);




request.onupgradeneeded=(event)=>{


const db =
event.target.result;



// CLOTHES

if(
!db.objectStoreNames.contains("wardrobe")
){

db.createObjectStore(
"wardrobe",
{
keyPath:"id",
autoIncrement:true
}

);

}





// GENERATED OUTFITS

if(
!db.objectStoreNames.contains("outfits")
){

db.createObjectStore(
"outfits",
{
keyPath:"id",
autoIncrement:true
}

);

}





// WEARING HISTORY

if(
!db.objectStoreNames.contains("history")
){

db.createObjectStore(
"history",
{
keyPath:"id",
autoIncrement:true
}

);

}





// USER FEEDBACK

if(
!db.objectStoreNames.contains("feedback")
){

db.createObjectStore(
"feedback",
{
keyPath:"id",
autoIncrement:true
}

);

}





// USER STYLE MEMORY

if(
!db.objectStoreNames.contains("style")
){

db.createObjectStore(
"style",
{
keyPath:"id"
}

);

}





// LAUNDRY

if(
!db.objectStoreNames.contains("laundry")
){

db.createObjectStore(
"laundry",
{
keyPath:"id"
}

);

}


};





request.onsuccess=(event)=>{


resolve(
event.target.result
);


};



request.onerror=(event)=>{


reject(
event.target.error
);


};



});


}
