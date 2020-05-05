const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const RequestItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    category: {
        type: String
    },

    description: {
        type: String,
        required: true
    },


    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = RequestItem = mongoose.model('requestitem', RequestItemSchema);