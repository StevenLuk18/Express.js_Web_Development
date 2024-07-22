var express = require('express');
var router = express.Router();
var path = require('path');

router.use((req, res, next) => {
  res.locals.currUser = req.session.authUser;
  next();
});

router.get('/', function(req, res, next) {

  user_name = req.session.authUser //set variable as the session
  
  if (!user_name) res.render('index'); 
  else res.render(path.join('','mb','index_mb'), { u_name : user_name[2]}) //Must add {u_name : req.session.user[2]}
  
});

module.exports = router;
