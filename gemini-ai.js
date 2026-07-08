const GEMINI_API_KEY = "AIzaSyBoEegr5WWmivKvgmct594OK7guPSoc9vY";

export async function askGemini(prompt) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(data);
      return data.error?.message || "Gemini API request failed.";
    }

    return data.candidates[0].content.parts[0].text;

  } catch (error) {
    console.error(error);
    return "Unable to connect to Gemini AI.";
  }
}
