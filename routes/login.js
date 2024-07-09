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
            req.session.authUser = [data._id, data.mpname ,data.mpusername ,data.mppswd];
            console.log(req.session.authUser);
            res.redirect('/login');
        } 
        
    return res.sendFile(path.join(__dirname,'..','public','404_login.html'));

    } catch {(err) => {
        console.log(err.name, err.message)
        return next(err)
    }} finally {
        await client.close();
    }
});

module.exports = router