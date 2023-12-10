const Sport = require('../controllers/sport');
const News = require('../controllers/news');

module.exports = function(app) {
    app.route('/sport/tour/match').get(async (req, res, next) => {
        try {
            return res.json(await Sport.getAllSportsToursAndMatches());
        } catch (err) {
            return next(err);
        }
    });

    app.route('/sport/:id/news').get(async (req, res, next) => {
        try {
            let params = req.params;
            let result = await News.getNewsBySportId(params);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });
}