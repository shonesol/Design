export async function analyzeClothing(imageBase64){


const prompt = `

Analyze this clothing image.

Return only JSON:

{
"type":"",
"color":"",
"style":"",
"occasion":"",
"season":""
}

`;


// AI connection will go here


return {

type:"shirt",

color:"white",

style:"formal",

occasion:"office",

season:"all"

};


}
