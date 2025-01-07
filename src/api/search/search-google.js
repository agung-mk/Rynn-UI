const axios = require('axios');
const cheerio = require('cheerio');
module.exports = function(app) {
    async function google(query) {
        try {
            const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
            const response = await axios.get(url, {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36"
                }
            });
            const html = response.data;
            const $ = cheerio.load(html);
            const results = [];
            $("div.tF2Cxc").each((index, element) => {
                const title = $(element).find("h3").text().trim();
                const description = $(element).find(".VwiC3b").text().trim(); 
                const link = $(element).find("a").attr("href");
                if (title && link) {
                    results.push({ 
                        title, 
                        description: description || 'No Description', 
                        link 
                    });
                }
            });
            return results;
        } catch (error) {
            console.error("Error fetching search results:", error.message);
            return [];
        }
    }
    app.get('/search/google', async (req, res) => {
        try {
            const { q } = req.query;
            if (!q) {
                return res.status(400).json({ status: false, error: 'Query is required' });
            }
            const result = await google(q);
            res.status(200).json({
                status: true,
                result
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
