var express = require('express');
var router = express.Router();
var path = require('path');

/* create db entries. */
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);


router.get('/', (req,res, next) => {
    if (req.session.authUser) res.redirect('/'); //redirect a api
    else res.redirect('/');
        /* let msg = "Your Email or Password is incorrect~! Please login again ~"
        res.render('loginForm', {wrongLogPW : msg});} */ 
}).post('/', async (req, res , next) => {

    const {NameOrEmail , mppswd} = req.body

    try {
        await client.connect()
       
        data = await client.db("travel").collection('member').findOne({mpemail:NameOrEmail, mppswd:mppswd});
        if (data) {
            req.session.authUser = [data._id, data.mpname ,data.mpusername, data.mpemail, data.mppswd, data.mpgender, data.mpimagepath];

            req.session.userCities = [{'China': data.mpchina} , {'Japan':data.mpjapan}, {'Korea':data.mpkorean}, {'Taiwan':data.mptaiwan}, {'Europe':data.mpeurope}, {'USA': data.mpusa}, {'England': data.mpengland}, {'Canada':data.mpcanada}, {'Others': data.mpcntyother}, data.mpcntyothdesc];

            req.session.userTrans = [{'Airplan': data.mpairplan}, {'Cruise': data.mpcruise}, {'Train': data.mptrain}, {'High-speed rail':data.mprail}, {'Others': data.mptranother}, data.mptranothdesc];
            
            res.redirect('/login');
        } else {
        
            res.send('<script>history.back(); alert("Sorry, you entered incorrect email / password");</script>');}

    } catch {(err) => {
        console.log(err.name, err.message)
        return next(err)
    }} finally {
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