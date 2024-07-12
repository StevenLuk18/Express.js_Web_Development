var express = require('express');
var router = express.Router();
var path = require('path');

/* create db entries. */
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);


router.get('/', (req,res, next) => {
    res.redirect('/');
}).post('/', async (req, res , next) => {

    const {NameOrEmail , mppswd} = req.body

    try {
        await client.connect()
       
        data = await client.db("travel").collection('member').findOne({mpemail:NameOrEmail, mppswd:mppswd});
        if (data) {
            req.session.authUser = [data._id, data.mpname ,data.mpusername, data.mpemail, data.mppswd, data.mpgender];

            req.session.userCities = [data.mpchina , data.mpjapan, data.mpkorean, data.mptaiwan, data.mpeurope, data.mpusa, data.mpengland, data.mpcanada, data.mpcntyother, data.mpcntyothdesc];
            
            req.session.userTrans = [data.mpairplan, data.mpcruise, data.mptrain, data.mprail, data.mptranother, data.mptranothdesc, data.mpimagepath];
                        
            res.redirect('/login');
        } else {
        
            res.sendFile(path.join(__dirname,'..','public','404_login.html'));
        }

    } catch (err) {
        console.log(err.name, err.message)
        return next(err)
    } finally {
        await client.close();
    }
}).get('/get-auth-user', (req, res) => {

    if (req.session.authUser) {

        res.json({
            authUser: req.session.authUser,
            userCities: req.session.userCities,
            userTrans: req.session.userTrans
          });
      /*   res.json(req.session.userCities);
        res.json(req.session.userTrans); */

    } else {

        res.status(401).json({ error: 'Unauthorized' });

    }});

module.exports = router;