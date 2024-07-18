var express = require('express');
var router = express.Router();

/* create db entries. */
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);


router.get('/', async (req, res) => {
  if (req.session.authUser) {

    console.log(`${req.session.authUser[2]} is logging out!`)
    // del user info from session
    await delete req.session.authUser;
    // destory session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).send('Error logging out');
      } else {
        res.redirect('/');
      }
    });
  } else {
    // if never in login status
    res.redirect('/');
  }
})


module.exports = router