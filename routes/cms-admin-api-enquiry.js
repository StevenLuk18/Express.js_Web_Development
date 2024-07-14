var express = require('express');
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
    const sysoperator = client.db("travel")
    /* const data = await sysoperator.collection('member').find({$or:[{mpemail:searchEmail},{_id: new ObjectId(stringid)}]}).toArray() */
    const data = await sysoperator.collection('contactus').findOne({$or:[{ctemail:searchEmail},{ctname:searchName},{ctsubject:searchSubject}]})
    console.log(data)
    if (data) {
    res.json({
      _id:data._id,
      ctname: data.ctname,
      ctdate: data.ctdate,
      ctemail: data.ctemail,
      ctsubject: data.ctsubject,
      ctmessage: data.ctmessage
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