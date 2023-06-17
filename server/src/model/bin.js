const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bin = new Schema({

ip: {type: String},
status: {type: Boolean, default: false},
lat: {type: String},
lng: {type: String},

});

  module.exports = mongoose.model('Bin', Bin);