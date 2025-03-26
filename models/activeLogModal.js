const mongoose = require('mongoose');

const activeLogSchema = mongoose.Schema({
    message: {type: String, required: true},
    productID: {type: mongoose.Schema.ObjectId, ref: 'products', required: true}
}, {timestamps:true});

const activeLogModel = mongoose.model('activeLogs', activeLogSchema);

module.exports = activeLogModel;