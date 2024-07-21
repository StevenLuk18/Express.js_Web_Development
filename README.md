# Backend Web Develop Project On A Travel Agency

Developed a backend API and database integration functions using Node.js, Express, and JavaScript. 
This allowed me to effectively fetch data from a MongoDB database and deliver a seamless user experience (UX) on the front end. 
Additionally, I integrated various add-on APIs, such as a CMS system, to enhance the website's functionality and user interface (UI).

## Webpage Structure
![image](https://github.com/user-attachments/assets/f48db50a-6922-43b8-9a5f-06dec2249520)

## Set-up

Setting up a database and designing the structure of the database is essential for this project.
We are using node.js with the module Express to create the needed API.

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

### Required Module
![image](https://github.com/user-attachments/assets/a7683173-c6d5-4a18-ab74-749bb83c3a51)

## Backend application

### Login/Registration form

Design a pop-up Login/Registration form that allows users to log in. If the users don't have one, they can press register to create a new account.
**Login**
![image](https://github.com/user-attachments/assets/d5b779a0-d85d-4519-8007-9807ba245b25)
**Registration**
![image](https://github.com/user-attachments/assets/ddb66027-3c4f-46e2-ae4b-95bbbc377521)





