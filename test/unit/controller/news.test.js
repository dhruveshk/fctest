const News = require('../../../src/controllers/news');
const NewsModel = require('../../../src/models/news');

jest.mock('../../../src/models/news');
describe('create news', () => {
    test('should successfully validate the passed data and create news post', function(){
        NewsModel.createNews.mockResolvedValue({success: true});
        const data = {category: "TOUR", categoryId: 123, title: "sample title", description: "sample description"};
        News.createNews(data).then(data => expect(data).toEqual({success: true}));
    });

    test('should error on news category empty', async () => {
        const data = {category: "", categoryId: 123};
        await expect(News.createNews(data)).rejects.toThrow('Missing required parameter: category');
    });

    test('should error on news categoryId empty', async () => {
        const data = {category: "TOUR"};
        await expect(News.createNews(data)).rejects.toThrow('Missing required parameter: categoryId');
    });

    test('should error on news category not tour or match', async () => {
        const data = {category: "invalid", categoryId: 123};
        await expect(News.createNews(data)).rejects.toThrow('Invalid category field: invalid, accpeted values are ( TOUR, MATCH )');
    });

    test('should error on title empty', async () => {
        const data = {category: "TOUR", categoryId: 123};
        await expect(News.createNews(data)).rejects.toThrow('Missing required parameter: title');
    });

    test('should error on description empty', async () => {
        const data = {category: "TOUR", categoryId: 123, title: "sample title"};
        await expect(News.createNews(data)).rejects.toThrow('Missing required parameter: description');
    });

    test('should error on db error', async () => {
        const data = {category: "TOUR", categoryId: 123, title: "sample title", description: "sample description"};
        NewsModel.createNews.mockRejectedValue(new Error("db error"));
        await expect(News.createNews(data)).rejects.toThrow('Failed to create news post');
    });
});

describe('getNews', () => {
    test('should successfully return news object', () => {
        NewsModel.getMatchNews.mockResolvedValue({title: "sample title", description: "sample description"});
        News.getNewsByMatchId({id: 123}).then(data => expect(data).toEqual({title: "sample title", description: "sample description"}));
    });

    test('should error on db error', async () => {
        NewsModel.getMatchNews.mockRejectedValue(new Error("db error"));
        await expect(News.getNewsByMatchId({id: 123})).rejects.toThrow('db error');
    });
});