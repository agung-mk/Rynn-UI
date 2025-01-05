const axios = require('axios');
const cheerio = require('cheerio');

const Proxy = (url) =>
    url ? `https://translate.google.com/translate?sl=en&tl=fr&hl=en&u=${encodeURIComponent(url)}&client=webapp` : "";

const apkCombo = {
    search: async function (query) {
        const searchUrl = `https://apkcombo.com/search/${encodeURIComponent(query.replace(" ", "-"))}`;
        const proxySearchUrl = Proxy(searchUrl);

        try {
            const response = await axios.get(proxySearchUrl);
            const res = response.data;
            const $ = cheerio.load(res);
            const results = [];

            $("a.l_item").each(function (index, element) {
                const name = $(element).find("span.name").text();
                const link = $(element).attr("href")
                    .replace("https://apkcombo-app.translate.goog/", "https://apkcombo.com/")
                    .replace("/?_x_tr_sl=en&_x_tr_tl=fr&_x_tr_hl=en&_x_tr_pto=wapp", "");
                const developer = $(element).find("span.author").text();
                const rating = $(element).find("span.description span:nth-child(2)").text();
                const size = $(element).find("span.description span:nth-child(3)").text();

                results.push({
                    name,
                    developer,
                    rating: rating.replace(' ★', ''),
                    size,
                    link
                });
            });

            return results;
        } catch (error) {
            console.error("Error:", error);
            return error.message;
        }
    },

    download: async function (url) {
        const proxyUrl = Proxy(url);

        try {
            const response = await axios.get(proxyUrl);
            const res = response.data;
            const $ = cheerio.load(res);

            const downloadLink = $("ul.file-list li a.variant").attr("href");
            const versionName = $("ul.file-list li .vername").text().trim();
            const versionCode = $("ul.file-list li .vercode").text().trim();
            const fileSize = $("ul.file-list li .spec.ltr").text().trim();
            const minSdk = $("ul.file-list li .spec").eq(1).text().trim();
            const dpi = $("ul.file-list li .spec").eq(2).text().trim();

            return {
                downloadLink,
                versionName,
                versionCode,
                fileSize,
                minSdk,
                dpi
            };
        } catch (error) {
            console.error("Error:", error);
            return null;
        }
    }
};

module.exports = { apkCombo }