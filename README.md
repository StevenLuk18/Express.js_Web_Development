# Backend Web Develop Project On A Travel Agency

Developed a backend API and database integration functions using Node.js, Express, and JavaScript. 
This allowed me to effectively fetch data from a MongoDB database and deliver a seamless user experience (UX) on the front end. 
Additionally, I integrated various add-on APIs, such as a CMS system, to enhance the website's functionality and user interface (UI).

## Webpage Structure
![image](https://github.com/user-attachments/assets/f48db50a-6922-43b8-9a5f-06dec2249520)

## Set-up

Setting up a database and designing the structure of the database is essential for this project.
We are using node.js with the module Express to create the needed API.

### Required Module
![image](https://github.com/user-attachments/assets/a7683173-c6d5-4a18-ab74-749bb83c3a51)

### Node.js

You can download Node.js here with [Node.js Pages](https://nodejs.org/zh-cn).

#### NPM (After installing Node.js)

*set up Express with its default files*:
```
npx express-generator --view=ejs <YourProjectName>
```

The word inside <> is your designated project name

*It is suggested to download nodemon*:

```
npm install nodemon
```


#### Why use Nodemon

1. *Automatic Restart*:
   
Nodemon automatically restarts the server when changes are detected in the application files, eliminating the need to stop and restart the server during development manually.

2. *Real-time Updates*:

Nodemon continuously monitors the files in the project directory and refreshes the browser or terminal when changes are made, providing a seamless development experience.

#### Customization on Nodemon
Nodemon allows you to customize the files and directories it monitors and the command used to start the server.

*In package.json file*:
```
"scripts": {
    "start": "node ./bin/www",
    "monstart": "nodemon ./bin/www"
  },
```
You can customize your command for starting the server. **In my case, it is monstart.**
```
npm run monstart
```
so that the server can be run.

### Database
> MongoDB

```
npm install mongodb
```

Use the below code to get MongoClient
> const MongoClient = require('mongodb').MongoClient;

> const {MongoClient} = require('mongodb');


## Backend application

### Login/Registration form

Design a pop-up Login/Registration form that allows users to log in. If the users don't have one, they can press register to create a new account.

**Login**

![image](https://github.com/user-attachments/assets/d5b779a0-d85d-4519-8007-9807ba245b25)

**Registration**

![image](https://github.com/user-attachments/assets/ddb66027-3c4f-46e2-ae4b-95bbbc377521)

#### API

**Create different APIs for different functionality**

![image](https://github.com/user-attachments/assets/37b1bdd3-4f78-4d8f-8419-ea381a24c79a)


Use API to connect MongoDB and find whether the login is valid or not

```
var express = require('express');
var router = express.Router();
var path = require('path');

/* create db entries. */
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);


router.get('/', (req,res, next) => {
    res.redirect('/');
}).post('/', async (req, res , next) => {

    const {NameOrEmail , mppswd} = req.body

    try {
        await client.connect()
       
        data = await client.db("travel").collection('member').findOne({mpemail:NameOrEmail, mppswd:mppswd});
        if (data) {
            req.session.authUser = [data._id, data.mpname ,data.mpusername, data.mpemail, data.mppswd, data.mpgender, data.mpimagepath];
          
            req.session.userCities = [{'China': data.mpchina} , {'Japan':data.mpjapan}, {'Korea':data.mpkorean}, {'Taiwan':data.mptaiwan}, {'Europe':data.mpeurope}, {'USA': data.mpusa}, {'England': data.mpengland}, {'Canada':data.mpcanada}, {'Others': data.mpcntyother}, data.mpcntyothdesc];

            req.session.userTrans = [{'Airplan': data.mpairplan}, {'Cruise': data.mpcruise}, {'Train': data.mptrain}, {'High-speed rail':data.mprail}, {'Others': data.mptranother}, data.mptranothdesc];

            req.session.imagePath = [data.mpimagepath]
            
            res.redirect('/login');
        } else {
        
            res.send('<script>history.back(); alert("Sorry, you entered incorrect email / password");</script>');}

    } catch (err) {
        console.log(err.name, err.message)
        return next(err)
    } finally {
        await client.close();
    }
})
```
*If valid, it will redirect to the API that is designed for the member.*
*If not valid, it will return the error message*

*At the same time, the API will mark down the session information for later usage.*

#### Register

*Check if the register username and email are taken*

*if not exist, the API will insert the registration data into MongoDB. That means create a account*
```
var express = require('express');
var router = express.Router();
var path = require('path');
const { validate } = require('jsonschema');

/* create db entries. */
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);

// Insrt date time
const datetime = new Date()
const hongKongTime = new Date(datetime.getTime() + (8 * 60 * 60 * 1000));

let schema = {
type: 'object',
properties: {
  mpemail: { type: 'string', format: 'email' },
  mppswd: { type: 'string', format: 'password' },
  mpusername: { type: 'string' },
  mpjoindate: { type: 'string', format: 'date-time' }
},
required: ['mpemail', 'mppswd', 'mpusername'],
additionalProperties: false
};


router.get('/', async (req, res, next) => {
    if (req.session.regUser) res.render('/');
    else res.render('/');

}).post('/', async (req, res, next) => {

    const {mpusername, mpemail, mppswd} = req.body;

    let result = validate(req.body, schema);

    if (!result.valid) {
    /* res.status(400).send(`Invalid request body: ${result.errors.map(e => e.message).join(', ')}`); */
    res.status(400).render('404_register', {err : result.errors.map(e => e.message)});
    return;
  }

    try {
    await client.connect()

    data = await client.db("travel").collection('member').findOne({$or:[{mpusername:mpusername} , {mpemail:mpemail}]});
        
        if (data) {
            res.send('<script>history.back(); alert("Sorry, your username or email has been taken!!!");</script>');
        } else {
            req.session.regUser = [req.body.mpemail, req.body.mpusername, req.body.mppswd];
            await client.db("travel").collection('member').insertOne({mpemail:mpemail,mppswd:mppswd,mpusername:mpusername,mpjoindate:hongKongTime});
            res.redirect('/');
        }

    } catch (err) {
        console.log(err.name, err.message)
        return next(err)
    
    } finally {
        await client.close();
    }

});

module.exports = router;
```

#### EJS

*If the users login, the API will render the EJS*

*With the variable*

*Session that saved when user loged in*
>req.session.authUser = [data._id, data.mpname ,data.mpusername, data.mpemail, data.mppswd, data.mpgender, data.mpimagepath];

Save the username in ***u_name*** which in the position 2 of the session
>{ u_name : user_name[2]}

![image](https://github.com/user-attachments/assets/d4ee83d5-a184-48c4-9412-5412199e313e)


There are serval ejs that created that designated for member view only.

![image](https://github.com/user-attachments/assets/d776550c-4617-4c7d-a37a-03ce474ed848)

*Once the users login, they will go into one of those EJS webpages*

**Added feature of using EJS**

Show the username inside the EJS web
![image](https://github.com/user-attachments/assets/120a4b10-530f-4827-8793-cbb3b006adfe)

**The code**:
![image](https://github.com/user-attachments/assets/64561853-fdf3-4feb-a98f-1251747cf369)

*Before login*

![image](https://github.com/user-attachments/assets/8436f95f-1296-4e2b-bdb9-276a43a6f65a)

#### Show logout and myprofile button

![image](https://github.com/user-attachments/assets/f50d3dc0-38ff-4a6d-9e4b-0df8417a7264)

**The code**:

![image](https://github.com/user-attachments/assets/372a48b4-ab51-4400-a9a4-1f965c86f3c2)

*Before login* 

![image](https://github.com/user-attachments/assets/2ca7b745-164a-410b-a79a-d2bccb2d1111)

### My Profile Edition

**User can edit and update their personal information**

![image](https://github.com/user-attachments/assets/2c859450-da95-4c0e-ba91-3ad928c6440f)

![image](https://github.com/user-attachments/assets/9b7151d9-9fef-448f-9d6b-3d8f8052f5f6)

![image](https://github.com/user-attachments/assets/a09d2619-79cc-4ec4-8fe1-75fe304d0076)

![image](https://github.com/user-attachments/assets/241a9ee0-37b5-4e02-b421-540b71805c87)

**Special Feature**

*The user can update their personal image, also preview their profile images*

```
npm install multer
```

![image](https://github.com/user-attachments/assets/9c6fb96e-0c2a-4285-8558-4c12bb01de75)

**The code**:

*Preview image*
![image](https://github.com/user-attachments/assets/5477d879-7fa9-46fb-94b7-6d4bcdb61f56)

