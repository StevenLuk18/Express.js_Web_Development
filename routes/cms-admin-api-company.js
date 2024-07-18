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
  else res.sendFile(path.join(__dirname,'..','private_web','CMSAdminApi_company.html'));

}).get('/get-auth-user', (req, res) => {

  if (req.session.authCmsUser) {
    res.json(req.session.authCmsUser);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}).post('/companySearch', async (req, res) => {
  
  const {searchName, searchEmail, searchTel} = req.body
  console.log('Search loading')

  /* const stringid = JSON.stringify(searchId) */
  
  try{

    await client.connect()
    const db = client.db("travel")
    const data = await db.collection('company').findOne({$or:[{cpname:searchName},{cptel:searchTel},{cpemail:searchEmail}]})
    console.log(data)
    if (data) {
    res.json({
      _id:data._id,
      cpname:data.cpname,
      cpadres: data.cpadres,
      cptel:data.cptel,
      cpemail:data.cpemail
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