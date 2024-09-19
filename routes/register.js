var express = require('express');
var router = express.Router();
var path = require('path');
const { validate } = require('jsonschema');

/* create db entries. */
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

// Insert date time
const hongKongTime = new Date(new Date().getTime() + (8 * 60 * 60 * 1000));

let schema = {
type: 'object',
properties: {
  mpemail: { type: 'string', format: 'email' },
  mppswd: { type: 'string', format: 'password' },
  mpusername: { type: 'string' },
  mpjoindate: { type: 'string', format: 'date-time' }
},
required: ['mpemail', 'mppswd', 'mpusername'],
additionalProperties: false
};


router.post('/', async (req, res, next) => {

    const {mpusername, mpemail, mppswd} = req.body;

    let result = validate(req.body, schema);

    if (!result.valid) {
    /* res.status(400).send(`Invalid request body: ${result.errors.map(e => e.message).join(', ')}`); */
    res.status(400).render('404_register', {err : result.errors.map(e => e.message)});
    return;
  }

    try {
    await client.connect()

    data = await client.db("travel").collection('member').findOne({$or:[{mpusername:mpusername} , {mpemail:mpemail}]});
        
        if (data) {
            res.send('<script>history.back(); alert("Sorry, your username or email has been taken!!!");</script>');
        } else {
            req.session.regUser = [req.body.mpemail, req.body.mpusername, req.body.mppswd];
            await client.db("travel").collection('member').insertOne({mpemail:mpemail,mppswd:mppswd,mpusername:mpusername,mpjoindate:hongKongTime.toISOString()});
            res.redirect('/');
        }

    } catch (err) {
        console.log(err.name, err.message)
        return next(err)
    
    } finally {
        await client.close();
    }

});

module.exports = router;