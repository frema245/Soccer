var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
  name_first: { type: String, default: "John" },
  name_last: { type: String, default: "Smith" },
  birth_date: { type: Date, default: Date.now },
  age: { type: Number, default: 12 },
  nationality: { type: String, default: "LaLaLand"},
  join_date: { type: Date, default: new Date('August 19, 1975 23:15:30') },
  presentation: { type: String, default: "This text is about me." },
  positions: [String],
  toefl_score: { type: Number, default: 900 },
  sat_score: { type: Number, default: 900 },
  phone_number: { type: String, default: "+46123456789" },
  email: { type: String, default: "random@email.com" }

});

PlayerSchema.index({name_first: "text", name_last: "text"});

let Post = mongoose.model("Player", PlayerSchema);
module.exports = Post;
