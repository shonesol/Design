// FashionAI Occasion Intelligence


export function getOccasionStyle(
occasion
){



const rules={


office:[

"Business",

"Smart Casual",

"Formal"

],



wedding:[

"Luxury",

"Elegant",

"Traditional"

],



travel:[

"Casual",

"Sporty",

"Comfort"

],



party:[

"Streetwear",

"Luxury",

"Trendy"

]


};





return (

rules[
occasion.toLowerCase()
]

||

[
"Casual"
]

);


}
