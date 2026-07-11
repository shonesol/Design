// outfit-engine.js
// FashionAI Outfit Intelligence Engine

import { scoreOutfit } from "./outfit-score.js";
import { checkRecentlyWorn } from "./history-ai.js";

export async function generateOutfits(
    database,
    clothes,
    profile,
    weather,
    occasionStyles
){

    const clean = clothes.filter(item =>
        item.laundryStatus === "Clean" ||
        item.laundryStatus === "Ready"
    );

    const tops = clean.filter(c => c.category === "Top");
    const bottoms = clean.filter(c => c.category === "Bottom");
    const shoes = clean.filter(c => c.category === "Shoes");
    const outerwear = clean.filter(c => c.category === "Outerwear");
    const accessories = clean.filter(c => c.category === "Accessories");

    let outfits = [];

    for(const top of tops){

        for(const bottom of bottoms){

            for(const shoe of shoes){

                const worn = await checkRecentlyWorn(
                    database,
                    {top,bottom,shoe}
                );

                if(worn) continue;

                const score = scoreOutfit(
                    top,
                    bottom,
                    shoe,
                    profile,
                    weather,
                    occasionStyles
                );

                outfits.push({

                    top,
                    bottom,
                    shoe,

                    jacket:
                    outerwear.length
                    ? outerwear[0]
                    : null,

                    accessory:
                    accessories.length
                    ? accessories[0]
                    : null,

                    score

                });

            }

        }

    }

    outfits.sort(
        (a,b)=>b.score-a.score
    );

    return outfits;

}
