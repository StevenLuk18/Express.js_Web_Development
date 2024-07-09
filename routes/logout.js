var express = require('express');
var router = express.Router();

/* create db entries. */
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);


router.get('/', (req, res) => {
  if (req.session.authUser) {

    console.log(`${req.session.authUser[2]} is logging out!`)
    // 從 session 中移除使用者資訊
    delete req.session.authUser;
    // 銷毀 session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).send('Error logging out');
      } else {
        res.redirect('/');
      }
    });
  } else {
    // 如果使用者尚未登入,則直接重導向至登入頁面
    res.redirect('/');
  }
});

module.exports = router