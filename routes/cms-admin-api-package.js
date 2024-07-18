var express = require('express');
var router = express.Router();
var path = require('path');

/* create db entries. */
const {MongoClient , ObjectId} = require('mongodb');

const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

router.use((req, res, next) => {
  res.locals.currUser = req.session.authCmsUser;
  next();
  });

router.get('/', (req, res, next) => {
  user_name = req.session.authCmsUser //set variable as the session

  if (!user_name) res.sendFile(path.join(__dirname,'..','public','CMSAdminLogin.html'));
  else res.sendFile(path.join(__dirname,'..','private_web','CMSAdminApi_package.html'));

}).get('/get-auth-user', (req, res) => {

  if (req.session.authCmsUser) {
    res.json(req.session.authCmsUser);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}).post('/packageSearch', async (req, res) => {

  console.log('Package search loading')

  const {searchId, searchName, searchCountry} = req.body

    
    try {
      await client.connect()
      const db = client.db('travel')
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
  
      if (searchName) {
        query.pkname = searchName
      }
  
      if (searchCountry) {
        query.pkcountry = searchCountry
      }
  
      const data = await db.collection('package').findOne(query)
      
      //Use reduce to store data
      if (data) {
        const packageKeys = Object.keys(data).filter(key => key.startsWith('pk') || key.startsWith('_id'));
        const packageData = packageKeys.reduce((acc, key) => {
          acc[key] = data[key];
          return acc;
        }, {});
  
        res.json(packageData)
      } else {
        res.status(404).json("Sorry, can't find the package!!!");
      }
    } catch (err) {
      console.log(err)
    } finally {
      await client.close()
    }
})


module.exports = router;