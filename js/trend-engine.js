// trend-engine.js
// FashionAI Trend Intelligence Engine


// ==========================
// STYLE DATABASE
// ==========================


const styleProfiles = {


"business casual":{

keywords:[
"blazer",
"shirt",
"chinos",
"loafers",
"clean sneakers"
],

modernScore:90

},



"streetwear":{

keywords:[
"hoodie",
"sneakers",
"cargo pants",
"oversized"
],

modernScore:95

},



"minimalist":{

keywords:[
"neutral colors",
"simple designs",
"clean fit"
],

modernScore:90

},



"old money":{

keywords:[
"linen",
"polo",
"blazer",
"loafers",
"cream",
"beige"
],

modernScore:95

},



"smart casual":{

keywords:[
"jeans",
"shirt",
"jacket",
"sneakers"
],

modernScore:92

}


};





// ==========================
// ANALYZE STYLE TREND
// ==========================


export function analyzeTrend(outfit){


let score = 50;

let reasons=[];




const text = outfit
.map(item=>{


return (

(item.type || "")+
" "+
(item.style || "")+
" "+
(item.material || "")

.toLowerCase()

);


})
.join(" ");






for(
let style in styleProfiles
){


const profile =
styleProfiles[style];



profile.keywords.forEach(word=>{


if(text.includes(word)){


score +=5;


reasons.push(
`${word} matches ${style} fashion`
);


}


});


}






if(score>100)
score=100;




return {


trendScore:score,


status:
score>=85
?
"Very fashionable"
:
score>=70
?
"Modern"
:
"Classic",


reasons:reasons.slice(0,5)


};



}
