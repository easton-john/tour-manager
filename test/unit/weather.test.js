const { assert } = require('chai');
//const createMiddleware = require('../../lib/util/weather-info');



function createMiddleware(api) {
    return (req, res, next) => {
        return api('94770')
            .then(data => {
                req.body.weather = data.weather;
                req.body.location = data.location;
                next();
            });
    };
}

describe('wunderground middleware', () => {

    it('factory function returns middleware function with correct params', () => {
        const middleware = createMiddleware();
        assert.typeOf(middleware, 'function');
        assert.equal(middleware.length, 3);
    });

    it('handles async', done => {
        const weather = {
            temperature: 85,
            condition: 'More sun'
        };
        const location = {
            city: 'Wilsonville',
            state: 'Oregon',
            zip: 94770
        };

        const wunderground = zip => {
            assert.equal(zip, '94770');
            return Promise.resolve({
                weather, location
            });
        };

        const middleware = createMiddleware(wunderground);
    

        const next = () => {
            assert.deepEqual(req.body.weather, weather);
            assert.deepEqual(req.body.location, location);
            
            done();
        };

        const req = {
            body: {
                zip: '94770'
            }
        };

        middleware(req, null, next);
    });
});