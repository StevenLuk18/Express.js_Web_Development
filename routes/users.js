var express = require('express');
var router = express.Router();
var path = require('path');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.sendFile(path.join(__dirname,'..','member_pages','myprofile.html'))
  //res.render('myprofile',{ name : req.session.user[2]})
  res.redirect('/')
});


module.exports = router;