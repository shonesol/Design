// gemini.js
// FashionAI Secure Gemini Connection


const AI_SERVER =

"https://fashionai-api.shonesol28.workers.dev/";




export async function askGemini(

prompt,

imageBase64=null

){


const response = await fetch(

AI_SERVER,

{


method:"POST",


headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

prompt,

image:imageBase64

})


}

);




const data = await response.json();



if(data.error){

throw new Error(
data.error
);

}



return data.result;


}
