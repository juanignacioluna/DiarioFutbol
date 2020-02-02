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



            const ahBo = await User.findOne({usuario: req.body.usuario, password: req.body.password });  //SELECT


            if(ahBo){

                req.session.usuario = req.body.usuario;
                
                console.log("LOGUEAR A " + req.session.usuario);

                res.send("1");


            }else{

                console.log("No existe");

                res.send("0");

            }



        } catch(error){
            console.error(error);
        }



    })();


    


});




module.exports = router;