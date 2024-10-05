Disclaimer:

***This project just for learning and practice purpose. No commerical intention included***  

# Backend Web Develop Project On A Travel Agency

- Developed a backend API and database integration functions using **Node.js**, **Express**, and **JavaScript**. 
- Effectively fetch data from a **MongoDB** database and deliver a seamless user experience (UX) on the front end. 
- Integrated various add-on **APIs**, such as a **CMS system**, to enhance the website's functionality and user interface (UI).

Main color for our website is: `#86B817`

# Table of contents
[Backend Application](#Backend-application)
- [Login Form](#LoginForm)
- [Registration Form](#RegistrationForm)
- [Forget Password Form](#Forget-Password)

[EJS](#EJS)  
- [Added Feature Of Using EJS](#Added-feature-of-using-EJS)
- [My Profile Edition](#My-Profile-Edition)
- [Testimonial](#Testimonial)

[CMS Login System](#CMS-Login-System)
- [CMS User Structure](#CMS-user-structure)
- [Key Function](#Key-function)
- [Search](#Search)
- [Update](#Update)
- [Add](#Add)
- [Delete](#Delete)

## Webpage Structure

![image](https://github.com/user-attachments/assets/655a9755-cefe-4952-a3d8-f13de443cae5)

## Set-up

Setting up a database and designing the structure of the database is essential for this project.
- Using ***node.js*** with the module ***Express*** to create the needed ***API***.

### Required Module
```
npm install
```
- to get all from package.json

<a name="Backend-application"></a>
# Backend Application

### Login/Registration/Reset Password Form

- Design a pop-up Login/Registration form that allows users to log in.
- If the users don't have one, they can press register to create a new account.

<a name="LoginForm"></a>
**Login**

![image](https://github.com/user-attachments/assets/5d86898c-cc6d-4328-a143-ab2df8da8f75)

<a name="RegistrationForm"></a>
**Registration**

![image](https://github.com/user-attachments/assets/208a26ad-9d17-44a4-b042-5e87da94e535)

<a name="Forget-Password"></a>
**Forget Password**

![image](https://github.com/user-attachments/assets/b210e039-c3b7-4242-9176-b585af08c9c7)

#### Send An Email To Reset Password

![image](https://github.com/user-attachments/assets/e3564c0a-5389-4a22-9440-d009724fe064)

![image](https://github.com/user-attachments/assets/6a22a539-40e7-43a2-bd04-fd51b823b424)

Module used: *nodemailer*

```
npm i nodemailer
```

- Set a random Token to encrypt the API link

```
npm i crypto crypto-js
```

 **In database**
 
![image](https://github.com/user-attachments/assets/06f84beb-bc97-48f3-adaf-da2fc9db785a)


- Set expiration
  
![image](https://github.com/user-attachments/assets/34e78e98-5f13-428d-9a48-3aa471e7ae12)

**The Reset Password API (If the encrypted Token match)** 

More Detail in [ [Forget password/ Link encryption feature detail](https://github.com/StevenLuk18/Express.js_Web_Development/blob/main/routes/forgetpw.js) ]

![image](https://github.com/user-attachments/assets/dde27c2b-1325-4fce-909b-260eb734a02c)

#### API

 - **Create different APIs for different functionality**

![image](https://github.com/user-attachments/assets/b309e1b2-4f7a-4a36-848c-f1e3b4316c61)

<a name="EJS"></a>
# EJS

*If the users login, the API will render the EJS*

- *With the variable*

- *Session that saved when user loged in*
>req.session.authUser = [data._id, data.mpname ,data.mpusername, data.mpemail, data.mppswd, data.mpgender, data.mpimagepath];

Save the username in ***u_name*** which in the position 2 of the session
>{ u_name : user_name[2]}

![image](https://github.com/user-attachments/assets/efcb6c0c-9a28-4e83-a15b-bdadede2ce1b)

Several EJS were created that were designated for member view only.

![image](https://github.com/user-attachments/assets/08f13ee0-df69-4a89-b1f1-930789f24d60)

*Once the users log in, they will go into one of those EJS web pages*

<a name="Added-feature-of-using-EJS"></a>
### Added Feature Of Using EJS

#### Show The Username(Anna) With The EJS 
![image](https://github.com/user-attachments/assets/f949ff29-ec47-4a02-9b45-9085ba7d046b)

- *Before login*

![image](https://github.com/user-attachments/assets/91d0cf06-835d-4adb-8e0c-39d5ccf0d080)

#### Show Logout And My Profile Button

![image](https://github.com/user-attachments/assets/b00b9788-4e1b-42ca-8eae-9d0313892ef2)

- *Before login* 

![image](https://github.com/user-attachments/assets/ad2976bd-0d80-402e-ae9c-cefd783da9c3)

<a name="My-Profile-Edition"></a>
### My Profile Edition

- **User can edit and update their personal information**

![image](https://github.com/user-attachments/assets/3c0f1764-c08e-4194-ad78-25e7773f5ec2)

![image](https://github.com/user-attachments/assets/6b131563-e25d-4181-9aba-319206c464c3)

![image](https://github.com/user-attachments/assets/322f1c18-d0e9-4210-b317-f5c15ff8ca4a)

![image](https://github.com/user-attachments/assets/23aafd59-f425-4283-889e-9ae0796da420)

**Special Feature**

- *The user can update their personal image, and preview their profile images*

```
npm install multer
```

![image](https://github.com/user-attachments/assets/583a9dbf-a15b-4710-9d21-b97d320e12fd)

**The code**:

*Preview image*

![image](https://github.com/user-attachments/assets/13c5e165-6f7e-476b-afe8-4e887ed2ac62)

- *Third-party module -- multer*

*Multer Set-up (After installation)*

![image](https://github.com/user-attachments/assets/cf39a7c4-e2f4-42ab-9e6e-02f43fe15246)

**Upload the image to the designated folder**

![image](https://github.com/user-attachments/assets/90c51b85-7b5b-4ea0-9154-84b78283e382)

*In my case, it is public/images/member/'FileName'*

**Get the preview image from the path that is saved inside the MongoDB**

![image](https://github.com/user-attachments/assets/0ec6bbb4-6ae8-47de-825f-57fc5e53fbd4)

*Get the data from API and insert it into the image's src attribute*

![image](https://github.com/user-attachments/assets/9aef3668-681c-493a-8626-a92ffb73b8dc)

- *imagePath is the session saved from the login API*

<a name="Testimonial"></a>
### Testimonial

- This web feature can let the users edit their comments on their travel trip

![image](https://github.com/user-attachments/assets/0db050b1-157b-4ccf-8d95-abaf1db5dd49)

![image](https://github.com/user-attachments/assets/b5d8a80a-6a18-405e-a34d-965f088163d7)

```
npm install handsontable
```

<a name="CMS-Login-System"></a>
# CMS Login System

- *Designed for simulating backend CMS*

![image](https://github.com/user-attachments/assets/34e25e1e-8d2e-4b37-b209-27859ac3a72e)

<a name="CMS-user-structure"></a>
#### CMS User Structure

*CMS Login User Design*

![image](https://github.com/user-attachments/assets/f5d1285b-9d73-4c2e-9001-c4db9d32b31e)

- *With system level role field that could restrict login user's access*


#### Switch Case
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
  
          ...more details in my project
        
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

       ...more details in my project

        break;

        }
  })
  .catch(error => console.error('Error fetching company data:', error));
```

**Different HTML webs for different functionality**

![image](https://github.com/user-attachments/assets/32983ef2-0b6f-42fc-9fc7-e803916c877b)


**With relative API**

![image](https://github.com/user-attachments/assets/b03a67c1-ccbe-41a6-a924-0050351de7f2)


**The main page of Backend CMS**

![image](https://github.com/user-attachments/assets/e9494499-cad2-458b-82a7-1cc100bcd5ac)

<a name="Key-function"></a>
#### Key Functions

- *Search/Update/Add/Delete*

***CRUD***

*In Authorize User Section*

![image](https://github.com/user-attachments/assets/ffc5b266-5004-4cd8-b8fe-0e27b60b0302)

<a name="Search"></a>
##### Search

*API*

![image](https://github.com/user-attachments/assets/044f5c99-1786-49e0-b0a3-27187adac17d)

*Actual effect*

![image](https://github.com/user-attachments/assets/d006ad69-bcf7-4283-a73a-b13d52f4249f)

<a name="Update"></a>
##### Update

- Same as the search one but use *replaceOne* in API

```
await db.replaceOne({_id:data._id}, data);
```

More Detail in [ [Update feature detail](https://github.com/StevenLuk18/backendProject/blob/c93465b2df4e26764e9ff648d692654c7d7f03a7/routes/cms-admin-api-authUser.js) ]

*Actual effect*

![image](https://github.com/user-attachments/assets/490e0018-a580-48db-a73f-91340660f765)

<a name="Add"></a>
##### Add

```
await db.insertOne(
   {sysopname: addordelNameReal, sysoppswd: addordelPwReal,syslevel: addordelLevelReal}
)
```

More Detail in [ [Add feature detail](https://github.com/StevenLuk18/backendProject/blob/c93465b2df4e26764e9ff648d692654c7d7f03a7/routes/cms-admin-api-authUser.js) ]

*Actual effect*

![image](https://github.com/user-attachments/assets/c7a3fcdd-bdb5-4e2c-9fc0-a3163744860c)

<a name="Delete"></a>
##### Delete

```
await db.deleteOne({_id: data._id})
```

More Detail in [ [Delete feature detail](https://github.com/StevenLuk18/backendProject/blob/c93465b2df4e26764e9ff648d692654c7d7f03a7/routes/cms-admin-api-authUser.js) ]

*Actual effect*

![image](https://github.com/user-attachments/assets/ef1ac086-843f-4f05-a842-a226da54e832)


*In enduser section*

The purpose is to find the travel guide that the company has, with the personal picture provided.

- _fetch data from the MongoDB database and get the preview image path_

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

![image](https://github.com/user-attachments/assets/a6c21872-c03b-473b-9339-ca4a4894bd70)

## Credit

Image credit from https://www.freepik.com/

[enduser-image](https://www.freepik.com/free-photo/unbothered-guy-pointing-finger-up-looking-careless_9696638.htm#fromView=search&page=1&position=2&uuid=8c05457b-4326-4262-b1be-f908d25aee5f)

[enduser-image](https://www.freepik.com/free-photo/business-finance-people-concept-surprised-impressed-asian-male-entrepreneur-office-manager-blue-shirt-pointing-upper-right-corner-look-amazed-say-wow-stare-camera-awe_16800470.htm#fromView=search&page=1&position=5&uuid=db9cee98-9ccd-4dda-8ccd-046a5a57a28f)

[member-image](https://www.freepik.com/free-ai-image/3d-cartoon-character_170851002.htm#fromView=search&page=1&position=2&uuid=e0c31614-b1c7-4a3a-ae81-98d2e8f6ba96)

[member-image](https://www.freepik.com/free-photo/close-up-fresh-apple_6818030.htm#fromView=search&page=1&position=1&uuid=49fc9e27-ab7f-44b6-9634-3da84f9ca1ea)

[member-image](https://www.freepik.com/free-vector/sticker-template-with-girl-standing-posing-cartoon-character-isolated_18233319.htm#fromView=search&page=1&position=25&uuid=401282c6-2b38-446b-98a1-d5a4960b1670)

[member-image](https://www.freepik.com/free-vector/sticker-template-with-boy-cartoon-character-isolated_16854036.htm#fromView=search&page=1&position=7&uuid=473a8096-713d-4e6a-ba64-568e9127edf8)

