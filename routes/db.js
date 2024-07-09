var express = require('express');
var router = express.Router();

/* create db entries. */
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;  // 1
const client = new MongoClient("mongodb://localhost:27017/");         // define which drive of database or primary/secondly server etc.

router.get('/createcomp', async (req, res, next) => {
    try {
        await client.connect();
        const db = client.db("travel");                // use great travel agency company profile
        const kln = db.collection("company");
        await kln.insertOne(
            {cpname:"Great Travel Agency",
             cpadres:"UG301, China Chem Goldeb Plaza, 77 Mody RadioNodeList, Tsim Sha Tsui East, Kowloon.",
             cptel:"+852 3442 6359",
             cpemail:"info@greattravel.com"},
        );
        res.send("Done company profile");
    } finally {
        await client.close();
    }
}).get('/createsysoperator', async (req, res, next) => {
    try {
        await client.connect();
        const db = client.db("travel");                 // use system operators (admin/operator) 
        const kln = db.collection("sysoperator");
        await kln.insertMany([
            {sysopname:"admin",
             sysoppswd:"12345678"},
            {sysopname:"superisor",
             sysoppswd:"12345678"},
            {sysopname:"operator",
             sysoppswd:"12345678"}
        ]);
        res.send("Done system operators");
    } finally {
        await client.close();
    }
}).get('/createmember', async (req, res, next) => {
    try {
        await client.connect();
        const db = client.db("travel");                 // use member profile
        const kln = db.collection("member");
        await kln.insertMany([
            {mpemail:"annachan@gmail.com",
             mppswd:"12345678",
             mpname:"Anna Chan",
             mpusername:"Anna",
             mpgender:"F",
             mpjoindate:new Date("2024-06-01"),
             mpchina:"T",
             mpjapan:"T",
             mpkorean:"T",
             mptaiwan:"T",
             mpeurope:"T",
             mpusa:"T",
             mpengland:"T",
             mpcanada:"T",
             mpcntyother:"T",
             mpcntyothdesc:"annaabcdefg123",
             mpairplan:"T",
             mpcruise:"T",
             mptrain:"T",
             mprail:"T",
             mptranother:"T",
             mptranothdesc:"annaabcdefg456",
             mpimagepath:"T",
            },
            {mpemail:"paulho@gmail.com",
             mppswd:"12345678",
             mpname:"Paul Ho",
             mpusername:"Paul Ho",
             mpgender:"M",
             mpjoindate:new Date("2024-06-02"),
             mpchina:"T",
             mpjapan:"T",
             mpkorean:"T",
             mptaiwan:"T",
             mpeurope:"T",
             mpusa:"T",
             mpengland:"T",
             mpcanada:"T",
             mpcntyother:"T",
             mpcntyothdesc:"paulabcdefg123",
             mpairplan:"T",
             mpcruise:"T",
             mptrain:"T",
             mprail:"T",
             mptranother:"T",
             mptranothdesc:"paulabcdefg456",
             mpimagepath:"T",
            },
            {mpemail:"elaineng@gmail.com",
             mppswd:"12345678",
             mpname:"Elaine Ng",
             mpusername:"Elaine Ng",
             mpgender:"F",
             mpjoindate:new Date("2024-06-03"),
             mpchina:"T",
             mpjapan:"T",
             mpkorean:"T",
             mptaiwan:"T",
             mpeurope:"T",
             mpusa:"T",
             mpengland:"T",
             mpcanada:"T",
             mpcntyother:"T",
             mpcntyothdesc:"elaineabcdefg123",
             mpairplan:"T",
             mpcruise:"T",
             mptrain:"T",
             mprail:"T",
             mptranother:"T",
             mptranothdesc:"elaineabcdefg456",
             mpimagepath:"T",
            },
            {mpemail:"appleli@gmail.com",
             mppswd:"12345678",
             mpname:"Apple Li",
             mpusername:"Apple Li",
             mpgender:"F",
             mpjoindate:new Date("2024-06-04"),
             mpchina:"T",
             mpjapan:"T",
             mpkorean:"T",
             mptaiwan:"T",
             mpeurope:"T",
             mpusa:"T",
             mpengland:"T",
             mpcanada:"T",
             mpcntyother:"T",
             mpcntyothdesc:"appleabcdefg123",
             mpairplan:"T",
             mpcruise:"T",
             mptrain:"T",
             mprail:"T",
             mptranother:"T",
             mptranothdesc:"appleabcdefg456",
             mpimagepath:"T",
            }            
        ]);
        res.send("Done member profile");
    } finally {
        await client.close();
    }
}).get('/createsubscribe', async (req, res, next) => {
    try {
        await client.connect();
        const db = client.db("travel");                   // use subscribe 
        const kln = db.collection("subscribe");
        await kln.insertMany([
            {sbemail:"annachan@gmail.com",
             sbdate:new Date("2024-05-01")},
            {sbemail:"paulho@gmail.com",
             sbdate:new Date("2024-05-02")},
            {sbemail:"elaineng@gmail.com",
             sbdate:new Date("2024-05-03")},
            {sbemail:"appleli@gmail.com",
             sbdate:new Date("2024-05-04")},
            {sbemail:"chantaiman@gmail.com",
             sbdate:new Date("2024-05-05")}
        ]);
        res.send("Done subscribe newsletter");
    } finally {
        await client.close();
    }
}).get('/createenduser', async (req, res, next) => {
    try {
        await client.connect();
        const db = client.db("travel");                          // use end user 
        const kln = db.collection("enduser");
        await kln.insertMany([
            {eulogin:"peterlaw",
             eupswd:"12345678",
             euname:"25_Law Pui Ming Peter",
             euprofile:"aabbcc",
             eucrdate:new Date("2024-05-01"),
             euimage:"/images/enduser/peterlaw.jpg",            
            },
            {eulogin:"stevenluk",
             eupswd:"12345678",
             euname:"10_Luk Ka Chun Steven",
             euprofile:"ffgghh",
             eucrdate:new Date("2024-05-01"),
             euimage:"/images/enduser/stevenluk.jpg",            
            },
            {eulogin:"wongkafai",
             eupswd:"12345678",
             euname:"24_Wong Ka Fai",
             euprofile:"hhKkLl",
             eucrdate:new Date("2024-05-01"),
             euimage:"/images/enduser/wongkafai.jpg",            
            },
            {eulogin:"enduser",
             eupswd:"12345678",
             euname:"Dummy end user",
             euprofile:"Dummy xxyyzz",
             eucrdate:new Date("2024-05-01"),
             euimage:"/images/enuser/enduser.jpg",            
            }
        ]);
        res.send("Done system enduser");
    } finally {
        await client.close();
    }
}).get('/createtestimonial', async (req, res, next) => {
    try {
        await client.connect();
        const db = client.db("travel");                               // use member testimonial
        const kln = db.collection("testimonial");
        await kln.insertMany([
            {tmname:"annachan@gmail.com",
             tmdate:new Date("2024-06-25"),
             tmcountry:"China",
             tmtest:"Anna Chan testimonial description",
             tmcrdate:new Date("2024-06-26")
            },
            {tmname:"paulho@gmail.com",
             tmdate:new Date("2024-06-04"),
             tmcountry:"Korean",
             tmtest:"Paul Ho testimonial description",
             tmcrdate:new Date("2024-06-15")
            },
            {tmname:"elaineng@gmail.com",
             tmdate:new Date("2024-06-25"),
             tmcountry:"Japan",
             tmtest:"はタイが一番好きです。朝と夜の 2 つのスタイルがとても違います。素晴らしいと思います。私は夜のツアーがとても好きです。",
             tmcrdate:new Date("2024-06-27")
            },
            {tnname:"appleli@gmail.com",
             tmdate:new Date("2024-06-01"),
             tmcountry:"Holland",
             tmtest:"The Iberico pig is super delicious. The cuttlefish noodles, egg yolk noodles, and round tiramisu are all delicious. I was really happy to receive the card thanking Jingxuan Travel for my birthday. I also want to thank Candy Lai for preparing the cake for us. I eat cake every birthday. Before I left, I felt a little sad. This year I couldn’t eat the cake or blow out the candles. But in the end I was very happy.", 
             tmcrdate:new Date("2024-06-15")
            },
            {tmname:"annachan@gmail.com",
             tmdate:new Date("2024-05-15"),
             tmcountry:"New York, USA",
             tmtest:"The tour leader Peter is really super nice. I like it very much. He is knowledgeable, patient, considerate, emotionally stable, cheerful and funny, and loves to play and take photos. I think the tour leader is more enthusiastic about various attractions than us. He will always be there. He waited for every group member to finish their homework before leaving. He kept observing us to see if we encountered any problems. He always fulfilled our needs and helped us take photos and taught us how to take photos. I really liked it.",
             tmcrdate:new Date("2024-06-01")
            },
            {tmname:"paulho@gmail.com",
             tmdate:new Date("2024-06-14"),
             tmcountry:"England",
             tmtest:"Wah哥领队，而且行程遇到问题都是平稳解决，完全没有难倒他的事情菁选旅游感谢你们让我们的蜜月甜美又充实，还好当时没有被恐惧吓退，非常开心是和你们一起去旅行",
             tmcrdate:new Date("2024-06-30")
            },
            {tmname:"elaineng@gmail.com",
             tmdate:new Date("2024-04-01"),
             tmcountry:"Austria - Lake Hallstatt",
             tmtest:"Elaine Ng testimonial description",
             tmcrdate:new Date("2024-04-20")
            },
            {tnname:"appleli@gmail.com",
             tmdate:new Date("2024-05-03"),
             tmcountry:"Tailand Bangkok",
             tmtest:"Apple Li testimonial description", 
             tmcrdate:new Date("2024-05-18")
            }
        ]);
        res.send("Done member's testimonial");
    } finally {
        await client.close();
    }
}).get('/createcontactus', async (req, res, next) => {
    try {
        await client.connect();
        const db = client.db("travel");                                        // use contact us 
        const kln = db.collection("contactus");
        await kln.insertMany([
            {ctemail:"abc@gmail.com",
             ctname:"ab & c",  
             ctdate:new Date("2024-06-01"),
             ctsubject:"Req. travel information",
             ctmessage:"I would like to have a latest travel information of USA."
            },
            {ctemail:"xyz@gmail.com",
             ctname:"xy & z",  
             ctdate:new Date("2024-06-10"),
             ctsubject:"Req. Apply USA passport",
             ctmessage:"I would like to have a latest information of apply USA passport."
            }
        ]);
        res.send("Done Contact us");
    } finally {
        await client.close();
    }
})
module.exports = router;