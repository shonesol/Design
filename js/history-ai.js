import {
getWearHistory
}
from "./db.js";





export async function checkRecentlyWorn(
db,
outfit
){


const history =
await getWearHistory(db);




const today =
new Date();





for(let item of history){


const wornDate =
new Date(
item.date
);



const days =
Math.floor(

(today-wornDate)
/
(1000*60*60*24)

);





if(days < 3){


return true;


}



}



return false;


}
