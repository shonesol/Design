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
