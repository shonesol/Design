// gemini.js
// FashionAI Gemini AI Connection


const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";



const GEMINI_MODEL =
"gemini-1.5-flash";





export async function askGemini(
prompt,
image
){



try{


const response =
await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`,

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
image.split(",")[1]

}

}

]

}

]

})


}

);





const data =
await response.json();





if(data.error){

throw new Error(
data.error.message
);

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

"Gemini Error:",

error

);


throw error;


}



}
