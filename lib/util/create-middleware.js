const { HttpError } = require('./errors');
const getStopInfo = require('../../weather-service-example');

module.exports = function createStopInfo(api = getStopInfo) {
    return (req, res, next) => {
        if(req.body.zip) {
    
            return api(req.body.zip)
                .then(data => {
                    req.body = data;
                    next();
                });
        }
        else {
            const error = new HttpError({
                code: 400,
                message: 'Bad Request'
            });
            next(error);
        }
    };
};