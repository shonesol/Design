import {
auth
}
from "./firebase.js";


import {
onAuthStateChanged
}
from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";


import {
openDatabase,
getClothes
}
from "./db.js";


import {
updateLaundryStatus
}
from "./laundry-ai.js";



let database;



onAuthStateChanged(
auth,
async(user)=>{


if(user){


database =
await openDatabase(
user.uid
);



loadLaundry();

}


});





async function loadLaundry(){



const clothes =
await getClothes(
database
);



const box =
document
.getElementById(
"laundryList"
);



box.innerHTML="";




clothes.forEach(item=>{



box.innerHTML += `


<div>


<img 
src="${item.image}"
width="120"
>


<h3>
${item.type}
</h3>


<p>
Status:
${item.laundryStatus}
</p>



<button onclick="
changeStatus(${item.id},'Clean')
">

✅ Clean

</button>



<button onclick="
changeStatus(${item.id},'Dirty')
">

🧺 Dirty

</button>



<button onclick="
changeStatus(${item.id},'Washing')
">

💧 Washing

</button>



</div>


`;



});


}







window.changeStatus =
async function(id,status){


await updateLaundryStatus(
database,
id,
status
);


loadLaundry();


};
