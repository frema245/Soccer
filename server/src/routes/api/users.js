const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const User = require('../../../models/user');

//POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  console.log(req.body.user);

  const user = req.body.user;

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }


  // Check if email is not already registered
  User.findOne({ email: user.email}, '', function (error, exists) {
    if (error) {
      console.error(error);
    }
    if (exists) {
      return res.json({ available: false })
      //return res.sendStatus(409);
    } else {

      console.log("SUCC");
      const finalUser = new User(user);
      finalUser.setPassword(user.password);
      return finalUser.save()
        .then(() => res.json({ user: finalUser.toAuthJSON(), available: true }));
    }
  });

});


// GET ALL USERS
router.get('/', auth.optional, (req, res, next) => {
  User.find({}, 'email', function (error, users) {
    if (error) { console.error(error); }
    res.send({
      users: users
    })
  }).sort({_id:-1})
});

router.delete('/', (req, res) => {
  User.remove({}, function(err, users){
    if (err)
      res.send(err);
    res.send({
      success: true
    })
  })
});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const { body: { user } } = req;

  console.log(req.body.user);

  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return res.sendStatus(400);

  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return User.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

module.exports = router;