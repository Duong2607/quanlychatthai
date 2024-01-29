const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Bin = new Schema({

  ip: { type: String },
  status: { type: Boolean, default: false },
  lat: { type: String },
  lng: { type: String },
  address: { type: String },
  connect: { type: Boolean, default: true }
});

module.exports = mongoose.model('Bin', Bin);