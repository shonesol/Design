// FashionAI Feedback Analyzer


export function analyzeFeedback(feedback){


let liked=[];

let disliked=[];



feedback.forEach(item=>{


if(item.rating>=4){


liked.push(
item.outfit
);


}



if(item.rating<=2){


disliked.push(
item.outfit
);


}



});





return {


likedOutfits:
liked,


dislikedOutfits:
disliked,


learningMessage:

`
FashionAI learned your preferences.

You receive more recommendations similar to outfits you liked and fewer similar to rejected outfits.
`


};



}
