export async function askGemini(prompt) {

    try {

        const response = await fetch(
            "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/askGemini",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: prompt
                })
            }
        );

        const data = await response.json();

        if (data.error) {
            return "AI Error: " + data.error;
        }

        return data.answer;

    } catch (error) {

        console.error(error);

        return "Unable to connect to AI.";

    }

}
