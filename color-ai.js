// color-ai.js

export function checkColorMatch(colors){


    let score = 70;

    let advice = "Colors are balanced.";



    // Remove empty values

    colors = colors.filter(color => color);



    if(colors.length === 0){

        return {

            score:50,

            advice:"Add clothing colors for better AI matching."

        };

    }



    const combo =
    colors.join(" ").toLowerCase();





    if(
    combo.includes("white") &&
    combo.includes("blue")
    ){

        score = 95;

        advice =
        "🤍💙 White and blue create a clean classic look.";

    }



    else if(
    combo.includes("black") &&
    combo.includes("gold")
    ){

        score = 98;

        advice =
        "🖤✨ Black and gold gives a luxury style.";

    }



    else if(
    combo.includes("beige") &&
    combo.includes("brown")
    ){

        score = 92;

        advice =
        "🤎 Earth tones create an elegant outfit.";

    }



    else if(
    combo.includes("red") &&
    combo.includes("black")
    ){

        score = 90;

        advice =
        "❤️🖤 Red and black create a bold look.";

    }



    else if(
    combo.includes("black")
    ){

        score = 85;

        advice =
        "Black is versatile and matches many styles.";

    }



    else if(
    combo.includes("white")
    ){

        score = 85;

        advice =
        "White gives a clean and fresh appearance.";

    }



    else{

        score = 80;

        advice =
        "Colors are balanced. Add matching accessories.";

    }





    return {

        score: score,

        advice: advice

    };


}
