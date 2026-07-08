export function shoppingAI(wardrobe){

let advice=[];

const hasShirt =
wardrobe.some(i=>i.type==="shirt");

const hasJeans =
wardrobe.some(i=>i.type==="jeans");

const hasShoes =
wardrobe.some(i=>i.type==="shoes");

const hasJacket =
wardrobe.some(i=>i.type==="jacket");

const hasDress =
wardrobe.some(i=>i.type==="dress");

const hasHoodie =
wardrobe.some(i=>i.type==="hoodie");


if(!hasShirt)
advice.push("👔 Buy a white shirt");

if(!hasJeans)
advice.push("👖 Add blue jeans");

if(!hasShoes)
advice.push("👞 Buy black shoes");

if(!hasJacket)
advice.push("🧥 Add a blazer or jacket");

if(!hasDress)
advice.push("👗 Add a formal dress");

if(!hasHoodie)
advice.push("🧥 Buy a hoodie");


if(advice.length===0){

advice.push("🎉 Your wardrobe is well balanced.");

}

return advice;

}
