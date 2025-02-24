const axios = require('axios');
module.exports = function(app) {
    async function fetchContent(prompt) {
        try {
            const response = await axios({
                method: "POST",
                url: "https://chateverywhere.app/api/chat",
                headers: {
                    "Content-Type": "application/json",
                    "Origin": "https://chateverywhere.app",
                    "Referer": "https://chateverywhere.app/id",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
                },
                data: JSON.stringify({
                    model: {
                        id: "gpt-3.5-turbo-0613",
                        name: "GPT-3.5",
                        maxLength: 12000,
                        tokenLimit: 4000,
                    },
                    prompt: prompt,
                    messages: [
                        {
                            pluginId: null,
                            content: prompt,
                            role: "user"
                        }
                    ]
                })
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching content from GPT-3.5:", error);
            throw error;
        }
    }
    app.get('/ai/gpt-3.5-turbo', async (req, res) => {
        try {
            const { text } = req.query;
            if (!text) {
                return res.status(400).json({ status: false, error: 'Text is required' });
            }
            const result = await fetchContent(text);
            res.status(200).json({
                status: true,
                result
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};