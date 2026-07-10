import {
analyzeTrends
}
from "./trend-ai.js";



const trend =
analyzeTrends();



document
.getElementById(
"trendResult"
)
.innerHTML = `



<h2>
🔥 Current Styles
</h2>

<p>
${trend.currentTrends.join(", ")}
</p>



<h2>
🎨 Trending Colors
</h2>

<p>
${trend.popularColors.join(", ")}
</p>



<h2>
🧵 Recommended Fabrics
</h2>

<p>
${trend.recommendedMaterials.join(", ")}
</p>



`;
