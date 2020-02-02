var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

router.get("/", (req, res) => {


    (async () => {



        try{


            var NotiSchema = new mongoose.Schema({

                titulo: String,

                sub: String,

                img: String,

                seccion: String,

                texto: String,

                principal: Boolean,

                home: Number


            }, {collection: 'noticias'});



            var random = Math.random();


            var Noti = mongoose.model(''+random+'', NotiSchema);

            
            
            await mongoose.connect("mongodb://localhost:27017", {
                dbName: 'deportesnet',
                useNewUrlParser: true
            });

            console.log("aaaaaaaaaaaFADFDSFSDFSDFDSFSDa");


            const ahBo = await Noti.find({home: 1}, null)
            .exec(function (err, docs) {

                // console.log(docs);

                res.send(docs);

            });

            



        } catch(error){
            console.error(error);
        }



    })();


    


});




module.exports = router;