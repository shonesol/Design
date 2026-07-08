export function calculateOutfitScore(data){

    let scores = [];


    if(data.colorScore !== undefined){
        scores.push(data.colorScore);
    }


    if(data.weatherScore !== undefined){
        scores.push(data.weatherScore);
    }


    if(data.occasionScore !== undefined){
        scores.push(data.occasionScore);
    }


    if(data.styleScore !== undefined){
        scores.push(data.styleScore);
    }



    if(scores.length === 0){

        return {

            score:0,

            message:"No outfit data available."

        };

    }



    let total =
    scores.reduce(
        (sum,value)=>sum + value,
        0
    );



    let finalScore =
    Math.floor(total / scores.length);



    let message;



    if(finalScore >= 90){

        message =
        "🔥 Excellent outfit choice!";

    }

    else if(finalScore >= 75){

        message =
        "✨ Good combination.";

    }

    else if(finalScore >= 50){

        message =
        "👍 Decent outfit. Small improvements possible.";

    }

    else{

        message =
        "Try improving the color or style match.";

    }



    return {

        score: finalScore,

        message: message

    };

}
