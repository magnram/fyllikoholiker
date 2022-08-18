const mongoose = require("mongoose");
const { Schema } = mongoose;


// Defining the mongo-schema to match the database-model
const ProductSchema = new Schema({
    date: String, // Last updated-date
    name: String,
    volume: { type: Number, min: 0, max: 2000 },
    price: { type: Number, min: 0, max: 42000 },
    pricePerLiter: { type: Number, min: 0, max: 60000 },
    alcohol: { type: Number, min: 0, max: 60 },
    type: String,
    filterType: String,
    tannins: { type: Number, min: 0, max: 12 },
    fullness: { type: Number, min: 0, max: 12 },
    freshness: { type: Number, min: 0, max: 12 },
    sweetness: { type: Number, min: 0, max: 12 },
    bitterness: { type: Number, min: 0, max: 12 },
    color: String,
    aroma: String,
    taste: String,
    goodWith: [String],
    country: String,
    filterCountry: String,
    district: String,
    vintage: String,
    method: String,
    sugar: String,
    img: String,
    packaging: String,
    url: String,
    eco: Boolean,
    bioDynamic: Boolean,
    kosher: Boolean,
    fairTrade: Boolean,
    green_packaging: Boolean,
    gluten: Boolean,
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Favorite' }],
    watches: [{ type: Schema.Types.ObjectId, ref: 'Watch' }]
});


// Converting the product-schema to a mongoose model and exporting it
module.exports = mongoose.model("Product", ProductSchema);