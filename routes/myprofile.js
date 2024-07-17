var express = require('express');
var router = express.Router();
var path = require('path');

const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
const multer = require('multer');
const upload = multer({dest:'tmp/', limits: {fileSize:1024*1024 /* in bytes */}}); //dest 可自己define
const fs = require('fs');


router.use((req, res, next) => {
    res.locals.currUser = req.session.authUser;
    next();
  });

router.get('/', (req, res, next) => {
    user_name = req.session.authUser //set variable as the session

    if (!user_name) res.redirect('/');
    else res.render(path.join('','mb','myprofile_mb'), {u_name : user_name[2]}); //Must add {u_name : req.session.user[2]}

}).post('/infoUpdate', upload.array('mbImageUp'), async (req, res, next) => {

  console.log('information updating ~')
     
    try {
      await client.connect();
      const db =client.db('travel').collection('member');
      let data = await db.findOne({mpemail: req.body.email});

        if (data) {

          // handle image upload //
          if (req.files.length > 0) {
            let newFileName
              for (let file of req.files) {
                console.log(file.filename)
                const fileExtension = path.extname(file.originalname);
                newFileName = `${req.body.email}${fileExtension}`;
                console.log(newFileName)
                fs.renameSync(path.join('tmp', file.filename), path.join('public', 'images', 'member',newFileName))
              }
            data.mpimagepath = `/images/member/${newFileName}`
          }
            

          data.mpusername = req.body.nickname;
          data.mpname = req.body.acname;
          data.mpgender = req.body.gender;
          data.mppswd = req.body.pw2;
          data.mpemail =req.body.email;
          data.mpcntyothdesc = req.body.othercountry;
          data.mptranothdesc = req.body.othertran;
          

          console.log(req.body)

          const favoriteCitiesArray = JSON.parse(req.body.favoriteCities);
          const preferredTransportArray = JSON.parse(req.body.preferredTransport);
          
          console.log(favoriteCitiesArray);
          console.log(preferredTransportArray);
          
          data.mpchina = 'F',
          data.mpjapan =  'F',
          data.mptaiwan = 'F',
          data.mpkorean = 'F',
          data.mpeurope = 'F',
          data.mpusa = 'F',
          data.mpengland = 'F',
          data.mpcanada = 'F',
          data.mpcntyother = 'F',
          data.mpairplan = 'F',
          data.mpcruise = 'F',
          data.mptrain = 'F',
          data.mprail = 'F',
          data.mptranother = 'F'

          await favoriteCitiesArray.forEach(el => {
            switch(el) {
              case 'Taiwan':
                data.mptaiwan = 'T';
                break;
              case 'China':
                data.mpchina = 'T';
                break;
              case 'Japan':
                data.mpjapan = 'T';
                break;
              case 'Korea':
                data.mpkorean = 'T';
                break;
              case 'Europe':
                data.mpeurope = 'T';
                break;
              case 'USA':
                data.mpusa = 'T';
                break;
              case 'England':
                data.mpengland = 'T';
                break;
              case 'Canada':
                data.mpcanada = 'T';
                break;
              case 'Others':
                data.mpcntyother = 'T';
                break;
            }
          });

          await preferredTransportArray.forEach(el => {
            switch(el) {
              case 'Airplan':
                data.mpairplan = 'T';
                break;
              case 'Cruise':
                data.mpcruise = 'T';
                break;
              case 'Train':
                data.mptrain = 'T';
                break;
              case 'High-speed rail':
                data.mprail = 'T';
                break;
              case 'Others':
                data.mptranother = 'T';
                break;
              }
          }) 

        await db.replaceOne({_id:data._id}, data);

          // send to front-end for updating new info
          res.json({
            password: req.body.pw2,
            email: req.body.email,
            nickname: req.body.nickname,
            gender: req.body.gender,

          })
        } 

  } finally {
      await client.close()
  }
})

module.exports = router;