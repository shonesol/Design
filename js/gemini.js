// gemini.js
// FashionAI Secure Gemini Connection
// Frontend connects to Cloudflare Worker
// Gemini API key stays on Cloudflare


const AI_SERVER = 
"https://fashionai-api.shonesol28.workers.dev/";




// ==========================
// SEND REQUEST TO GEMINI
// ==========================

export async function askGemini(

prompt,

imageBase64 = null

){


try{


const response = await fetch(

AI_SERVER,

{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

prompt:prompt,

image:imageBase64

})


}

);





// Check server response

if(!response.ok){


throw new Error(

"AI Server Error: " + response.status

);


}






const data = await response.json();






if(data.error){


throw new Error(

data.error

);


}






if(!data.result){


throw new Error(

"No AI response received"

);


}






console.log(

"🤖 FashionAI Gemini Response:",

data.result

);






return data.result;



}

catch(error){


console.error(

"❌ FashionAI Gemini Error:",

error

);


throw error;


}


}
