const News = require('../controllers/news');

module.exports = function(app) {
    app.route('/news').post(async (req, res, next) => {
        const body = req.body;
        try {
            await News.createNews(body);
            return res.sendStatus(201);
        } catch (err) {
            return next(err);
        }
    });
}