const Tour = require('../controllers/tour');
const News = require('../controllers/news');

module.exports = function(app) {
    app.route('/tours').get(async (req, res, next) => {
        try {
            return res.json(await Tour.getAllTours());
        } catch (err) {
            return next(err);
        }
    });

    app.route('/tour/matches').get(async (req, res, next) => {
        try {
            let params = req.query;
            let result = await Tour.getMatchesByTourName(params);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });

    app.route('/tour/:id/news').get(async (req, res, next) => {
        try {
            let params = req.params;
            let result = await News.getNewsByTourId(params);
            return res.json(result);
        } catch (err) {
            return next(err);
        }
    });
}