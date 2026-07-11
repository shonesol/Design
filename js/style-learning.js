// style-learning.js
// FashionAI User Style Intelligence


import {
getLearningData
}
from "./feedback-ai.js";


import {
savePreference
}
from "./db.js";




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
// UPDATE STYLE MEMORY FROM FEEDBACK
// ==========================


export async function updateStyleMemory(

database

){



const feedback =

await getLearningData(

database

);





let colors = {};

let styles = {};

let occasions = {};






feedback.forEach(item=>{



if(item.type==="like"){



const outfit =

item.outfit;





[
outfit.top,

outfit.bottom,

outfit.shoe

]

.forEach(piece=>{



if(piece.color){



colors[piece.color] =

(colors[piece.color] || 0)+1;



}






if(piece.style){



styles[piece.style] =

(styles[piece.style] || 0)+1;



}



});



}



});








const profile = {



favoriteColors:

Object.keys(colors)

.sort(

(a,b)=>

colors[b]-colors[a]

)

.slice(0,5),





favoriteStyles:

Object.keys(styles)

.sort(

(a,b)=>

styles[b]-styles[a]

)

.slice(0,5),





favoriteOccasions:

Object.keys(occasions)

.sort(

(a,b)=>

occasions[b]-occasions[a]

)

.slice(0,5),





updatedAt:

Date.now()



};








await savePreference(

database,

"userProfile",

profile

);






return profile;



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



let score = 0;





if(

profile.favoriteColors?.length

)

score += 30;






if(

profile.favoriteStyles?.length

)

score += 40;






if(

profile.favoriteOccasions?.length

)

score += 30;







return Math.min(

100,

score

);



}
