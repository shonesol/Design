// gemini.js
// FashionAI Gemini Connection


const GEMINI_API_KEY = "YOUR_API_KEY_HERE";


const MODEL =
"gemini-1.5-flash";



export async function askGemini(

prompt,

imageBase64

){


const response = await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,

{


method:"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({


contents:[


{


parts:[


{

text:prompt

},



{


inline_data:{


mime_type:"image/jpeg",


data:

imageBase64.split(",")[1]


}


}


]


}


]


})



}

);



const data = await response.json();



if(

data.error

){

throw new Error(

data.error.message

);

}



return data

.candidates[0]

.content

.parts[0]

.text;



}
