const mongoose = require("mongoose");
const { Schema } = mongoose;


// Logs the watches on each product
const WatchSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    country: String,
    type: String,
    date: { type: String, default: () => new Date().toISOString() }
});


module.exports = mongoose.model("Watch", WatchSchema);