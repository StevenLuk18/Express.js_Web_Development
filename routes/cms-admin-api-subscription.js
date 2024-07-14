var express = require('express');
var router = express.Router();
var path = require('path');

/* create db entries. */
const { MongoClient, ObjectId } = require('mongodb');
const { stringify } = require('querystring');
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

router.use((req, res, next) => {
  res.locals.currUser = req.session.authCmsUser;
  next();
  });

router.get('/', (req, res, next) => {
  user_name = req.session.authCmsUser //set variable as the session

  if (!user_name) res.sendFile(path.join(__dirname,'..','public','CMSAdminLogin.html'));
  else res.sendFile(path.join(__dirname,'..','private_web','CMSAdminApi_subscription.html'));

}).get('/get-auth-user', (req, res) => {

  if (req.session.authCmsUser) {
    res.json(req.session.authCmsUser);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}).post('/subscriptionSearch', async (req, res, next) => {

  const {searchMethod, searchEmail ,searchId} = req.body
  console.log('Search loading')

  /* const stringid = JSON.stringify(searchId) */
 
  try{
    await client.connect()
    const db = client.db('travel')
    /* const data = await db.collection('subscribe').findOne({$or:[{ sbemail: searchEmail },{ _id: new ObjectId(stringid)}]}) */
    const data = await db.collection('subscribe').findOne({ sbemail: searchEmail})
  

    if(data){
      res.json({
        _id:data._id,
        sbemail:data.sbemail,
        sbdate:data.sbdate
      })

    } else {
      console.log('No data found');
      res.status(404).json('Please confirm your inputs are correct !!!');
    }

  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }

})

module.exports = router;