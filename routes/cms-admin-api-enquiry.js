var express = require('express');
var router = express.Router();
var path = require('path');

/* create db entries. */
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

router.use((req, res, next) => {
  res.locals.currUser = req.session.authCmsUser;
  next();
  });

router.get('/', (req, res, next) => {
  user_name = req.session.authCmsUser //set variable as the session

  if (!user_name) res.sendFile(path.join(__dirname,'..','public','CMSAdminLogin.html'));
  else res.sendFile(path.join(__dirname,'..','private_web','CMSAdminApi_enquiry.html'));

}).get('/get-auth-user', (req, res) => {

  if (req.session.authCmsUser) {
    res.json(req.session.authCmsUser);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}).post('/enquirySearch', async (req, res) => {
  
  const {searchEmail, searchId, searchName, searchSubject} = req.body
  console.log('Search loading')

  /* const stringid = JSON.stringify(searchId) */
  
  try{

    await client.connect()
    const db = client.db("travel")
    let query = {}
  
      if (searchId) {
        if (typeof searchId === 'string' && searchId.length === 24) {
          query._id = new ObjectId(searchId)
        } else if (Array.isArray(searchId) && searchId.length === 12 && searchId.every(byte => typeof byte === 'number' && byte >= 0 && byte <= 255)) {
          query._id = new ObjectId(Buffer.from(searchId))
        } else if (typeof searchId === 'number' && Number.isInteger(searchId)) {
          query._id = searchId
        } else {
          res.status(400).json('Invalid searchId format')
        }
      }
  
      if (searchEmail) {
        query.ctemail = searchEmail
      }
  
      if (searchName) {
        query.ctname = searchName
      }

      if(searchSubject){
        query.ctsubject = searchSubject
      }
      
      const data = await db.collection('contactus').findOne(query)

      if (data) {
        const enquiryKeys = Object.keys(data).filter(key => key.startsWith('ct') || key.startsWith('_id'));
        const enquiryData = enquiryKeys.reduce((acc, key) => {
          acc[key] = data[key];
          return acc;
        }, {});
  
        res.json(enquiryData)

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