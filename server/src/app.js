const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

const mongodb_conn_module = require('./mongodbConnModule');
let db = mongodb_conn_module.connect();

let Player = require("../models/player");

app.get('/player', (req, res) => {

  // Read queries from request.
  let search = req.query.search;
  let age_min = req.query.age_min;
  let age_max = req.query.age_max;
  let toefl_score_min = req.query.toefl_score_min;
  let toefl_score_max = req.query.toefl_score_max;
  let nationality = req.query.nationality;
  let sat_score_min = req.query.sat_score_min;
  let sat_score_max = req.query.sat_score_max;
  let positions = [];

  console.log("search in backend = " + search)

  // Needs to be an array of strings
  try {
    positions = JSON.parse(req.query.positions);
  }
  catch(error) {
    console.log("Error parsing positions");
    // console.error(error);
    positions = [];
  }

  // Find all players...
  let query = Player.find();

  /*
   * Check for queries for search filtering.
   */

  console.log(search);

  if (search) {
    query.where({ $text: { $search: search}});
    //query.or([{name_first: new RegExp('^'+search+'$', "i")},{name_last: new RegExp('^'+search+'$', "i")}]);
  }

  // TODO: Fix this after feedback
  if (positions.length) {
    console.log("Well, there are positinos");
    for (let i = 0; i < positions.length; i++) {
      query.where('positions').in(positions[i])
    }
  }

  // Nationality filtering
  if (nationality) {
    // Regex is used to make query case insensitive.
    query.where('nationality').equals({ $regex : new RegExp(nationality, "i") });
  }

  // SAT filtering
  if (sat_score_max || sat_score_min) {
    if (!sat_score_min) {sat_score_min = 0}
    if (!sat_score_max) {sat_score_max = 2500}
    query.where('sat_score').gt(sat_score_min-1).lt(sat_score_max);
  }

  // Toefl filtering
  if (toefl_score_max || toefl_score_min) {
    if (!toefl_score_min) {toefl_score_min = 0}
    if (!toefl_score_max) {toefl_score_max = 2500}
    query.where('sat_score').gt(toefl_score_min-1).lt(toefl_score_max);
  }

  // Age filtering
  if (age_max || age_min) {
    if (!age_min) {age_min = 0}
    if (!age_max) {age_max = 100}
    query.where('age').gt(age_min-1).lt(age_max);
  }

  query.
  //sort({_id:-1}).
  select('name_first name_last age positions nationality sat_score').
  exec(
    function (error, players) {
      if (error) { console.error(error); }
      res.send({
        players: players
      })
    }
  );

});

app.get('/playerz', (req, res) => {
  Player.find({}, 'name age presentation joined position toefl sat', function (error, players) {
    if (error) { console.error(error); }
    res.send({
      players: players
    })
  }).sort({_id:-1})
})

app.post('/add_player', (req, res) => {

  let new_player = new Player({
    name_first: req.body.name_first,
    name_last: req.body.name_last,
    age: req.body.age,
    presentation: req.body.presentation,
    birth_date: req.body.birth_date,
    join_date: req.body.join_date,
    nationality: req.body.nationality,
    positions: req.body.positions,
    toefl_score: req.body.toefl_score,
    sat_score: req.body.sat_score,
    phone_number: req.body.phone_number,
    email: req.body.email
	});

	new_player.save(function (error) {
		if (error) {
			console.log(error)
		}
		res.send({
			success: true
		})
	})
});

app.put('/player/:id', (req, res) => {
	let db = req.db;
	Player.findById(req.params.id, function (error, player) {
	  if (error) { console.error(error); }

    if (req.body.name_first) { player.name_first = req.body.name_first}
    if (req.body.name_last) { player.name_last = req.body.name_last}
    if (req.body.age) { player.age = req.body.age}
    if (req.body.presentation) { player.presentation = req.body.presentation}
    if (req.body.nationality) { player.nationality = req.body.nationality}
    if (req.body.join_date) { player.join_date = req.body.join_date}
    if (req.body.birth_date) { player.birth_date = req.body.birth_date}
    if (req.body.positions) { player.positions = req.body.positions}
    if (req.body.toefl_score) { player.toefl_score = req.body.toefl_score}
    if (req.body.sat_score) { player.sat_score = req.body.sat_score}
    if (req.body.phone_number) { player.phone_number = req.body.phone_number}
    if (req.body.email) { player.email = req.body.email}

	  player.save(function (error) {
			if (error) {
				console.log(error)
			}
			res.send({
				success: true
			})
		})
	})
});

app.delete('/player/:id', (req, res) => {
	let db = req.db;
	Player.remove({
		_id: req.params.id
	}, function(err, player){
		if (err)
			res.send(err)
		res.send({
			success: true
		})
	})
});

app.delete('/player', (req, res) => {
  let db = req.db;
  Player.remove({}, function(err, player){
    if (err)
      res.send(err);
    res.send({
      success: true
    })
  })
});

app.get('/player/:id', (req, res) => {
	let db = req.db;
	Player.findById(req.params.id, 'name_first name_last age presentation joined positions toefl_score sat_score', function (error, player) {
	  if (error) { console.error(error); }
	  res.send(player)
	})
});

app.listen(process.env.PORT || 8081)
