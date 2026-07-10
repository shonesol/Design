import {
analyzeTrends
}
from "./trend-ai.js";



export function suggestWardrobeUpgrade(
clothes
){


const trends =
analyzeTrends();



let suggestions=[];



let colors =
clothes.map(
item=>
item.color?.toLowerCase()
);





trends.popularColors.forEach(color=>{


if(
!colors.includes(
color.toLowerCase()
)

){

suggestions.push(

`Add a ${color} clothing piece`

);

}


});







if(
!clothes.some(
item=>
item.name
?.toLowerCase()
.includes("blazer")
)

){


suggestions.push(

"Add a versatile blazer for smart outfits"

);


}







if(
!clothes.some(
item=>
item.name
?.toLowerCase()
.includes("sneaker")
)

){


suggestions.push(

"Add clean sneakers for modern casual looks"

);


}





return suggestions;


}
