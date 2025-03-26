const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {type: String, required: true},
    category: {type: String, required: true},
    price: {type: Number, required: true},
    stockQuantity: {type: Number, required: true},
    description: {type: String, default: null},
    image: {type: String, required: true},

    userID: {type: mongoose.Schema.ObjectId, ref: 'users', required: true}
});

const productModel = mongoose.model('products', productSchema);

module.exports = productModel;