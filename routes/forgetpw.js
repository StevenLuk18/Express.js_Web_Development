var express = require('express');
var router = express.Router();
var path = require('path');
var nodemailer = require ('nodemailer')
const crypto = require ('crypto')
const cryptoJS = require ('crypto-js')
const {generateResetToken, encodeToken} = require('../utils/cryptoSet')
require('dotenv').config()

const {MongoClient} = require('mongodb')
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

router.post('/', async (req, res, next) => {

    const {forgetpwEmail} = req.body 

    try {
        await client.connect()
        const db = client.db("travel")
        data = await db.collection("member").findOne({mpemail:forgetpwEmail})

        if (data) {

            HKTime = new Date(Date.now() + (8* 60* 60* 1000))
            expirationTimeHK = new Date(Date.now() + (8* 60* 60* 1000) + (30* 60* 1000)) //half of hour

            const resetToken = generateResetToken();
            console.log('Generated reset token:', resetToken)
            const encodedToken = encodeToken(resetToken);

            await db.collection("resetTokens").insertOne({
                email: forgetpwEmail,
                token: resetToken,
                createdAt: HKTime,
                expirationTime: expirationTimeHK
            });
            
            console.log('reset token inserted')



            const resetLink = `http://localhost:3000/forgetpw/resetpassword?token=${encodeURIComponent(encodedToken)}`;

            const transporter = nodemailer.createTransport({
                service: "gmail",
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                auth: {
                  user: process.env.EMAIL_USER, 
                  pass: process.env.EMAIL_APP_PASS, 
                },
              });

            const mailOptions  = 
              {
                name: 'Great Travel Agency',
                from: process.env.EMAIL_USER, 
                to: process.env.EMAIL_USER, 
                subject: "Reset your Great Travel Agency account password",
                text: "testing",
                html: `<p>You requested a password reset. Click the link below to reset your password:</p>
                       <a href="${resetLink}">Reset Password</a>`
            };
            

            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
            res.send('<script>history.back(); alert("The reset password email is sent, please check your email~!");</script>')

        } else {
            res.send('<script>history.back(); alert("Sorry, you entered a incorrect email~!");</script>')
        }
        
    } catch (error) {
        console.log(error)
    } finally {
        await client.close()
    }
}).get('/resetpassword', async (req, res, next) => {
    
    const token = req.query.token
    
    HKTime = new Date(Date.now() + (8* 60* 60* 1000))
    
    try {
        await client.connect()
        const db = client.db("travel")
        bytes = cryptoJS.AES.decrypt(token, process.env.ENCRYPTION_KEY);
        const originalToken = bytes.toString(cryptoJS.enc.Utf8); 
        console.log('Decrypted token:', originalToken)

        const tokenData = await db.collection("resetTokens").findOne({ token: originalToken , expirationTime: {$gt: HKTime}});

        if (tokenData) {
            res.render('resetpassword', {member_email:tokenData.email}); 
        } else {
            res.status(400).send('Invalid or expired token.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    } finally {
        await client.close()
    }
}).post('/updatepw', async (req, res) => {

    const {memberEmail, password, re_password} = req.body

    try{
        await client.connect()
        const db = client.db("travel")
        let memberData = await db.collection('member').findOne({mpemail: memberEmail})

        if (memberData) {
            memberData.mppswd = re_password
            let memberCollection = db.collection('member')
            await memberCollection.replaceOne({_id:memberData._id}, memberData)
            res.send(`
                <script>
                    alert("Your password has been reset successfully.");
                    window.location.href = '/';
                </script>
            `);
        } else {
            res.status(400).send('Member not found');
        }

    } catch (err) {
        console.log(err)
    } finally {
        await client.close()
    }
})


module.exports = router;