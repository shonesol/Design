// gemini.js
// FashionAI AI Connection


export async function askGemini(

prompt,

imageBase64

){


try{


const response = await fetch(

"/api/gemini",

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





const data =
await response.json();





if(data.error){


throw new Error(
data.error
);


}





return data.result;



}

catch(error){


console.error(
"FashionAI AI Error:",
error
);


throw error;


}



}
