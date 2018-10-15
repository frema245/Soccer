let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let LeagueSchema = new Schema({
  name: { type: String, required: true },
  gender: {type: String, required: true },
  country: {type: String, required: true },
  rating: { type: Number, required: true }
});

let League = mongoose.model("League", LeagueSchema);
module.exports = League;
