var express = require('express');
var router = express.Router();
var path = require('path');

/* create db entries. */
const { MongoClient, ObjectId } = require('mongodb');
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

router.use((req, res, next) => {
  res.locals.currUser = req.session.authCmsUser;
  next();
  });

router.get('/', (req, res, next) => {
  user_name = req.session.authCmsUser //set variable as the session

  if (!user_name) res.sendFile(path.join(__dirname,'..','public','CMSAdminLogin.html'));
  else res.sendFile(path.join(__dirname,'..','private_web','CMSAdminApi_member.html'));

}).get('/get-auth-user', (req, res) => {

  if (req.session.authCmsUser) {
    res.json(req.session.authCmsUser);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}).get('/allMbs', async (req, res) => {
  try {
    await client.connect();
    const sysoperator = client.db("travel");
    const data = await sysoperator.collection('member').find({}).toArray();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  } finally {
    await client.close();
  }
}).post('/memberSearch', async (req, res) => {
  
  const {searchMethod, searchEmail, searchId} = req.body
  console.log('Search loading')

  /* const stringid = JSON.stringify(searchId) */
  
  try{

    await client.connect()
    const sysoperator = client.db("travel")
    /* const data = await sysoperator.collection('member').find({$or:[{mpemail:searchEmail},{_id: new ObjectId(stringid)}]}).toArray() */
    const data = await sysoperator.collection('member').findOne({$or:[{mpemail:searchEmail},{_id:new ObjectId(searchId)}]})
    console.log(data)
    if (data) {
    res.json({
      _id:data._id,
      mpemail:data.mpemail,
      mppswd: data.mpname,
      mpname:data.mppswd,
      mpusername:data.mpusername,
      mpgender:data.mpgender,
      mpjoindate:data.mpjoindate,
      mpchina:data.mpchina,
      mpjapan:data.mpjapan,
      mpkorean:data.mpkorean,
      mptaiwan:data.mptaiwan,
      mpeurope:data.mpeurope,
      mpusa:data.mpusa,
      mpengland:data.mpengland,
      mpcanada:data.mpcanada,
      mpcntyother:data.mpcntyother,
      mpcntyothdesc:data.mpcntyothdesc,
      mpairplan:data.mpairplan,
      mpcruise:data.mpcruise,
      mptrain:data.mptrain,
      mprail:data.mprail,
      mptranother:data.mptranother,
      mptranothdesc:data.mptranothdesc,
      mpimagepath:data.mpimagepath,

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