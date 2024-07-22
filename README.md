# Backend Web Develop Project On A Travel Agency

Developed a backend API and database integration functions using Node.js, Express, and JavaScript. 
This allowed me to effectively fetch data from a MongoDB database and deliver a seamless user experience (UX) on the front end. 
Additionally, I integrated various add-on APIs, such as a CMS system, to enhance the website's functionality and user interface (UI).

Main color for our website is: `#86B817`

## Webpage Structure
![image](https://github.com/user-attachments/assets/f48db50a-6922-43b8-9a5f-06dec2249520)

## Set-up

Setting up a database and designing the structure of the database is essential for this project.
We are using ***node.js*** with the module ***Express*** to create the needed ***API***.

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

### EJS

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

![image](https://github.com/user-attachments/assets/f8b269b1-587a-468a-a9d2-004709e7ca63)

![image](https://github.com/user-attachments/assets/e69b50c1-39a8-4d85-846e-95968995d154)

![image](https://github.com/user-attachments/assets/a09d2619-79cc-4ec4-8fe1-75fe304d0076)

![image](https://github.com/user-attachments/assets/241a9ee0-37b5-4e02-b421-540b71805c87)

**Special Feature**

*The user can update their personal image, also preview their profile images*

```
npm install multer
```

![image](https://github.com/user-attachments/assets/ddd448b7-2064-4f8a-b1c4-c8241a4d0746)


**The code**:

*Preview image*

![image](https://github.com/user-attachments/assets/5477d879-7fa9-46fb-94b7-6d4bcdb61f56)

*Third-party module -- multer*

*Multer Set-up (After installation)*

![image](https://github.com/user-attachments/assets/6fb0defd-69a9-4e8b-ab4f-44c026c62518)

**Upload the image to the designated folder**

![image](https://github.com/user-attachments/assets/2c063897-ef96-4188-8db8-16a7da15aa57)

*In my case, it is public/images/member/'FileName'*

**Get the preview image from the path that saved inside the MongoDB**

![image](https://github.com/user-attachments/assets/b2e74885-b40f-40e5-b2d4-f440f5764688)

*Get the data from API and insert into the image's src attribute*

![image](https://github.com/user-attachments/assets/99982929-9c54-4d77-8ad4-8d05c8f1ae31)

*imagePath is the session saved from the login API*

### Testimonial

This web feature can let the users edit their comment on their travel trip

![image](https://github.com/user-attachments/assets/eeca1851-2143-45c4-8722-ea831bf1d758)

![image](https://github.com/user-attachments/assets/5a896f97-1cfd-47ef-be3d-9f94cbcbce05)

```
npm install handsontable
```

### CMS Login System

*Designed for simulating backend CMS*

![image](https://github.com/user-attachments/assets/bd6d9033-7c26-40c0-8289-c6d5d12fb67c)

#### CMS structure

*CMS Login User Design*

![image](https://github.com/user-attachments/assets/6dac7c5e-ba18-4abc-8898-c691698e2ff2)

*With system level role field that could restrict login user's access*

```
switch (system_level) {
      case 'A':
        let admin_op = document.querySelectorAll('.authUser-op-a')
        if (admin_op) {
          admin_op.forEach((op) => {
          op.parentNode.removeChild(op);})}
        break;
      
      case 'S':
        let sup_op = document.querySelectorAll('.authUser-op-s')
        if (sup_op) {
          sup_op.forEach((op) => {
          op.parentNode.removeChild(op);})}

        let admin_op2 = document.querySelectorAll('.authUser-op-a')
        if (admin_op2) {
          admin_op2.forEach((op) => {
          op.parentNode.removeChild(op);})}

          let hideColl = document.querySelector('.dashboard-container.allColl')
          if (hideColl) {hideColl.classList.toggle('hidden')}
  
          let hideMbIdLabel = document.querySelector('label[for="member-search-id"]')
          let hideMbIdRadio = document.getElementById('member-search-id')
          if (hideMbIdLabel) {hideMbIdLabel.classList.toggle('hidden')}
          if (hideMbIdRadio) {hideMbIdRadio.classList.toggle('hidden')}
  
          let hideSubIdLabel = document.querySelector('label[for="subscription-search-id"]')
          let hideSubIdRadio = document.getElementById('subscription-search-id')
          if (hideSubIdLabel) {hideSubIdLabel.classList.toggle('hidden')}
          if (hideSubIdRadio) {hideSubIdRadio.classList.toggle('hidden')}
  
          let hideEnqIdLabel = document.querySelector('label[for="enquiry-search-id"]')
          let hideEnqIdRadio = document.getElementById('enquiry-search-id')
          if (hideEnqIdLabel) {hideEnqIdLabel.classList.toggle('hidden')}
          if (hideEnqIdRadio) {hideEnqIdRadio.classList.toggle('hidden')}
  
          let hidePkIdLabel = document.querySelector('label[for="package-search-id"]')
          let hidePkIdRadio = document.getElementById('package-search-id')
          if (hidePkIdLabel) {hidePkIdLabel.classList.toggle('hidden')}
          if (hidePkIdRadio) {hidePkIdRadio.classList.toggle('hidden')}
        
        break;
      
      case 'O':
        
        let admin_op3 = document.querySelectorAll('.authUser-op-a')
        if (admin_op3) {
          admin_op3.forEach((op) => {
          op.parentNode.removeChild(op);})}
        
        let sup_op2 = document.querySelectorAll('.authUser-op-s')
        if (sup_op2) {
          sup_op2.forEach((op) => {
          op.parentNode.removeChild(op);})}
        
        let op_op = document.querySelectorAll('.authUser-op-o')
        if (op_op) {
          op_op.forEach((op) => {
          op.parentNode.removeChild(op)})}

        let op_aside = document.getElementById('aside-authUser')
        if(op_aside) op_aside.style.display = 'none'

        let hideColl2 = document.querySelector('.dashboard-container.allColl')
        if (hideColl2) {hideColl.classList.toggle('hidden')}

        let hideMbIdLabel2 = document.querySelector('label[for="member-search-id"]')
        let hideMbIdRadio2 = document.getElementById('member-search-id')
        if (hideMbIdLabel2) {hideMbIdLabel.classList.toggle('hidden')}
        if (hideMbIdRadio2) {hideMbIdRadio.classList.toggle('hidden')}

        let hideSubIdLabel2 = document.querySelector('label[for="subscription-search-id"]')
        let hideSubIdRadio2 = document.getElementById('subscription-search-id')
        if (hideSubIdLabel2) {hideSubIdLabel.classList.toggle('hidden')}
        if (hideSubIdRadio2) {hideSubIdRadio.classList.toggle('hidden')}

        let hideEnqIdLabel2 = document.querySelector('label[for="enquiry-search-id"]')
        let hideEnqIdRadio2 = document.getElementById('enquiry-search-id')
        if (hideEnqIdLabel2) {hideEnqIdLabel.classList.toggle('hidden')}
        if (hideEnqIdRadio2) {hideEnqIdRadio.classList.toggle('hidden')}

        let hidePkIdLabel2 = document.querySelector('label[for="package-search-id"]')
        let hidePkIdRadio2 = document.getElementById('package-search-id')
        if (hidePkIdLabel2) {hidePkIdLabel.classList.toggle('hidden')}
        if (hidePkIdRadio2) {hidePkIdRadio.classList.toggle('hidden')}

        break;

        }
  })
  .catch(error => console.error('Error fetching company data:', error));
```

**Different HTML webs for differnt functionality**

![image](https://github.com/user-attachments/assets/7d8b7ef4-9a8e-47f9-a410-908a6d9f81aa)

**With relative API**

![image](https://github.com/user-attachments/assets/3c632bce-c835-44eb-80b7-2bbb42fc254e)

**The main page of Backend CMS**

![image](https://github.com/user-attachments/assets/71114f9d-58a1-4a20-bebf-b97b3c8b0221)

#### Key function

*Search/Update/Add/Delete*

***CRUD***

*In Authorize User Section*

![image](https://github.com/user-attachments/assets/00cbd778-69a9-4618-929f-0dab6d4a76f1)

##### Search

*Use fetch to get MongoDB data*

![image](https://github.com/user-attachments/assets/26b178cc-00d8-4c2a-bbe2-47abb823f3e7)

*After fetching the needed data, the result will show out by using innerHTML*
```
if (response.ok) {
return response.json().then(data => {
   const searchResult = 
      `< &nbsp;Searched sysopname: *${data.searchedName}*&nbsp; > <br/> 
      < &nbsp;Searched sysoppswd: *${data.searchedPw}*&nbsp; > <br/> 
      < &nbsp;Searched syslevel: *${data.searchedLevel}*&nbsp; >` ;

document.getElementById('searchResult').innerHTML = searchResult;
```

*API*

![image](https://github.com/user-attachments/assets/3c797df1-70ed-4005-abc0-bcfec867d89a)

*Actual effect*

![image](https://github.com/user-attachments/assets/b8a7e4b7-4fca-42e0-b622-3651379a8c50)

##### Update

Same as the search one but use *replaceOne* in API

```
await db.replaceOne({_id:data._id}, data);
```

More Detail in [ [Update feature detail](https://github.com/StevenLuk18/backendProject/blob/c93465b2df4e26764e9ff648d692654c7d7f03a7/routes/cms-admin-api-authUser.js) ]

*Actual effect*

![image](https://github.com/user-attachments/assets/27c7b34c-89d8-4b90-b650-e992e3b78388)


##### Add

```
await db.insertOne(
   {sysopname: addordelNameReal, sysoppswd: addordelPwReal,syslevel: addordelLevelReal}
)
```

More Detail in [ [Add feature detail](https://github.com/StevenLuk18/backendProject/blob/c93465b2df4e26764e9ff648d692654c7d7f03a7/routes/cms-admin-api-authUser.js) ]

*Actual effect*

![image](https://github.com/user-attachments/assets/65cc6c1d-9647-4955-9a4f-aecd2da49255)


##### Delete

```
await db.deleteOne({_id: data._id})
```

More Detail in [ [Delete feature detail](https://github.com/StevenLuk18/backendProject/blob/c93465b2df4e26764e9ff648d692654c7d7f03a7/routes/cms-admin-api-authUser.js) ]

*Actual effect*

![image](https://github.com/user-attachments/assets/21fba5fa-a314-41b1-a62b-f9662ef4ed7a)


*In enduser section*

_fetch data from the MongoDB database and get the preview image path_

```
return response.json().then(data => {
            const searchResult =
            `< &nbsp;Searched _id: *${data._id}*&nbsp; > <br/> 
            < &nbsp;Searched eulogin: *${data.eulogin}*&nbsp; > <br/> 
            < &nbsp;Searched eupswd: *${data.eupswd}*&nbsp; > <br/>
            < &nbsp;Searched euname: *${data.euname}*&nbsp; > <br/>
            < &nbsp;Searched euprofile: *${data.euprofile}*&nbsp; > <br/>
            < &nbsp;Searched eucrdate: *${data.eucrdate}*&nbsp; > <br/>
            < &nbsp;Searched euimage: *${data.euimage}*&nbsp; > <br/>`
            
            document.getElementById('searchResult').innerHTML = searchResult;
            document.getElementById('output').src = data.euimage;
```

*The preview image effect*

![image](https://github.com/user-attachments/assets/fb3f59cc-cd54-453f-8efe-b00fdbff56f5)

## Credit

Image credit from https://www.freepik.com/

[enduser-image](https://www.freepik.com/free-photo/unbothered-guy-pointing-finger-up-looking-careless_9696638.htm#fromView=search&page=1&position=2&uuid=8c05457b-4326-4262-b1be-f908d25aee5f)

[enduser-image](https://www.freepik.com/free-photo/business-finance-people-concept-surprised-impressed-asian-male-entrepreneur-office-manager-blue-shirt-pointing-upper-right-corner-look-amazed-say-wow-stare-camera-awe_16800470.htm#fromView=search&page=1&position=5&uuid=db9cee98-9ccd-4dda-8ccd-046a5a57a28f)

[member-image](https://www.freepik.com/free-ai-image/3d-cartoon-character_170851002.htm#fromView=search&page=1&position=2&uuid=e0c31614-b1c7-4a3a-ae81-98d2e8f6ba96)

[member-image](https://www.freepik.com/free-photo/close-up-fresh-apple_6818030.htm#fromView=search&page=1&position=1&uuid=49fc9e27-ab7f-44b6-9634-3da84f9ca1ea)

[member-image](https://www.freepik.com/free-vector/sticker-template-with-girl-standing-posing-cartoon-character-isolated_18233319.htm#fromView=search&page=1&position=25&uuid=401282c6-2b38-446b-98a1-d5a4960b1670)

[member-image](https://www.freepik.com/free-vector/sticker-template-with-boy-cartoon-character-isolated_16854036.htm#fromView=search&page=1&position=7&uuid=473a8096-713d-4e6a-ba64-568e9127edf8)

