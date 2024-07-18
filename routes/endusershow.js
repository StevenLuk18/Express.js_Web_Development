//  for show enduser (top travel guide/ about us) information on screen from mongodb collection testimonial

const express = require('express');
const { MongoClient } = require('mongodb');
const router = express.Router();

// MongoDB connection details
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'travel';
const collectionName = 'enduser';

// Connect to MongoDB
const ObjectId = require('mongodb').ObjectId;                         // 1
const client = new MongoClient("mongodb://localhost:27017/");         // define which drive of database or primary/secondly server etc.

// Retrieve data from the 'enduser' collection
router.get('/', async (req, res) => {
    await client.connect();
    const db = client.db("travel");                   
    const kln = db.collection("enduser");
    let data = await db.collection(collectionName).find({}, { projection: { _id: 0, euname: 1, euprofile: 1, euimage: 1 } }).toArray();
    res.send(data);
});

module.exports = router;