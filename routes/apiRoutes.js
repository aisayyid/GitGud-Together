const router = require("express").Router();
const db = require("../models");

// Route to take user inputs on the preferences page and input them into the User Profle table.
router.post("/profile", function (req, res) {
  console.log(req.body);
  db.Profile.create(req.body)
    .then(function (data) {
      res.json(data);
    })
    .catch(function (err) {
      res.status(401).json(err);
    });
});

router.get("/games", function (req, res) {
  db.Game.findAll({}).then(function (games) {
    res.json(games);
  });
});

// Route to retrieve User Preferences data and display them on the User Profile Page
router.get("/profile", function (req, res) {
  console.log(req.session.passport.user);
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    db.Profile.findOne({
      where: {
        UserId: req.session.passport.user
      }
      // limit: 1,
      // order: [[ "createdAt", "DESC" ]]
    }).then(function (dbProfile) {
      console.log(dbProfile);
      res.json(dbProfile);
    });
  }
});

router.get("/dashboardprofile", function(req, res) {
  console.log(req.session.passport.user);
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    db.Profile.findAll({
      where: {
        UserId: req.session.passport.user
      }
      // limit: 1,
      // order: [[ "createdAt", "DESC" ]]
    }).then(function(dbProfile) {
      console.log(dbProfile);
      res.json(dbProfile);
    });
  }
});

// Route to delete the most current User Preferences data that is displayed on the User Profile Page
router.delete("/profileDelete/:id", function (req, res) {
  console.log(req.params.id);
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    db.Profile.destroy({
      where: {
        id: req.params.id
      }
      // truncate: false
    }).then(function (dbProfile) {
      res.json(dbProfile);
    });
  }
});
router.put("/profileUpdate/:id", function (req, res) {
  console.log(req.params.id);
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    db.Profile.update(
      req.body, {
        where: {
          id: req.params.id
        }
      // truncate: false
      }).then(function (dbProfile) {
      res.json(dbProfile);
    });
  }
});

router.get("/dashboarddisplayusers", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    db.Profile.findAll({

    }).then(function(dbProfile) {
      console.log(dbProfile);
      res.json(dbProfile);
    });
  }
});

module.exports = router;