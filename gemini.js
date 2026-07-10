// gemini.js

const GEMINI_API_KEY = "YOUR_NEW_GEMINI_API_KEY";



export async function askGemini(prompt, imageBase64 = null) {


try {


let parts = [

{
text: prompt
}

];




// ADD IMAGE FOR VISION AI

if(imageBase64){


const base64Data =
imageBase64.split(",")[1];



parts.push({

inline_data:{

mime_type:"image/jpeg",

data:base64Data

}

});


}





const response = await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,

{


method:"POST",


headers:{


"Content-Type":"application/json"


},



body:JSON.stringify({


contents:[

{

parts:parts

}

],



generationConfig:{


temperature:0.4,


maxOutputTokens:1000,


topP:0.9,


topK:40


},



safetySettings:[


{

category:"HARM_CATEGORY_HARASSMENT",

threshold:"BLOCK_NONE"

},


{

category:"HARM_CATEGORY_HATE_SPEECH",

threshold:"BLOCK_NONE"

},


{

category:"HARM_CATEGORY_DANGEROUS_CONTENT",

threshold:"BLOCK_NONE"

}


]


})


}

);





const data =
await response.json();





if(!response.ok){


console.error(
"Gemini API Error:",
data
);



return "AI Error: "+
(data.error?.message ||
"Unknown error");


}







if(
!data.candidates ||
data.candidates.length===0
){


return "No AI response";


}






let answer =
data
.candidates[0]
.content
.parts[0]
.text;






return answer.trim();





}

catch(error){


console.error(
"Gemini Connection Error:",
error
);



return "AI connection failed";


}


}
