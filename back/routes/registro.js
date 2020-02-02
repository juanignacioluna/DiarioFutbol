var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

router.post("/", (req, res) => {


    (async () => {



        try{


            var UserSchema = new mongoose.Schema({

                nombre: String,

                usuario: String,

                password: String


            }, {collection: 'users'});



            var random = Math.random();


            var User = mongoose.model(''+random+'', UserSchema);

            
            
            await mongoose.connect("mongodb://localhost:27017", {
                dbName: 'deportesnet',
                useNewUrlParser: true
            });


            const user1 = new User(req.body);

            await user1.save();  //CREAR


            res.send("1");




            // console.log(req.body.password);

            // res.send([{n: req.body.nombre, u: req.body.usuario}]);





        } catch(error){
            console.error(error);
        }



    })();


    


});




module.exports = router;