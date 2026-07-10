// color-engine.js
// FashionAI Color Intelligence


// ==========================
// COLOR DATABASE
// ==========================


const colorFamilies = {


black:{
    family:"neutral",
    matches:[
        "white",
        "grey",
        "red",
        "gold",
        "blue",
        "green"
    ]
},



white:{
    family:"neutral",
    matches:[
        "black",
        "navy",
        "grey",
        "brown",
        "beige"
    ]
},



navy:{
    family:"cool",
    matches:[
        "white",
        "beige",
        "grey",
        "brown"
    ]
},



blue:{
    family:"cool",
    matches:[
        "white",
        "grey",
        "black",
        "khaki"
    ]
},



red:{
    family:"warm",
    matches:[
        "black",
        "white",
        "grey",
        "navy"
    ]
},



green:{
    family:"natural",
    matches:[
        "brown",
        "beige",
        "white",
        "black"
    ]
},



brown:{
    family:"warm",
    matches:[
        "cream",
        "beige",
        "blue",
        "green"
    ]
},



grey:{
    family:"neutral",
    matches:[
        "black",
        "white",
        "navy",
        "blue"
    ]
},



beige:{
    family:"neutral",
    matches:[
        "white",
        "brown",
        "navy",
        "black"
    ]
}


};





// ==========================
// NORMALIZE COLORS
// ==========================


function cleanColor(color){

if(!color)
return "";


return color
.toLowerCase()
.trim()
.split(" ")[0];

}






// ==========================
// COLOR SCORE
// ==========================


export function colorMatch(
color1,
color2
){


color1 =
cleanColor(color1);



color2 =
cleanColor(color2);



if(
!colorFamilies[color1]
||
!colorFamilies[color2]
)

return 50;




if(color1===color2)
return 70;




if(
colorFamilies[color1]
.matches
.includes(color2)
)

return 95;




// same family

if(
colorFamilies[color1]
.family
===
colorFamilies[color2]
.family
)

return 80;



return 60;


}







// ==========================
// OUTFIT COLOR SCORE
// ==========================


export function outfitColorScore(
items
){


let total=0;

let count=0;



for(
let i=0;
i<items.length;
i++
){


for(
let j=i+1;
j<items.length;
j++
){


total +=
colorMatch(
items[i].primaryColor,
items[j].primaryColor
);


count++;


}

}


return Math.round(
total/count
);



}






// ==========================
// COLOR ADVICE
// ==========================


export function colorAdvice(items){


const score =
outfitColorScore(items);



if(score>=90){

return "Excellent color harmony. Fashion-forward combination.";

}



if(score>=75){

return "Good combination with balanced colors.";

}



if(score>=60){

return "Acceptable combination. Consider adding a neutral piece.";

}



return "Colors may clash. Try a neutral color to balance the outfit.";

}
