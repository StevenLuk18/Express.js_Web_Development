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
  else res.sendFile(path.join(__dirname,'..','private_web','CMSAdminApi_authUser.html'));

}).get('/get-auth-user', (req, res) => {

  if (req.session.authCmsUser) {
    res.json(req.session.authCmsUser);
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
}).get('/allRoles', async (req, res) => {
  try {
    await client.connect();
    const sysoperator = client.db("travel");
    const data = await sysoperator.collection('sysoperator').find({}).toArray();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'An error occurred while fetching data.' });
  } finally {
    await client.close();
  }
}).post('/sysopSearch', async (req, res) => {
  
  const {searchName, searchLevel} = req.body
  console.log('Search loading')
  
  try{

    client.connect()
    const sysoperator = client.db("travel")
    const data = await sysoperator.collection('sysoperator').findOne({$and:[{sysopname:searchName},{syslevel:searchLevel}]})
    console.log(data)
    
    if (data){
      res.json({
        searchedName:searchName,
        searchedPw: data.sysoppswd,
        searchedLevel:searchLevel,
    })} else {
      res.status(404).json('No data found!!! Could be Wrong User Name/ Operation Level')
    }

  } catch (err){
    console.log(err)
  } finally {
    await client.close()
  }
}).post('/sysopUpdate', async (req, res) => {

  console.log('Update loading')
   
  const {updateName, updatePw, updateLevel, updateNameReal, updatePwReal, updateLevelReal} = req.body

  try{
    client.connect()
    const sysoperator = client.db("travel")
    const db = sysoperator.collection('sysoperator')
    const data = await db.findOne({$and:[{sysopname:req.body.updateName},{sysoppswd:req.body.updatePw},{syslevel:req.body.updateLevel}]})
    console.log(data)
    if (data) {
        data.sysopname = updateNameReal
        data.sysoppswd = updatePwReal
        data.syslevel = updateLevelReal

        await db.replaceOne({_id:data._id}, data);

        res.json({
          updatedName: updateNameReal,
          updatedPw: updatePwReal,
          updatedLevel: updateLevelReal})
    } else {
      res.status(404).json("Sorry, can't find the user/incorrect password!!! You may search users first.");
    }
   } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }
}).post('/sysopAddDel', async (req,res) => {

  console.log('Add/Del loading')

  const {addordelAction, addordelName, addordelPw, addordelLevel} = req.body
  
  
    try{
      client.connect()
      const sysoperator = client.db("travel")
      const db = sysoperator.collection('sysoperator')
      const data = await db.findOne({sysopname:addordelName})
      if (!data) {
          if (addordelAction === 'add'){
            await db.insertOne(
              {sysopname: addordelName, sysoppswd: addordelPw,syslevel: addordelLevel}
            )
          } else if (addordelAction === 'del') {
            res.status(404).json("The user doesn't exist, please enter the correct one or check your spelling")
          }
          
          res.json({
            addordelAction: addordelAction,
            addordelName: addordelName, 
            addordelPw: addordelPw,
            addordelLevel: addordelLevel
          })
      } else { 
          if (addordelAction === 'add') {
            res.status(404).json("Sorry, the user name is taken!!! You may search the user first and retry.");
          } 
          else {

            await db.deleteOne({_id: data._id})

            res.json({
              addordelAction: addordelAction,
              addordelName: addordelName, 
              addordelPw: addordelPw,
              addordelLevel: addordelLevel
            })
          }
      };
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
  }

});




module.exports = router;