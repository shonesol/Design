

// gemini.js

const GEMINI_API_KEY = "AIzaSyBoEegr5WWmivKvgmct594OK7guPSoc9vY";


export async function askGemini(prompt) {

    try {


        const response = await fetch(

            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },


                body: JSON.stringify({

                    contents: [

                        {

                            parts: [

                                {

                                    text: prompt

                                }

                            ]

                        }

                    ],

                    generationConfig: {

                        temperature: 0.7,

                        maxOutputTokens: 500

                    }

                })

            }

        );



        const data = await response.json();



        if(!response.ok){

            console.error("Gemini Error:", data);

            return "Gemini error: " + 
            (data.error?.message || "Unknown error");

        }



        if(
            !data.candidates ||
            data.candidates.length === 0
        ){

            return "No response from Gemini.";

        }



        return (
            data
            .candidates[0]
            .content
            .parts[0]
            .text
        );



    }

    catch(error){


        console.error(
            "Connection error:",
            error
        );


        return "Unable to connect to Gemini AI.";

    }

}
