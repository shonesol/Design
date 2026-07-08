const API_KEY = "";

export async function askGemini(prompt) {

    try {

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
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

        if (data.error) {
            return "Gemini Error: " + data.error.message;
        }

        return data.candidates[0].content.parts[0].text;

    } catch (error) {

        console.error(error);

        return "Unable to contact Gemini AI. Check your internet connection or API key.";

    }

}
