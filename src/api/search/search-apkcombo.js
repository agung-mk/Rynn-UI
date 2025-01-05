module.exports = function(app) {
    const { apkCombo } = require('../../scrape/apkcombo');
    app.get('/search/apkcombo', async (req, res) => {
        try {
            const { q } = req.query;
            if (!q) {
                return res.status(400).json({ status: false, error: 'Query is required' });
            }
            const result = await apkCombo.search(q);
            res.status(200).json({
                status: true,
                result
            });
        } catch (error) {
            res.status(500).json({ status: false, error: error.message });
        }
    });
};
