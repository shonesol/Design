// backup.js
// FashionAI Backup System


import {
getDatabase
}
from "./database-manager.js";


import {
exportFashionAI,
importFashionAI
}
from "./backup-manager.js";





const database =

await getDatabase();






document
.getElementById(
"backupBtn"
)
.onclick = ()=>{


exportFashionAI(

database

);


};







document
.getElementById(
"restoreBtn"
)
.onclick = async()=>{



const file =

document
.getElementById(
"restoreFile"
)
.files[0];





if(file){



await importFashionAI(

database,

file

);




alert(

"✅ FashionAI wardrobe restored"

);



}



};
