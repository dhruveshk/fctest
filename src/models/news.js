const mysql = require('../lib/mysql');
const Constants = require('../constants');

const createNews = async params => {
    const newsMap = {};
    newsMap[Constants.NewsCategoryTypes.MATCH] = createMatchNews;
    newsMap[Constants.NewsCategoryTypes.TOUR] = createTourNews;
    return await newsMap[params.category](params);
}

const createTourNews = async params => {
    const statement = "insert into mydb.tours_news (title, description, tourId) values (?, ?, ?)";
    const parameters = [ params.title, params.description, params.categoryId ];
    return await mysql.query(statement, parameters);
}

const createMatchNews = async params => {
    const statement = "insert into mydb.matches_news (title, description, matchId) values (?, ?, ?)";
    const parameters = [ params.title, params.description, params.categoryId ];
    return await mysql.query(statement, parameters);
}

const getTourNews = async params => {
    const statement = 'select t.title, t.description from tours_news t where tourId = ? union all ' + 
            'select mn.title, mn.description from matches_news mn inner join matches m on mn.matchId = m.id and m.tourId = ?';
    const parameters = [ params.id, params.id ];


    return await mysql.query(statement, parameters);
}

const getMatchNews = async params => {
    const statement = 'select mn.title, mn.description from matches_news mn where mn.matchId = ?';
    const parameters = [ params.id ];
    return await mysql.query(statement, parameters);
}

const getSportsNews = async params => {
    const statement = 'select tn.title, tn.description from tours_news tn inner join tours t2 on tn.tourId = t2.id and sportId = ? union all ' +
            'select mn.title, mn.description from matches_news mn inner join matches m on mn.matchId = m.id ' +
            'inner join tours t3 on t3.id = m.tourId and sportId = ?';
    const parameters = [ params.id, params.id ];
    return await mysql.query(statement, parameters);
}

module.exports = {
    createNews: createNews,
    getMatchNews: getMatchNews,
    getSportsNews: getSportsNews,
    getTourNews: getTourNews,
}