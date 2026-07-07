export function calculateOutfitScore(data){

let score = 0;


// 🎨 COLOR SCORE

score += data.colorScore || 0;


// 🌦 WEATHER SCORE

score += data.weatherScore || 0;


// 🎯 OCCASION SCORE

score += data.occasionScore || 0;


// ❤️ USER STYLE SCORE

score += data.styleScore || 0;



// Total out of 100

let finalScore =
Math.floor(score / 4);



return {

score: finalScore,


message:

finalScore >= 90

?
"🔥 Excellent outfit choice!"

:

finalScore >= 75

?
"✨ Good combination."

:

"Try improving the color or style match."

};


}
