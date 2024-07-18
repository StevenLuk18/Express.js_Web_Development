var createError = require('http-errors');
var express = require('express');
const {MongoClient} = require('mongodb');     // new add for display data dated 1/7/2024
var path = require('path');
const session = require('express-session'); //express-session
//var cookieParser = require('cookie-parser');
var logger = require('morgan');
const apiSettings = require('./api_setting')

const app = express();
const port = 3000;                            // new add dated 1/7/2024 

// new add dated 1/7/2024 
// MongoDB connection details 
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'travel';
const collectionName = 'company' ;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
// Middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(session({secret:'secret string', resave:false, saveUninitialized:true, cookie: {
  expires: new Date(Date.now() + 36000 * 1000) }}));// 10 hours from now

app.use(express.static(path.join(__dirname, 'public')));

// foreach api_setting file to get app.use() params
apiSettings.forEach( el => {
  app.use(el.route,require(el.file))
})

// add this API endpoint to retrieve company data  1/7/2024
app.get('/api/company', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db("travel");
    const company = await db.collection("company").findOne({});
    res.json(company);
    await client.close();
  } catch (error) {
    console.error('Error fetching company data:', error);
    res.status(500).json({ error: 'Failed to fetch company data'});
  }
});

// Get DB collection info
app.get('/api/alldb', async (req, res) => {
  try {
    const client = await MongoClient.connect(mongoUrl);
    const db = client.db("travel");
    const collectionNames = await db.listCollections().toArray();
    res.json(collectionNames.map(c => c.name));
    await client.close();
  } catch (error) {
    console.error('Error fetching enduser data:', error);
    res.status(500).json({ error: 'Failed to fetch enduser data'});
  }
})

// due to the app.listen had been called by bin/www, so no need at here 
//app.listen(port, () => {
//  console.log(`Server is running on port ${port}`);
//});

// end api endpoint 

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
