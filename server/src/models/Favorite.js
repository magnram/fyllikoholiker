const mongoose = require("mongoose");
const { Schema } = mongoose;


const FavoriteSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});


module.exports = mongoose.model("Favorite", FavoriteSchema);