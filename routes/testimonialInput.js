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
        }).sort({ tmcrdate: -1 }).toArray(); // Closest date first
        res.send(data);
    } catch (err) {
        console.log("Get exception error ==== ", err.name, err.message);
        return next(err);
    } finally {
        await client.close();
    }
}).patch('/updateOwnTestimonial', async (req, res, next) => {
    if (req.session.authUser == null) { res.redirect("/login"); return; }

    try {
        const { testimonialId, newTravelDate, updatedTestimonial } = req.body;

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
            const result = await client.db("travel").collection("testimonial").updateOne({ 
                _id: new ObjectId(testimonialId),
                tmname: req.session.authUser[3]
            },
            { 
                $set: { 
                    'tmdate': newTravelDate, 
                    'tmtest': updatedTestimonial, 
                    tmcrdate: new Date()
                } 
            });
            
            if (result.matchedCount == 1) {
                console.log("Testimonial updated successfully.");
                res.status(200).json({ success: true, message: "Testimonial updated successfully."});
            }
            else {
                console.log("Cannot udpate. Maybe authorization problem.");
                res.status(404).json({ success: false, message: "Cannot update. Maybe authorization problem."});
            }
        }
    } catch (err) {
        console.log("Update exception error ==== ", err.name, err.message);
        res.status(500).json({ success: false, message: "An error occured while updating the testimonial."});
        return next(err);      
    } finally {
        await client.close();
    }
}).post('/insertOwnTestimonial', async (req, res, next) => {
	if (req.session.authUser == null) { res.redirect("/login"); return; }

	const travelDate = req.body.travelDate;
	const testimonial  = req.body.testimonial;

	try {
		await client.connect();
		const data = await client.db("travel").collection("testimonial").findOne({ 
			tmname: req.session.authUser[3], 
			tmdate: travelDate,
			tmtest: testimonial 
        });

		if (data) {
    		console.log("No insert - dupliate found");
		    res.status(400).json({ success: false, message: "Cannot insert - duplicate record found!" });
		}
		else {
            const result = await client.db("travel").collection("testimonial").insertOne({ 
                tmname: req.session.authUser[3], 
                tmdate: travelDate, 
                tmtest: testimonial, 
                tmcrdate: new Date()
            });

            if (result.acknowledged) {
                console.log("New testimonial inserted successfully.");
                res.status(200).json({ success: true, message: "New testimonial inserted successfully." });
            }
            else {
                console.log("Cannot delete");
                res.status(400).json({ success: false, message: "Cannot insert. Maybe authorization problem." });
            }
        }
	} catch (err) {
		console.log("Insert exception error ==== ", err.name, err.message);
		res.status(500).json({ success: false, message: "An error occured while inserting the testimonial"});
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
                console.log("Testimonial deleted successfully");
                res.json({ success: true, message: "Testimonial deleted successfully" });
            }
            else {
                console.log("Cannot delete. Maybe authorization problem.");
                res.status(404).json({ success: false, message: "Cannot delete. Maybe authorization problem."});
            }
        }
    } catch (err) {
        console.log("Delete exception error ==== ", err.name, err.message);
        res.status(500).json({ success: false, message: "An error occured while deleting the testimonial" });
        return next(err);      
    } finally {
        await client.close();
    }

}).get('/*', (req, res, next) => {
  user_name = req.session.authUser //set variable as the session

  if (!user_name) {
    res.redirect("/login");
    return;
  }
  else {
    res.render(path.join('','mb','testimonial_mb'), {u_name : user_name[2]}); 
  }
});

module.exports = router;