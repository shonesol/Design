// style-learning.js
// FashionAI User Style Intelligence



// ==========================
// ANALYZE USER STYLE
// ==========================


export async function analyzeUserStyle(

database

){



const profile =

await getPreference(

database

);






if(!profile){



return {


fashionPersonality:"Explorer",


favoriteColors:[],


favoriteStyles:[],


favoriteOccasions:[],


confidence:0



};



}








const personality =

detectFashionPersonality(

profile

);







return {


fashionPersonality:personality,


favoriteColors:

profile.favoriteColors || [],



favoriteStyles:

profile.favoriteStyles || [],



favoriteOccasions:

profile.favoriteOccasions || [],



confidence:

calculateConfidence(

profile

)



};



}









// ==========================
// GET AI PROFILE
// ==========================


function getPreference(

database

){



return new Promise((resolve,reject)=>{



const transaction =

database.transaction(

"preferences",

"readonly"

);



const store =

transaction.objectStore(

"preferences"

);




const request =

store.get(

"userProfile"

);





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
// DETECT PERSONALITY
// ==========================


function detectFashionPersonality(

profile

){



const styles =

profile.favoriteStyles || [];






if(
styles.includes("Luxury")

){


return "Luxury Fashion Lover";


}





if(
styles.includes("Streetwear")

){


return "Urban Trendsetter";


}





if(
styles.includes("Traditional")

){


return "Cultural Fashion Explorer";


}





if(
styles.includes("Formal")

){


return "Professional Elegant";


}





if(
styles.includes("Casual")

){


return "Comfort Fashion Lover";


}





return "Balanced Fashion Explorer";



}









// ==========================
// CONFIDENCE SCORE
// ==========================


function calculateConfidence(

profile

){



let score=0;



if(
profile.favoriteColors?.length
)

score+=30;



if(
profile.favoriteStyles?.length
)

score+=40;



if(
profile.favoriteOccasions?.length
)

score+=30;





return Math.min(

100,

score

);



}
// ==========================
// SAVE OUTFIT PLAN
// ==========================

export function saveOutfitPlan(
database,
plan
){

return new Promise((resolve,reject)=>{


const transaction =

database.transaction(
"plans",
"readwrite"
);



const store =

transaction.objectStore(
"plans"
);



const request =

store.add(plan);



request.onsuccess=()=>{

resolve(request.result);

};



request.onerror=()=>{

reject(request.error);

};



});


}





// ==========================
// GET ALL PLANS
// ==========================

export function getOutfitPlans(
database
){

return new Promise((resolve,reject)=>{


const transaction =

database.transaction(
"plans",
"readonly"
);



const store =

transaction.objectStore(
"plans"
);



const request =

store.getAll();



request.onsuccess=()=>{

resolve(
request.result || []
);

};



request.onerror=()=>{

reject(request.error);

};


});


}





// ==========================
// DELETE PLAN
// ==========================

export function deleteOutfitPlan(
database,
id
){

return new Promise((resolve,reject)=>{


const transaction =

database.transaction(
"plans",
"readwrite"
);



const store =

transaction.objectStore(
"plans"
);



const request =

store.delete(id);



request.onsuccess=()=>{

resolve();

};



request.onerror=()=>{

reject(request.error);

};



});


}
// ==========================
// SAVE WEAR HISTORY + UPDATE CLOTHES
// ==========================

export async function saveWearHistory(

database,

outfit

){


return new Promise((resolve,reject)=>{


const transaction =

database.transaction(

["history","wardrobe"],

"readwrite"

);



const historyStore =

transaction.objectStore(
"history"
);



const wardrobeStore =

transaction.objectStore(
"wardrobe"
);





const record = {


outfit,


date:

Date.now()


};





historyStore.add(record);






[
outfit.top,

outfit.bottom,

outfit.shoe

]
.forEach(item=>{


if(item.id){


const request =

wardrobeStore.get(
item.id
);



request.onsuccess=()=>{


const clothing =

request.result;



if(clothing){


clothing.timesWorn =

(clothing.timesWorn || 0) + 1;



clothing.lastWorn =

Date.now();



wardrobeStore.put(
clothing
);


}



};



}


});






transaction.oncomplete=()=>{


resolve();


};



transaction.onerror=()=>{


reject(
transaction.error
);


};



});


}
