import {
askGemini
}
from "./gemini.js";





const button =
document.getElementById(
"startVoice"
);



const question =
document.getElementById(
"question"
);



const answer =
document.getElementById(
"answer"
);






// Browser speech recognition


const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;



const recognition =
new SpeechRecognition();



recognition.lang =
"en-US";



recognition.continuous=false;





button.onclick=()=>{


recognition.start();



};






recognition.onstart=()=>{


question.innerHTML =
"🎧 Listening...";


};






recognition.onresult =
async(event)=>{


const text =
event
.results[0]
[0]
.text;



question.innerHTML =
"You: "+text;





const response =
await askGemini(`


You are FashionAI,
a professional fashion stylist.


User says:

${text}


Give a helpful styling answer.


`);





answer.innerHTML =
response;




speak(response);



};







// AI voice response


function speak(text){



const speech =
new SpeechSynthesisUtterance(
text
);



speech.rate=1;



speech.pitch=1;



window.speechSynthesis
.speak(
speech
);



}
