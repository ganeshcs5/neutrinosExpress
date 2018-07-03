var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema(
    {
        productId: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
        email: { type: String, required: true }
    }
);

module.exports = mongoose.model('Cart', schema);