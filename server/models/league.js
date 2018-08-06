let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let LeagueSchema = new Schema({
  name: { type: String, default: "Superettan" },
  gender: {type: String, default: "male"},
  country: {type: String, default: "Sweden"},
  rating: { type: Number, default: 5 }
});

let League = mongoose.model("League", LeagueSchema);
module.exports = League;
