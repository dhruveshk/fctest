const request = require('supertest');
const { app } = require('../../index');

describe('Integration Tests for GET /sport/:id/news', () => {

  it('should return json response and a 200 OK status code', async () => {
    const response = await request(app).get('/sport/1/news').expect('Content-Type', /json/);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          title: expect.any(String),
          description: expect.any(String),
        }),
      ])
    );
  });
  
});