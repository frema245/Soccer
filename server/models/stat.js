let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let StatSchema = new Schema({
  owner_id: {type: Schema.Types.ObjectId, ref: 'Player', required: true},

  season: {type: Object, required: true },

  team: { type: String, default: "AFK Linköping", required: true },

  league_id: { type: Schema.Types.ObjectId, ref: 'League', required: true},

  positions: [String],

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

