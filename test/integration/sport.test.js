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

describe('Integration Tests for GET /sport/tour/match', () => {

  it('should return json response and a 200 OK status code', async () => {
    const response = await request(app).get('/sport/tour/match').expect('Content-Type', /json/);
    expect(response.status).toBe(200);
    expect(typeof response.body).toBe('object');
    const key = Object.keys(response.body)[0];
    const key1 = Object.keys(response.body[key])[0];
    expect(response.body).toEqual(
      expect.objectContaining({
        [key]: expect.objectContaining({
          [key1]: expect.arrayContaining([
            expect.objectContaining({
              matchId: expect.any(Number),
              matchFormat: expect.any(String),
              matchName: expect.any(String),
              matchStartTime: expect.any(String),
            })
          ])
        })
      }),
    );
  });

});