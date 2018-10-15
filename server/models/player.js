let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PlayerSchema = new Schema({
  name_first: { type: String, required: true },
  name_last: { type: String, required: true },
  gender: {type: String, required: true},
  birth_date: { type: Date, default: Date.now, required: true },
  age: { type: Number, default: 12 },
  nationality: { type: String, required: true},
  join_date: { type: Date, default: new Date('August 19, 1975 23:15:30') },
  presentation: { type: String, default: "This text is about me. This is a sentence about me. Here is another sentence, still about me." },
  positions: [String],
  toefl_score: { type: Number, default: null },
  sat_score: { type: Number, default: null },
  act_score: { type: Number, default: null },
  cm: { type: Number, required: true },
  kg: { type: Number, required: true },
  phone_number: { type: String, default: "+46123456789" },
  email: { type: String, default: "random@email.com" },
  skype: { type: String, default: "skypie123" },
  agency: { type: String, default: null },
  stats: [{ type: Schema.Types.ObjectId, ref: 'Stat' }],
  avatar_filename: { type: String, default: "nobody.jpg" },
  youtube_links: [String]
});

PlayerSchema.index({name_first: "text", name_last: "text"});

let Player = mongoose.model("Player", PlayerSchema);
module.exports = Player;
