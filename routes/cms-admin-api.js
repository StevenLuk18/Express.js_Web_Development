var express = require('express');
const { ClientEncryption } = require('mongodb');
var router = express.Router();
var path = require('path');

/* create db entries. */
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

router.use((req, res, next) => {
  res.locals.currUser = req.session.authCmsUser;
  next();
  });

router.get('/', (req, res, next) => {
  user_name = req.session.authCmsUser //set variable as the session

  if (!user_name) res.sendFile(path.join(__dirname,'..','public','CMSAdminLogin.html'));
  else res.sendFile(path.join(__dirname,'..','private_web','CMSAdminApi_main.html'));

}).post('/', async (req, res, next) => {

  const {acname, pw} = req.body

  try{
    await client.connect()
      
    data = await client.db("travel").collection('sysoperator').findOne({sysopname:acname, sysoppswd:pw});

  if (data) {
    req.session.authCmsUser = [data._id, data.sysopname ,data.sysoppswd, data.syslevel];
    console.log(req.session.authCmsUser);
    res.redirect('/cms-admin-api');
  } else {
      res.send('<script>history.back(); alert("Sorry, you entered incorrect username / password");</script>');}

  } finally {
    await client.close();
  }
}).get('/get-auth-user', (req, res) => {

  if (req.session.authCmsUser) {
    res.json(req.session.authCmsUser);
  
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}).get('/logout', async (req, res, next) => {
  // CMS user logout func

  if(req.session.authCmsUser) {

    console.log(`${req.session.authCmsUser[1]} is logging out!`)
    // del user info from session
    await delete req.session.authCmsUser
    // destory session
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).send('Error logging out');
      } else {
        res.redirect('/cms-admin-api');
      }
    })
  } else {
    res.redirect('/cms-admin-api');
  }
}).get('/numOfmembers', async (req, res) => {
  console.log('entering numOfmember api')
  await client.connect()
  const db = client.db('travel')
  const data = await db.collection('member').countDocuments()
  res.json(data) 
}).get('/numOfsubs', async (req, res) => {
  console.log('entering numOfsubs api')
  await client.connect()
  const db = client.db('travel')
  const data = await db.collection('subscribe').countDocuments()
  res.json(data)
}).get('/numOfenqus', async (req,res) => {
  console.log('entering numOfenqus api')
  await client.connect()
  const db = client.db('travel')
  const data = await db.collection('contactus').countDocuments()
  res.json(data)
}).get('/numOftesti', async (req,res) => {
  console.log('entering numOftesti api')
  await client.connect()
  const db = client.db('travel')
  const data = await db.collection('testimonial').countDocuments()
  res.json(data)
}).get('/numOfpacks', async (req,res) => {
  console.log('entering numOfpacks api')
  await client.connect()
  const db = client.db('travel')
  const data = await db.collection('package').countDocuments()
  res.json(data)
}).get('/alldb', async (req,res) => {
    try {
      await client.connect()
      const db = client.db("travel");
      const collectionNames = await db.listCollections().toArray();
      res.json(collectionNames.map(c => c.name));
    } catch (error) {
      console.error('Error fetching enduser data:', error);
      res.status(500).json({ error: 'Failed to fetch enduser data'});
    } 
});

module.exports = router;