// for show testimonial information 

const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

// MongoDB connection details
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'travel';
const collectionName = 'testimonial';

// Connect to MongoDB
const ObjectId = require('mongodb').ObjectId;                                  // 1
const client = new MongoClient("mongodb://localhost:27017/"); 

// get testimonial and retrieve member name and image path 
router.get('/', async (req, res) => {
  try {
// console.log(">>>>>>>>>>>>>>>>>>>>>>> here I am")    ;
    await client.connect();
    const travDb = client.db("travel");                   
    const testimonial = await travDb.collection("testimonial").find().toArray();
// console.log("abc", testimonial);
 
    const mbrCol = travDb.collection("member");
    const member = [];
    for (let t of testimonial) {
      let m = await mbrCol.findOne({mpemail : t.tmname});
// console.log("mem", member);     
      if (m!=null) member.push({
        mpname: m.mpname,
        mpimagepath: m.mpimagepath,
        tmdate: t.tmdate,
        tmcountry: t.tmcountry,
        tmtest: t.tmtest,
      });
//  else console.log({mpemail : t.tmname}, "not found");
    };
    res.json(member)

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;