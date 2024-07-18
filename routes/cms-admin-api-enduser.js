var express = require('express');
var router = express.Router();
var path = require('path');

/* create db entries. */
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
const multer = require('multer');
const upload = multer({dest:'tmp/', limits: {fileSize:1024*1024 /* in bytes */}}); //dest 可自己define
const fs = require('fs');

router.use((req, res, next) => {
  res.locals.currUser = req.session.authCmsUser;
  next();
  });

router.get('/', (req, res, next) => {
  user_name = req.session.authCmsUser //set variable as the session

  if (!user_name) res.sendFile(path.join(__dirname,'..','public','CMSAdminLogin.html'));
  else res.sendFile(path.join(__dirname,'..','private_web','CMSAdminApi_enduser.html'));

}).get('/get-auth-user', (req, res) => {

  if (req.session.authCmsUser) {
    res.json(req.session.authCmsUser);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}).post('/enduserSearch' , async (req, res) => {
  
  const {searchName} = req.body
  console.log('Search loading')

  try{
    await client.connect()
    const db = client.db("travel")
    const data = await db.collection('enduser').findOne({eulogin:searchName})
    console.log(data)
    if (data) {
    res.json({
      _id:data._id,
      eulogin:data.eulogin,
      eupswd: data.eupswd,
      euname:data.euname,
      euprofile:data.euprofile,
      eucrdate:data.eucrdate,
      euimage:data.euimage
    })
  } else {
      res.status(404).json('Please confirm your inputs are correct !!!')
    }

  } catch (err){
    console.log(err)
  } finally {
    await client.close()
  }
})
        
module.exports = router;
