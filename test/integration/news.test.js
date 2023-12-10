const request = require('supertest');
const { app } = require('../../index');

describe('Integration Tests for POST /news', () => {

  it('should return a 201 Created status code on creating tour news', async () => {
    const response = await request(app)
        .post('/news')
        .send({
            "category": "TOUR",
            "categoryId": 1,
            "title": "Test Tour 1 News 1",
            "description": "test sample description"
        });
    expect(response.status).toBe(201);
  });

  it('should return a 201 Created status code on creating match news', async () => {
    const response = await request(app)
        .post('/news')
        .send({
            "category": "MATCH",
            "categoryId": 1,
            "title": "Test Match 1 News 1",
            "description": "test sample description"
        });
    expect(response.status).toBe(201);
  });

  it('should return error on invalid category', async () => {
    const response = await request(app)
        .post('/news')
        .send({
            "category": "Invalid",
            "categoryId": 1,
            "title": "Sample Match 1 News",
            "description": " sample description"
        });
    expect(response.status).toBe(500);
  });

  it('should return error on empty category', async () => {
    const response = await request(app)
        .post('/news')
        .send({
            "categoryId": 1,
            "title": "Sample Match 1 News",
            "description": " sample description"
        });
    expect(response.status).toBe(500);
  });

  it('should return error on empty category id', async () => {
    const response = await request(app)
        .post('/news')
        .send({
            "category": "MATCH",
            "title": "Sample Match 1 News",
            "description": " sample description"
        });
    expect(response.status).toBe(500);
  });

  it('should return error on empty title', async () => {
    const response = await request(app)
        .post('/news')
        .send({
            "category": "MATCH",
            "categoryId": 1,
            "description": "test sample description"
        });
    expect(response.status).toBe(500);
  });

  it('should return error on empty description', async () => {
    const response = await request(app)
        .post('/news')
        .send({
            "category": "MATCH",
            "categoryId": 1,
            "description": "test sample description"
        });
    expect(response.status).toBe(500);
  });
});
