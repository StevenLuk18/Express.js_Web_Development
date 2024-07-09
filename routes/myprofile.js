var express = require('express');
var router = express.Router();
var path = require('path');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

router.use((req, res, next) => {
    res.locals.currUser = req.session.authUser;
    next();
  });

router.get('/', (req, res, next) => {
    user_name = req.session.authUser //set variable as the session

    if (!user_name) res.sendFile(path.join(__dirname,'..','private_web','myprofile.html'));
    else res.render(path.join('','mb','myprofile_mb'), {u_name : user_name[2]}); //Must add {u_name : req.session.user[2]}

}).post('/infoUpdate', async (req, res, next) => {

    const { name, username, gender, pw2, email, favoriteCities, preferredTransport } = req.body;
    
    try {
      await client.connect();
      const db =client.db('travel').collection('member');
      let data = await db.findOne({Name: req.session.authUser[2]});
      if (data) {
      data.mpusername = req.body.username;
      data.mpname = req.body.name;
      data.mpgender = req.body.gender;
      data.mppswd = req.body.pw2;
      data.mpemail =req.body.email;
      
      // handle favCities
      req.body.favoriteCities = favCities

      Object.keys(favCities).foreach( el => {
        if ( el === req.body) {
          Object.keys(el).filter(key => {
            if(key.startsWith('Taiwan')) { data.mptaiwan = 'T';}
            if(key.startsWith('China')) { data.mpchina = 'T';}
            if(key.startsWith('Japan')) { data.mpjapan = 'T';}
            if(key.startsWith('Korean')) { data.mpkorean = 'T';}
            if(key.startsWith('Europe')) { data.mpeurope = 'T';}
            if(key.startsWith('USA')) { data.mpusa = 'T';}
            if(key.startsWith('England')) { data.mpengland = 'T';}
            if(key.startsWith('Canada')) { data.mpcanada = 'T';}
          })
        }
      });

      req.body.preferredTransport = favTransport

      Object.keys(favTransport).foreach( el => {
        if ( el === req.body) {
          Object.keys(el).filter(key => {
            if(key.startsWith('Airplan')) { data.mpairplan = 'T';}
            if(key.startsWith('Cruise')) { data.mpcruise = 'T';}
            if(key.startsWith('Train')) { data.mptrain = 'T';}
            if(key.startsWith('highspeedrail')) { data.mprail = 'T';}
          })
        }
      });      

      await db.replaceOne({_id:data._id}, data);
      }
      res.send(`Here are records changed!!!`)

  } finally {
      await client.close()
  }
});

module.exports = router;