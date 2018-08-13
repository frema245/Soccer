let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let StatSchema = new Schema({
  owner_id: {type: Schema.Types.ObjectId, ref: 'Player'},

  season: { type: String, default: "17/18" },

  team: { type: String, default: "AFK Linköping" },

  league_id: { type: Schema.Types.ObjectId, ref: 'League' },

  yellow: { type: Number, default: 0 },
  red: { type: Number, default: 0 },
  goals: { type: Number, default: 0 },
  ass: { type: Number, default: 0 },

  mfs: { type: Number, default: 0 },
  inb: { type: Number, default: 0 },
  utb: { type: Number, default: 0 },

  tot: { type: Number, default: 0 },
  points: { type: Number, default: 0 }


});

let Stat = mongoose.model("Stat", StatSchema);
module.exports = Stat;
