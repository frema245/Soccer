const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('errorhandler');
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const flash = require("connect-flash");
const mongoose = require("mongoose");
const multer = require('multer');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./avatars")
  },
  filename: function (req, file, cb) {
    cb(null, "avatar-" + req.params.id + ".jpg")
  }
});

let upload = multer({storage: storage});


// let upload = multer({ dest: "./avatars" });

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.use(morgan('combined'));
app.use(flash());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(express.static(__dirname + '/public/'));
app.use(session({secret: 'mjao boi', cookie: {maxAge: 60000}, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

if (!isProduction) {
  app.use(errorHandler());
}

app.use(require('./routes'));

const mongodb_conn_module = require('./mongodbConnModule');
mongodb_conn_module.connect();

let Player = require("../models/player");
let League = require("../models/league");
let Stat = require("../models/stat");
let User = require("../models/user");

//Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
  User.findOne({email})
    .then((user) => {
      if (!user || !user.validatePassword(password)) {
        return done(null, false, {errors: {'email or password': 'is invalid'}});
      }
      console.log("wuuuut");
      return done(null, user);
    }).catch(done);
}));


/* AVATAR */

app.post('/player/:id/avatar', upload.single('avatar'), function (req, res, next) {
  console.log(req.file.filename);

  Player.findById(req.params.id, function (error, player) {
    if (error) {
      console.error(error);
    }

    player.avatar_filename = req.file.filename;

    player.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  });

  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

app.get('/player/:id/avatar', function (req, res, next) {

  Player.findById(req.params.id, function (error, player) {
    if (error) {
      console.error(error);
    }

    let avatar_filename = player.avatar_filename;

    console.log(avatar_filename);

    //res.sendFile(path.join(__dirname, "../avatars/nobody.jpg"));

    res.sendFile(path.join(__dirname, "../avatars/" + avatar_filename));
  });

  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
});

/* STAT */

app.get('/stat', (req, res) => {
  Stat.find({}, 'owner_id season team league_id country yellow red tot goals ass points mfs inb utb', function (error, stats) {
    if (error) {
      console.error(error);
    }
    res.send({
      stats: stats
    })
  }).sort({_id: -1})
});

app.get('/stat/:player_id', (req, res) => {
  Stat.find({owner_id: req.params.player_id}, 'owner_id season positions team league_id country yellow red tot goals ass points mfs inb utb', function (error, stats) {
    if (error) {
      console.error(error);
    }
    res.send({
      stats: stats
    })
  })
});

app.post('/stat', (req, res) => {

  console.log("WHAT");
  console.log(req.body.owner_id);

  let new_stat = new Stat({
    owner_id: req.body.owner_id,
    season: req.body.season,
    team: req.body.team,
    league_id: req.body.league_id,
    country: req.body.country,
    yellow: req.body.yellow,
    red: req.body.red,
    tot: req.body.tot,
    goals: req.body.goals,
    ass: req.body.ass,
    points: req.body.points,
    mfs: req.body.mfs,
    inb: req.body.inb,
    utb: req.body.utb
  });

  new_stat.save(function (error) {
    if (error) {
      console.log(error)
    }
    res.send({
      success: true
    })
  })
});

app.put('/stat/:id', (req, res) => {

  Stat.findById(req.params.id, function (error, stat) {
    if (error) {
      console.error(error);
    }

    stat.owner_id = req.body.owner_id;
    stat.league_id = req.body.league_id;
    stat.team = req.body.team;
    stat.season = req.body.season;

    if (req.body.positions) {
      stat.positions = req.body.positions
    }

    if (req.body.yellow) {
      stat.yellow = req.body.yellow
    }

    if (req.body.red) {
      stat.red = req.body.red
    }

    if (req.body.goals) {
      stat.goals = req.body.goals
    }

    if (req.body.ass) {
      stat.ass = req.body.ass
    }

    if (req.body.mfs) {
      stat.mfs = req.body.mfs
    }

    if (req.body.inb) {
      stat.inb = req.body.inb
    }

    if (req.body.utb) {
      stat.utb = req.body.utb
    }

    if (req.body.tot) {
      stat.tot = req.body.tot
    }

    if (req.body.points) {
      stat.points = req.body.points
    }

    stat.save(function (error) {
      if (error) {
        console.log(error)
      }
      res.send({
        success: true
      })
    })
  })
});

app.delete('/stat/:id', (req, res) => {
  console.log("DIS IS DEL ----------------------------------------------------------------")
  let db = req.db;
  Stat.remove({
    _id: req.params.id
  }, function (err, stat) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
});

/* LEAGUE */

app.get('/league', (req, res) => {
  League.find({}, 'name gender country rating', function (error, leagues) {
    if (error) {
      console.error(error);
    }
    res.send({
      leagues: leagues
    })
  }).sort({_id: -1})
});

app.post('/league', (req, res) => {

  console.log("Started posting");

  let new_league = new League({
    name: req.body.name,
    gender: req.body.gender,
    country: req.body.country,
    rating: req.body.rating
  });

  new_league.save(function (error) {
    if (error) {
      console.log(error)
    }
    console.log("Seem to succeded");
    res.send({
      success: true
    })
  })
});

app.delete('/league', (req, res) => {
  let db = req.db;
  League.remove({}, function (err, league) {
    if (err)
      res.send(err);
    res.send({
      success: true
    })
  })
});

app.delete('/league/:id', (req, res) => {
  let db = req.db;
  League.remove({
    _id: req.params.id
  }, function (err, league) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
});

app.get('/league/:id', (req, res) => {
  let db = req.db;
  League.findById(req.params.id, 'name country gender rating', function (error, league) {
    if (error) {
      console.error(error);
    }
    res.send(league)
  })
});

/* PLAYER */

app.get('/player', (req, res) => {

  // Read queries from request.
  let search = req.query.search;
  let age_min = req.query.age_min;
  let age_max = req.query.age_max;
  let kg_min = req.query.kg_min;
  let kg_max = req.query.kg_max;
  let cm_min = req.query.cm_min;
  let cm_max = req.query.cm_max;
  let toefl_score_min = req.query.toefl_score_min;
  let toefl_score_max = req.query.toefl_score_max;
  let sat_score_min = req.query.sat_score_min;
  let sat_score_max = req.query.sat_score_max;
  let act_score_min = req.query.act_score_min;
  let act_score_max = req.query.act_score_max;
  let nationality = req.query.nationality;
  let positions = req.query.positions;

  // Find all players...
  let query = Player.find()

  if (positions) {
    query.where("positions").in(positions);
  }

  /*
   * Check for queries for search filtering.
   */

  if (search) {
    query.where({$text: {$search: search}});
    //query.or([{name_first: new RegExp('^'+search+'$', "i")},{name_last: new RegExp('^'+search+'$', "i")}]);
  }
  // TODO: Fix this after feedback

  // Nationality filtering
  if (nationality) {
    // Regex is used to make query case insensitive.
    query.where('nationality').equals({$regex: new RegExp(nationality, "i")});
  }

  // SAT filtering
  if (sat_score_max || sat_score_min) {
    if (!sat_score_min) {
      sat_score_min = 0
    }
    if (!sat_score_max) {
      sat_score_max = 2500
    }
    query.where('sat_score').gt(sat_score_min - 1).lt(sat_score_max);
  }

  // Toefl filtering
  if (toefl_score_max || toefl_score_min) {
    if (!toefl_score_min) {
      toefl_score_min = 0
    }
    if (!toefl_score_max) {
      toefl_score_max = 2500
    }
    query.where('toefl_score').gt(toefl_score_min - 1).lt(toefl_score_max);
  }

  // ACT filtering
  if (act_score_max || act_score_min) {
    if (!act_score_min) {
      act_score_min = 0
    }
    if (!act_score_max) {
      act_score_max = 2500
    }
    query.where('act_score').gt(act_score_min - 1).lt(act_score_max);
  }

  // Age filtering
  if (age_max || age_min) {
    if (!age_min) {
      age_min = 0
    }
    if (!age_max) {
      age_max = 100
    }
    query.where('age').gt(age_min - 1).lt(age_max);
  }

  // cm (height) filtering
  if (cm_max || cm_min) {
    if (!cm_min) {
      cm_min = 0
    }
    if (!cm_max) {
      cm_max = 250
    }
    query.where('cm').gt(cm_min - 1).lt(cm_max);
  }

  // kg (weight) filtering
  if (kg_max || kg_min) {
    if (!kg_min) {
      kg_min = 0
    }
    if (!kg_max) {
      kg_max = 1000
    }
    query.where('kg').gt(kg_min - 1).lt(kg_max);
  }

  query.//sort({_id:-1}).
  select('name_first name_last age gender positions nationality sat_score toefl_score act_score presentation birth_date phone_number email skype cm kg avatar_filename').exec(
    function (error, players) {
      if (error) {
        console.error(error);
      }
      res.send({
        players: players
      })
    }
  );

});

app.get('/playerz', (req, res) => {
  Player.find({}, 'name age presentation joined position toefl sat', function (error, players) {
    if (error) {
      console.error(error);
    }
    res.send({
      players: players
    })
  }).sort({_id: -1})
});

app.post('/add_player', (req, res) => {

  console.log("Adding player")

  let new_player = new Player({
    name_first: req.body.name_first,
    name_last: req.body.name_last,
    age: req.body.age,
    gender: req.body.gender,
    presentation: req.body.presentation,
    birth_date: req.body.birth_date,
    join_date: req.body.join_date,
    nationality: req.body.nationality,
    positions: req.body.positions,
    toefl_score: req.body.toefl_score,
    sat_score: req.body.sat_score,
    act_score: req.body.act_score,
    phone_number: req.body.phone_number,
    email: req.body.email,
    skype: req.body.skype,
    cm: req.body.cm,
    kg: req.body.kg,
    youtube_links: req.body.youtube_links
  });

  new_player.save(function (error) {
    if (error) {
      res.send(error);
    }
    res.send({
      success: true
    })
  })
});

app.put('/player/:id', (req, res) => {
  Player.findById(req.params.id, function (error, player) {
    if (error) {
      console.error(error);
    }

    if (req.body.name_first) {
      player.name_first = req.body.name_first
    }
    if (req.body.name_last) {
      player.name_last = req.body.name_last
    }
    if (req.body.age) {
      player.age = req.body.age
    }
    if (req.body.presentation) {
      player.presentation = req.body.presentation
    }
    if (req.body.nationality) {
      player.nationality = req.body.nationality
    }
    if (req.body.join_date) {
      player.join_date = req.body.join_date
    }
    if (req.body.birth_date) {
      player.birth_date = req.body.birth_date
    }
    if (req.body.positions) {
      player.positions = req.body.positions
    }
    if (req.body.toefl_score) {
      player.toefl_score = req.body.toefl_score
    }
    if (req.body.sat_score) {
      player.sat_score = req.body.sat_score
    }
    if (req.body.phone_number) {
      player.phone_number = req.body.phone_number
    }
    if (req.body.email) {
      player.email = req.body.email
    }
    if (req.body.youtube_links) {
      player.youtube_links = req.body.youtube_links
    }
    if (req.body.kg) {
      player.kg = req.body.kg
    }
    if (req.body.cm) {
      player.cm = req.body.cm
    }

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
  }, function (err, player) {
    if (err)
      res.send(err)
    res.send({
      success: true
    })
  })
});

app.delete('/player', (req, res) => {
  let db = req.db;
  Player.remove({}, function (err, player) {
    if (err)
      res.send(err);
    res.send({
      success: true
    })
  })
});

// ALL DATA
app.get('/player/:id', (req, res) => {
  Player.findById(req.params.id, 'name_first name_last age gender positions nationality sat_score toefl_score act_score presentation birth_date phone_number email skype cm kg avatar_filename youtube_links', function (error, player) {
    if (error) {
      console.error(error);
    }
    res.send(player);
  })
});

app.listen(process.env.PORT || 8081)
