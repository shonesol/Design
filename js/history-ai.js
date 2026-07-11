// FashionAI Outfit History Intelligence


import {
getWearHistory
}
from "./db.js";





export async function checkRecentlyWorn(

db,

outfit

){



const history =

await getWearHistory(
db
);





const today =
new Date();





for(
const item of history
){



const wornDate =

new Date(
item.date
);




const days =

Math.floor(

(today - wornDate)
/
(1000 * 60 * 60 * 24)

);





// Check only recent outfits

if(days < 3){



const oldOutfit =
item.outfit;




if(
!oldOutfit ||
!oldOutfit.top ||
!oldOutfit.bottom ||
!oldOutfit.shoe

){

continue;

}





const sameTop =

oldOutfit.top.id === outfit.top.id;



const sameBottom =

oldOutfit.bottom.id === outfit.bottom.id;



const sameShoe =

oldOutfit.shoe.id === outfit.shoe.id;





if(

sameTop &&
sameBottom &&
sameShoe

){

return true;

}



}



}





return false;


}
