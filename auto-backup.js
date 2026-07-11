// auto-backup.js
// FashionAI Automatic Backup Memory


import {
exportFashionAI
}
from "./backup-manager.js";





// ==========================
// AUTO BACKUP TIMER
// ==========================


export function startAutoBackup(

database

){



// backup every 24 hours


setInterval(()=>{


console.log(
"💾 FashionAI automatic backup running..."
);



exportFashionAI(

database

);



},



24 *

60 *

60 *

1000



);



}
