// feedback-ai.js

import {
saveFeedback,
getFeedback
}
from "./db.js";



// User likes outfit

export async function likeOutfit(
db,
outfit
){

await saveFeedback(db,{

type:"like",

outfit,

date:Date.now()

});

}




// User dislikes outfit

export async function dislikeOutfit(
db,
outfit
){

await saveFeedback(db,{

type:"dislike",

outfit,

date:Date.now()

});

}




// Read all feedback

export async function getLearningData(db){

const data =
await getFeedback(db);

return data;

}
