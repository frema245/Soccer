let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let StatSchema = new Schema({
  season: { type: String, default: "17/18" },
  team: { type: String, default: "AFK Linköping" },
  league: { type: String, default: "Division 1 Norra" },
  country: { type: String, default: "Sweden" },

  yellow: { type: Number, default: 0 },
  red: { type: Number, default: 0 },
  tot: { type: Number, default: 0 },
  goals: { type: Number, default: 0 },
  ass: { type: Number, default: 0 },
  points: { type: Number, default: 0 },

});

let Stat = mongoose.model("Stat", StatSchema);
module.exports = Stat;
