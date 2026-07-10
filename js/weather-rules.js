export function weatherAdvice(weather){


if(
weather.condition==="Rain"
){


return [

"jacket",

"boots",

"waterproof"

];


}



if(
weather.temperature > 30
){


return [

"light",

"cotton",

"linen"

];


}



if(
weather.temperature < 15
){


return [

"coat",

"sweater",

"jacket"

];


}



return [

"normal"

];


}
