const Match = require('../controllers/match');
const News = require('../controllers/news');

module.exports = function(app) {
    app.route('/matches').get(async (req, res, next) => {
        try {
            return res.json(await Match.getAllMatches());
        } catch (err) {
            return next(err);
        }
    });

    app.route('/matches/:id/news').get(async (req, res, next) => {
        try {
            let params = req.params;
            let result = await News.getNewsByMatchId(params);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });
}