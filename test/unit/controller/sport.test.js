const Sport = require('../../../src/controllers/sport');
const SportModel = require('../../../src/models/sport');

jest.mock('../../../src/models/sport');

describe('getAllSportsToursAndMatches function', () => {
    test('should successfully return sports, tour and match data', () => {
        SportModel.getAllSportsToursAndMatches.mockResolvedValue([
        {
            sportName: 'Cricket',
            tourName: 'Indian Premier League, 2023',
            matchName: 'GT vs RCB',
            matchId: 1,
            matchFormat: 'T20',
            matchStartTime: '2023-04-09T12:30:00.000Z'
        },
        {
            sportName: 'Cricket',
            tourName: 'Indian Premier League, 2023',
            matchName: 'CSK vs MI',
            matchId: 2,
            matchFormat: 'T20',
            matchStartTime: '2023-04-10T12:30:00.000Z'
        }]);

        Sport.getAllSportsToursAndMatches().then(data => {
            expect(data).toEqual({
                Cricket: {
                  'Indian Premier League, 2023': [
                    {
                      matchId: 1,
                      matchName: 'GT vs RCB',
                      matchFormat: 'T20',
                      matchStartTime: '2023-04-09T12:30:00.000Z'
                    },
                    {
                      matchId: 2,
                      matchName: 'CSK vs MI',
                      matchFormat: 'T20',
                      matchStartTime: '2023-04-10T12:30:00.000Z'
                    }
                  ]
                }
            });
        });
    });

    test('should error on db error', async () => {
        SportModel.getAllSportsToursAndMatches.mockRejectedValue(new Error("db error"));
        await expect(Sport.getAllSportsToursAndMatches()).rejects.toThrow('db error');
    });
});