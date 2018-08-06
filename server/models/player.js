let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let PlayerSchema = new Schema({
  name_first: { type: String, default: "John" },
  name_last: { type: String, default: "Smith" },
  gender: {type: String, default: "male"},
  birth_date: { type: Date, default: Date.now },
  age: { type: Number, default: 12 },
  nationality: { type: String, default: "LaLaLand"},
  join_date: { type: Date, default: new Date('August 19, 1975 23:15:30') },
  presentation: { type: String, default: "This text is about me. This is a sentence about me. Here is another sentence, still about me." },
  positions: [String],
  toefl_score: { type: Number, default: 900 },
  sat_score: { type: Number, default: 900 },
  act_score: { type: Number, default: 900 },
  cm: { type: Number, default: 180 },
  kg: { type: Number, default: 80 },
  phone_number: { type: String, default: "+46123456789" },
  email: { type: String, default: "random@email.com" },
  skype: { type: String, default: "skypie123" },
  agency: { type: String, default: "agency1" }
});

PlayerSchema.index({name_first: "text", name_last: "text"});

let Player = mongoose.model("Player", PlayerSchema);
module.exports = Player;
