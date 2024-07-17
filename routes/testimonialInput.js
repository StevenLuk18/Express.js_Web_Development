var express = require('express');
var router = express.Router();
var path = require('path');

/* create db entries. */
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const client = new MongoClient(url);
const { ObjectId } = require('mongodb');

router.use((req, res, next) => {
    res.locals.currUser = req.session.authUser;
    next();
});

router.get('/', async (req, res, next) => {
    const user_name = req.session.authUser //set variable as the session

    if (!user_name) {
      res.redirect("/login");
      return;
    }
    else {
      res.render(path.join('','mb','mytestimonial_mb'), { u_name : user_name[2] }); 
    }

}).get('/getOwnTestimonial', async (req, res, next) => {
    if (req.session.authUser == null) { res.redirect("/login"); return; }

    try {
        await client.connect();
        // authUser[3] = email address.
        data = await client.db("travel").collection('testimonial').find({
            tmname: req.session.authUser[3]
        }).toArray();
        res.send(data);
    } catch (err) {
        console.log(err.name, err.message);
        return next(err);
    } finally {
        await client.close();
    }
}).patch('/updateOwnTestimonial', async (req, res, next) => {
    if (req.session.authUser == null) { res.redirect("/login"); return; }

    try {
        const { testimonialId, newTravelDate, updatedTestimonial } = req.body;
        console.log("Id = ", testimonialId, ", new travel date = ", newTravelDate, ", new test = ", updatedTestimonial);
        if (!testimonialId || !newTravelDate || !updatedTestimonial) {
            res.status(400).json({ success: false, 
                message: "Please supply ID of selected testimonial, date of travel, and updated testimonial." });
            return;
        }

        await client.connect();
        const data = await client.db("travel").collection("testimonial").findOne({
            _id: new ObjectId(testimonialId),
            tmname: req.session.authUser[3]
        });

        if (data === null) {
            console.log("Cannot find such testimonial");
            res.status(404).json({ success: false, message: "Testimonial not found" });
        }
            
        else {
            console.log("Found such record")
            const result = await client.db("travel").collection("testimonial").updateOne({ 
                _id: new ObjectId(testimonialId),
                tmname: req.session.authUser[3]
            },
            { $set: { 'tmdate': newTravelDate, 'tmtest': updatedTestimonial, tmcrdate: new Date()} }
            );
            
            if (result.matchedCount == 1) {
                console.log("Update success");
                res.json({ success: true, message: "Testimonial upated successfully"});
            }
            else {
                console.log("Cannot udpate");
                res.status(404).json({ success: false, message: "Cannot delete. Maybe authorization problem."});
            }
        }
    } catch (err) {
        console.log("catch error ==== ", err.name, err.message);
        res.status(500).json({ success: false, message: "An error occured while updating the testimonial"});
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
}).delete('/deleteOwnTestimonial', async (req, res, next) => {
    if (req.session.authUser == null) { res.redirect("/login"); return; }

    try {
		const { testimonialId } = req.body;
		if (!testimonialId) {
			res.status(400).json({ success: false, message: "Please supply ID of selected testimonial." });
			return;
		}
		
        await client.connect();
        const data = await client.db("travel").collection("testimonial").findOne({ 
            _id: new ObjectId(testimonialId) 
        });

        if (data == null) {
            res.status(404).json({ success: false, message: "Testimonial not found" });
        }
        else {
            const result = await client.db("travel").collection("testimonial").deleteOne({ 
                _id: new ObjectId(testimonialId)
            });

            if (result.deletedCount == 1) {
                console.log("Delete successfully");
                res.json({ success: true, message: "Testimonial deleted successfully" });
            }
            else {
                res.status(404).json({ success: false, message: "Cannot delete. Maybe authorization problem."});
            }
        }
    } catch (err) {
        console.log(err.name, err.message);
        res.status(500).json({ success: false, message: "An error occured while deleting the testimonial" });
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