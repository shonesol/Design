// ai-learning.js
// FashionAI User Preference Learning Engine


import {
getLearningData
}
from "./feedback-ai.js";



import {
getClothes
}
from "./db.js";





// ==========================
// LEARN USER FASHION
// ==========================


export async function learnUserFashion(

database

){



const feedback =

await getLearningData(

database

);





const clothes =

await getClothes(

database

);






let favoriteColors = [];

let favoriteStyles = [];

let favoriteOccasions = [];







// ==========================
// ANALYZE FEEDBACK
// ==========================


feedback.forEach(item=>{



if(
item.type==="like"
){



const outfit =
item.outfit;





collectData(

outfit.top.color,

favoriteColors

);



collectData(

outfit.bottom.color,

favoriteColors

);



collectData(

outfit.shoe.color,

favoriteColors

);






collectData(

outfit.top.style,

favoriteStyles

);



collectData(

outfit.bottom.style,

favoriteStyles

);



collectData(

outfit.shoe.style,

favoriteStyles

);






collectData(

outfit.top.occasion,

favoriteOccasions

);



}





if(
item.type==="dislike"
){



removeData(

item.outfit.top?.color,

favoriteColors

);



removeData(

item.outfit.top?.style,

favoriteStyles

);



}





});









// ==========================
// CREATE AI PROFILE
// ==========================


const profile = {


favoriteColors:


getTopResults(

favoriteColors

),




favoriteStyles:


getTopResults(

favoriteStyles

),




favoriteOccasions:


getTopResults(

favoriteOccasions

),




totalClothes:

clothes.length,




lastLearning:

Date.now()



};






await savePreference(

database,

profile

);






return profile;



}









// ==========================
// HELPERS
// ==========================


function collectData(

value,

array

){



if(!value) return;



const existing =

array.find(

item=>item.name===value

);




if(existing){


existing.count++;


}

else{


array.push({

name:value,

count:1

});


}



}









function removeData(

value,

array

){



if(!value) return;



const index =

array.findIndex(

item=>item.name===value

);



if(index>=0){


array[index].count--;


}


}









function getTopResults(

array

){



return array

.sort(

(a,b)=>

b.count-a.count

)

.slice(0,5)

.map(

item=>item.name

);



}









// ==========================
// SAVE AI PROFILE
// ==========================


function savePreference(

database,

profile

){



return new Promise((resolve,reject)=>{



const transaction =

database.transaction(

"preferences",

"readwrite"

);



const store =

transaction.objectStore(

"preferences"

);





store.put({

id:"userProfile",

...profile

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
