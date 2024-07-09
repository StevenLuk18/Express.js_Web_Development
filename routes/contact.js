var express = require('express');
const { rmSync } = require('fs');
var router = express.Router();
var path = require('path');
const { MongoClient } = require('mongodb');
const url = "mongodb://localhost:27017/";
let client;
var path = require('path');
/* const nodemailer = require('nodemailer'); */

// Add to validate the email input
const { validate } = require('jsonschema');
const { type } = require('os');

// set date time
const datetime = new Date()
const hongKongTime = new Date(datetime.getTime() + (8 * 60 * 60 * 1000));


// validation for sendQuery api
const schema_1 = {
  type: 'object',
  properties: {
    ctemail: { type: 'string', format: 'email' },
    ctname: { type: 'string' },
    ctdate: { type:'string', format: 'date-time'},
    ctsubject: { type: 'string' },
    ctmessage: { type: 'string' }
  },
  required: ['ctname', 'ctemail', 'ctsubject', 'ctmessage'],
  additionalProperties: false
};

// validation for subNews api
const schema_2 = {
  type: 'object',
  properties: {
    sbemail: { type: 'string', format:'email' },
  },
  required: ['sbemail'],
  additionalProperties: false
};

//Add to locals server, prevent lost session when changing api
router.use((req, res, next) => {
  res.locals.currUser = req.session.authUser;
  next();
});

router.get('/', (req, res, next) =>{
  
  user_name = req.session.authUser //set variable as the session

    if (!user_name) res.sendFile(path.join(__dirname,'..','public','contact.html'));
    else res.render(path.join('','mb','contact_mb'), {u_name : user_name[2]}); //Must add {u_name : req.session.user[2]}


}).post('/sendQuery', async (req, res, next) =>{
  const {ctname, ctemail, ctsubject, ctmessage} = req.body;

  const result = validate(req.body, schema_1);
  if (!result.valid) {
    res.status(400).send(`Invalid request body: ${result.errors.map(e => e.message).join(', ')}`);
    return;
  }


  try{
      client = await MongoClient.connect(url);
      const db = client.db('travel');
      const query = db.collection('contactus');
  
      // put data inside db
      await query.insertOne({ctemail:req.body.ctemail , ctname:req.body.ctname, ctdate:hongKongTime, ctsubject:req.body.ctsubject ,ctmessage:req.body.ctmessage})

      console.log('Query loaded in DB successfully!');
      res.send('Your Query has been sent!');
    } catch (err) {
      console.error('Error creating DB entry:', err);
      res.status(500).send('Failed to create DB entry');
    } finally {
      await client.close()
    }



}).post('/subNews', async (req, res, next) => {
  
  const result = validate(req.body, schema_2);
  if (!result.valid) {
    res.status(400).send(`Invalid request body: ${result.errors.map(e => e.message).join(', ')}`);
    return;
  }
  
  try{
    client = await MongoClient.connect('mongodb://localhost:27017');
    const db = client.db('travel');
    const subscription = db.collection('subscribe');

    // put data inside db
    await subscription.insertOne({sbemail:req.body.sbemail, sbdate:hongKongTime});

    console.log('subscription loaded in DB successfully!');
    // res.send('Your subscription has been sent!');
    res.render('subNews')
  } catch (err) {
    console.error('Error creating DB entry:', err);
    res.status(500).send('Failed to create DB entry');
  } finally {
    await client.close();
  }

});




module.exports = router