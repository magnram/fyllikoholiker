const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Favorite' }],
    watches: [{ type: Schema.Types.ObjectId, ref: 'Watch' }]
});


module.exports = mongoose.model("User", UserSchema);