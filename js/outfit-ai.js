// outfit-ai.js
// FashionAI Smart Outfit Recommendation Engine


import {
    getClothes
} from "./db.js";




// ==========================
// COLOR COMPATIBILITY
// ==========================


function colorCompatibility(a,b){


if(!a || !b)
return 50;



a=a.toLowerCase();
b=b.toLowerCase();



// Same color

if(a===b)
return 85;



const matches={


black:[
"white",
"grey",
"red",
"gold",
"blue"
],


white:[
"black",
"blue",
"grey",
"brown"
],


navy:[
"white",
"beige",
"grey",
"brown"
],


blue:[
"white",
"black",
"grey",
"khaki"
],


brown:[
"beige",
"white",
"blue",
"green"
],


grey:[
"black",
"white",
"blue"
]

};



if(
matches[a] &&
matches[a].includes(b)
)

return 95;



return 60;


}






// ==========================
// STYLE MATCH
// ==========================


function styleScore(a,b){


if(!a || !b)
return 50;


if(
a.toLowerCase()
===
b.toLowerCase()
)

return 100;



return 70;


}






// ==========================
// OCCASION SCORE
// ==========================


function occasionScore(item,occasion){


if(!item.occasions)
return 50;



if(
item.occasions
.includes(occasion)
)

return 100;


return 60;

}






// ==========================
// CREATE SCORE
// ==========================


function calculateOutfitScore(
top,
bottom,
shoe
){



let score=0;



// COLOR

score +=
colorCompatibility(
top.primaryColor,
bottom.primaryColor
);



score +=
colorCompatibility(
bottom.primaryColor,
shoe.primaryColor
);




// STYLE

score +=
styleScore(
top.style,
bottom.style
);



score +=
styleScore(
bottom.style,
shoe.style
);




return Math.round(
score/4
);



}







// ==========================
// GENERATE OUTFITS
// ==========================


export async function generateOutfits(
database,
occasion="Casual"
){



const clothes =
await getClothes(
database
);





const available =
clothes.filter(
item=>
item.laundryStatus !== "Dirty"
);







const tops =
available.filter(
item=>
item.category==="Top"
);





const bottoms =
available.filter(
item=>
item.category==="Bottom"
);





const shoes =
available.filter(
item=>
item.category==="Shoes"
);






let outfits=[];





tops.forEach(top=>{


bottoms.forEach(bottom=>{


shoes.forEach(shoe=>{



const score =
calculateOutfitScore(
top,
bottom,
shoe
);



outfits.push({

top,
bottom,
shoe,

score

});



});


});


});







return outfits
.sort(
(a,b)=>
b.score-a.score
)
.slice(0,10);



}
