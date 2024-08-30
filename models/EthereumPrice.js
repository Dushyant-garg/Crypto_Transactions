const mongoose = require('mongoose');

const EthereumPriceSchema = new mongoose.Schema({
    price: Number,
    currency: String,
},{timestamps:true});

module.exports = mongoose.model('EthereumPrice', EthereumPriceSchema);