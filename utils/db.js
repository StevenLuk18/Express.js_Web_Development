// utils/db.js

//const { MongoClient } = require('mongodb');

//const uri = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
//const client = new MongoClient(uri);

//async function getCompanyInfo() {
//  try {
//    await client.connect();
//    const database = client.db('travel');
//    const collection = database.collection('company');
    
//    const companyInfo = await collection.findOne({});
//    return companyInfo;
//  } finally {
//    await client.close();
//  }
//}

//module.exports = { getCompanyInfo };