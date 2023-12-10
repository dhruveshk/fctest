const News = require('../models/news');
const Constants = require('../constants');

const createNews = async body => {
    const { category, categoryId, title, description } = body;

    if (!category) {
        throw new Error('Missing required parameter: category');
    }

    if (!categoryId) {
        throw new Error('Missing required parameter: categoryId');
    }

    if(!(category in Constants.NewsCategoryTypes)){
        throw new Error(`Invalid category field: ${category}, accpeted values are ( ${Object.keys(Constants.NewsCategoryTypes).join(", ")} )`);
    }

    if (!title) {
        throw new Error('Missing required parameter: title');
    }

    if (!description) {
        throw new Error('Missing required parameter: description');
    }

    try {
        return await News.createNews(body);
    } catch (err) {
        throw new Error("Failed to create news post");
    }
}

const getNewsByMatchId = async params => {
    return await News.getMatchNews(params);
}

const getNewsByTourId = async params => {
    return await News.getTourNews(params);
}

const getNewsBySportId = async params => {
    return await News.getSportsNews(params);
}

module.exports = {
    createNews: createNews,
    getNewsByMatchId: getNewsByMatchId,
    getNewsBySportId: getNewsBySportId,
    getNewsByTourId: getNewsByTourId,
}