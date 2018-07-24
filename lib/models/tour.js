const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({

    title: {
        type: String,
        required: true
    },
    activities: [String],
    launchDate: {
        type: Date,
        default: Date.now
    },
    stops: [{
        location: {
            city: String,
            state: String,
            zip: String
        },
        weather: {
            temperature: Number,
            condition: String
        },
        attendance: {
            type: Number,
            min: [1, 'Donde esta la gente?']
        }
    }]

});

module.exports = mongoose.model('Tour', schema);