var express = require('express');
var router = express.Router();
var path = require('path');

/* create db entries. */
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
const ObjectId = require('mongodb').ObjectId;

router.use((req, res, next) => {
    res.locals.currUser = req.session.authUser;
    next();
});

router.get('/', async (req, res, next) => {
    user_name = req.session.authUser //set variable as the session
    console.log("base");

    if (!user_name) {
      res.redirect("/login");
      return;
    }
    else {
/*      try {
        await client.connect();
        let data = await client.db("travel").collection('testimonial').find({tmname: req.session.authUser[3]}).toArray();
        console.log('-----------------', data);
        res.render(path.join('', 'mb', 'mytestimonial_mb'), 
          { 
            u_name : user_name[2],
            u_email : user_name[3],
            u_testimonial : data
          });
      }
      catch (err) {
        console.log(err.name, err.message);
        return next(err);
      }
      finally {
        await client.close();
      } */
      res.render(path.join('','mb','mytestimonial_mb'), { u_name : user_name[2] }); 
    }

}).get('/getOwnTestimonial', async (req, res, next) => {
    if (req.session.authUser==null) { res.redirect("/login"); return; }
    try {
      await client.connect();
      // authUser[3] = email address.
      data = await client.db("travel").collection('testimonial').find({tmname: req.session.authUser[3]}).toArray();
      res.send(data);
    } catch (err) {
      console.log(err.name, err.message);
      return next(err);
    } finally {
      await client.close();
    }
}).get('/getOwnTestimonialwithParam', async (req, res, next) => {
    const email = req.query.email;
    console.log("------ ", email);
    try {
      await client.connect();
      // authUser[3] = email address.
      data = await client.db("travel").collection('testimonial').find({tmname: email}).toArray();
      console.log(data);
      res.send(data);
    } catch (err) {
      console.log(err.name, err.message);
      return next(err);
    } finally {
      await client.close();
    }
}).post('/updateTestimonialwithParam', async (req, res, next) => {
    const testimonialId = req.body.testimonialId;
    const email = req.body.email;
    const newTestimonial  = req.body.newTestimonial;
    
    try {
      await client.connect();
      data = await client.db("travel").collection("testimonial").findOne(
        {_id: new ObjectId(testimonialId)}
      );

      console.log("Data  ============ ", data === null? "Cannot find any value" : data);
      console.log("Id = ", testimonialId);
      console.log("email = ", email);
      console.log("newTestimonial = ", newTestimonial);

      if (data === null)
        res.send("No data found");
      else {
        await client.db("travel").collection("testimonial").updateOne(
          { _id: new ObjectId(testimonialId) },
          { $set: { 'tmtest': newTestimonial, tmcrdate: new Date()} }
        );
        res.send("Updated");
      }
    } catch (err) {
      console.log(err.name, err.message);
      return next(err);      
    } finally {
      await client.close();
    }
}).post('/insertTestimonialwithParam', async (req, res, next) => {
  const email = req.body.email;
  const travelDate = req.body.travelDate;
  const testimonial  = req.body.testimonial;
  
  console.log("Input =======", req.body );

  try {
    await client.connect();
    data = await client.db("travel").collection("testimonial").findOne(
      // { tmname: email, tmdate: { $eq: new Date(travelDate)}, tmtest: testimonial }
      { tmname: email, tmdate: { $eq: new Date(travelDate) }, tmtest: testimonial }
    );

    console.log("Data  ============ ", data);
    
    if (data) {
      console.log("No insert - dupliate found");
      res.send("No insert - duplicate found");
    }
    else {
      await client.db("travel").collection("testimonial").insertOne(
        { tmname: email, tmdate: new Date(travelDate), tmtest: testimonial, tmcrdate: new Date() }
      );
      console.log("Inserted")
      res.send("Inserted");
    }
  } catch (err) {
    console.log(err.name, err.message);
    return next(err);      
  } finally {
    await client.close();
  }
}).post('/deleteTestimonialwithParam', async (req, res, next) => {
  const testimonialId = req.body.testimonialId;
  
  console.log("Input =======", req.body );

  try {
    await client.connect();
    data = await client.db("travel").collection("testimonial").findOne(
      { _id: new ObjectId(testimonialId) }
    );

    console.log("Data  ============ ", data);
    
    if (data === null) {
      console.log("No delete - no such record exist");
      res.send("No delete - no such record exist");
    }
    else {
      await client.db("travel").collection("testimonial").deleteOne(
        { _id: new ObjectId(testimonialId) }
      );
      console.log("Deleted")
      res.send("Deleted");
    }
  } catch (err) {
    console.log(err.name, err.message);
    return next(err);      
  } finally {
    await client.close();
  }
}).get('/*', (req, res, next) => {
  user_name = req.session.authUser //set variable as the session
  console.log("other get");

  if (!user_name) {
    res.redirect("/login");
    return;
  }
  else {
    res.render(path.join('','mb','testimonial_mb'), {u_name : user_name[2]}); 
  }
});

module.exports = router;