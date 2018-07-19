const { assert } = require('chai');
const request = require('./request');
const { dropCollection } = require('./db');

describe('Tour API', () => {

    beforeEach(() => dropCollection('tours'));

    function save(tour) {
        return request
            .post('/api/tours')
            .send(tour)
            .then(({ body }) => body);
    }

    let whiskeyPirates;

    beforeEach(() => {
        return save({
            title: 'Whiskey Pirates',
            activities: ['drunk juggling', 'fire whiskey shots'],
        })
            .then(data => whiskeyPirates = data);
    });

    it('saves a tour', () => {
        assert.isOk(whiskeyPirates._id);
    });

    it('gets a tour by id', () => {
        return request
            .get(`/api/tours/${whiskeyPirates._id}`)
            .then(({ body }) => {
                assert.deepEqual(body._id, whiskeyPirates._id);
            });
    });

});