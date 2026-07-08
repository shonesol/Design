export async function askGemini(prompt){

const API_KEY="YOUR_GEMINI_API_KEY";

const response=await fetch(

`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,

{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

contents:[

{

parts:[
{text:prompt}
]

}

]

})

}

);

const data=await response.json();

return data.candidates[0].content.parts[0].text;

}
