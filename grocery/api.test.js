const server = require('./app.js');

describe('Api test', () => {
    test('returns array [] when Get /get', () => {
        const response = server.get('/api/data');
        const emp = JSON.stringify([]);
        expect(response.tobe(emp));
    })
});