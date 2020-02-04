var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var session = require('express-session');
var cors = require("cors");
var mongoose = require("mongoose");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var HomeRouter = require('./routes/home');
var RegistroRouter = require('./routes/registro');
// var LoginRouter = require('./routes/login');
var PrincipalRouter = require('./routes/principal');
var NoticiaRouter = require('./routes/noticia');
const multer = require('multer');
const mongojs = require('mongojs');

var app = express();

var imgBool;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});

// app.use(cors());


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'Sup3R$ecR3t',
  saveUninitialized: false,
  cookie: {
    expiress: new Date(Date.now() + 60000),
    httpOnly: true
  }
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/home', HomeRouter);
app.use('/registro', RegistroRouter);
// app.use('/login', LoginRouter);
app.use('/noticia', NoticiaRouter);
app.use('/principal', PrincipalRouter);

const PATH = './public/images';

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {

    session.pathImg="";

    session.pathImg = file.fieldname + '-' + Date.now() + ".jpg";

    console.log(session.pathImg);

    cb(null, session.pathImg);
  }
});

let upload = multer({
  storage: storage
});



app.post('/upload', upload.single('image'), function (req, res) {
  if (!req.file) {
    console.log("No file is available!");
    return res.send({
      success: false
    });

  } else {
    console.log('File is available!');
    return res.send({
      success: true
    })
  }
});



app.get('/session', function (req, res) {


  if (session.usuario){

    if(session.admin==true){

      
      res.send([{u: session.usuario,
                h: "<a class='nav-link'>Bienvenido "+session.usuario+" :)</a>",
                t: 1, c: '<button class="btn btn-danger" data-link="/cerrar" >Cerrar Sesión</button>',
                a:'<button class="btn btn-success" data-link="/nuevo" >Agregar Noticia +</button>',
                e:"<button class='btn btn-warning' id='editarr'>Editar</button>",
                b:"<button class='btn btn-danger' data-link='/borrar'>Borrar</button>",
                }]);


    }else{


      res.send([{u: session.usuario,
        h: "<a class='nav-link'>Bienvenido "+session.usuario+" :)</a>",
        t: 1, c: '<button class="btn btn-danger" data-link="/cerrar" >Cerrar Sesión</button>',
        a:"<p></p>",
        e:"",
        b:"",
        }]);

    }


  }else{

    res.send([{u: "nadie", h: '<button class="btn btn-light" data-link="/login" >Iniciar Sesión</button>', t: 2, c:"",a:"<p></p>",
                e:"",
                b:"",
                }]);

  }


});


app.post("/editar", function (req, res) {


  (async () => {



    try{


        var NotiSchema = new mongoose.Schema({

          _id: String,

          titulo: String,

          sub: String,

          img: String,

          seccion: String,

          texto: String,

          principal: Number,

          home: Number


      }, {collection: 'noticias'});



        var random = Math.random();


        var Noti = mongoose.model(''+random+'', NotiSchema);

        
        
        await mongoose.connect("mongodb://localhost:27017", {
            dbName: 'deportesnet',
            useNewUrlParser: true
        });


        const db = mongojs('deportesnet');

        var ObjectId = require('mongodb').ObjectID;


        console.log(req.body.id);


        console.log("mama");

        this.imgBool="PELOTUDO DE MIERDA";

        console.log("aaa"+req.body['imgBool']);


        if(req.body['imgBool']){

          // console.log("ENTROOOO");

          // this.imgBool="http://localhost:3000/images/"+session.pathImg+"";

          // console.log(this.imgBool);

          switch(req.body['myRadio']) {
            case 'home':
  
  
  
              console.log(this.imgBool);
  
  
              db.noticias.update({"_id": ObjectId(req.body.id)},{ $set:{"titulo": req.body.titulo, 
              "sub": req.body.sub, 
              "home": 1,
              "principal": 0,
              "seccion": req.body.seccion,
              "texto": req.body.texto,
              "img": "http://localhost:3000/images/"+session.pathImg+""} });
  
  
  
  
  
  
  
  
  
              break;
            case 'principal':
  
  
  
              db.noticias.update({"_id": ObjectId(req.body.id)},{ $set:{"titulo": req.body.titulo, 
              "sub": req.body.sub, 
              "home": 0,
              "principal": 1,
              "seccion": req.body.seccion,
              "texto": req.body.texto,
              "img": "http://localhost:3000/images/"+session.pathImg+""} }   );
  
  
  
  
              break;
  
  
            case 'normal':
  
  
  
              db.noticias.update({"_id": ObjectId(req.body.id)},{ $set:{"titulo": req.body.titulo, 
              "sub": req.body.sub, 
              "home": 0,
              "principal": 0,
              "seccion": req.body.seccion,
              "texto": req.body.texto,
              "img": "http://localhost:3000/images/"+session.pathImg+""} }   );
  
  
  
              break;
          }

        }else{

          console.log("NOOOO ENTRO");

          this.imgBool="http://localhost:4200/assets/img/noticias/tevez.jpg";


          db.noticias.findOne({
            _id: mongojs.ObjectId(req.body.id)
          }, function(err, doc) {


            switch(req.body['myRadio']) {
              case 'home':
    
    
    
                console.log(this.imgBool);
    
    
                db.noticias.update({"_id": ObjectId(req.body.id)},{ $set:{"titulo": req.body.titulo, 
                "sub": req.body.sub, 
                "home": 1,
                "principal": 0,
                "seccion": req.body.seccion,
                "texto": req.body.texto,
                "img": doc.img} });
    
    
    
    
    
    
    
    
    
                break;
              case 'principal':
    
    
    
                db.noticias.update({"_id": ObjectId(req.body.id)},{ $set:{"titulo": req.body.titulo, 
                "sub": req.body.sub, 
                "home": 0,
                "principal": 1,
                "seccion": req.body.seccion,
                "texto": req.body.texto,
                "img": doc.img} }   );
    
    
    
    
                break;
    
    
              case 'normal':
    
    
    
                db.noticias.update({"_id": ObjectId(req.body.id)},{ $set:{"titulo": req.body.titulo, 
                "sub": req.body.sub, 
                "home": 0,
                "principal": 0,
                "seccion": req.body.seccion,
                "texto": req.body.texto,
                "img": doc.img} }   );
    
    
    
                break;
            }

            



          })


        }






        res.send("1");








    } catch(error){
        console.error(error);
    }



})();



  


});



app.post("/ultimaNoti", function (req, res) {


  session.ultimaNoti = req.body.ultimaNoti;

  res.send([{u: "Listo"}]);

  


});


app.post("/borrar", function (req, res) {


  (async () => {



      try{


          var NotiSchema = new mongoose.Schema({

            _id: String,

            titulo: String,

            sub: String,

            img: String,

            seccion: String,

            texto: String,

            principal: Number,

            home: Number


        }, {collection: 'noticias'});



          var random = Math.random();


          var Noti = mongoose.model(''+random+'', NotiSchema);

          
          
          await mongoose.connect("mongodb://localhost:27017", {
              dbName: 'deportesnet',
              useNewUrlParser: true
          });


          console.log("BEBEEEE");

          console.log(session.ultimaNoti);

          const db = mongojs('deportesnet');

          var ObjectId = require('mongodb').ObjectID;


          db.noticias.remove({"_id": ObjectId(session.ultimaNoti)});


          res.send("1");








      } catch(error){
          console.error(error);
      }



  })();


  


});




app.post("/cerrar", function (req, res) {


  session.usuario = "";

  session.admin = false;

  res.send([{u: "Listo"}]);

  


});


app.post("/agregar", function (req, res) {


  (async () => {



      try{


          var NotiSchema = new mongoose.Schema({

            titulo: String,

            sub: String,

            img: String,

            seccion: String,

            texto: String,

            principal: Number,

            home: Number


        }, {collection: 'noticias'});



          var random = Math.random();


          var Noti = mongoose.model(''+random+'', NotiSchema);

          
          
          await mongoose.connect("mongodb://localhost:27017", {
              dbName: 'deportesnet',
              useNewUrlParser: true
          });


          console.log("BEBEEEE");

          console.log(req.body);


          switch(req.body['myRadio']) {
            case 'home':






                const noti1 = new Noti({


                  titulo: req.body['titulo'],

                  sub: req.body['sub'],
      
                  img: "http://localhost:3000/images/"+session.pathImg+"",
      
                  seccion: req.body['seccion'],
      
                  texto: req.body['texto'],
      
                  principal: 0,
      
                  home: 1



                });


                await noti1.save();  //CREAR









              break;
            case 'principal':



              const noti2 = new Noti({


                titulo: req.body['titulo'],

                sub: req.body['sub'],
    
                img: "http://localhost:3000/images/"+session.pathImg+"",
    
                seccion: req.body['seccion'],
    
                texto: req.body['texto'],
    
                principal: 1,
    
                home: 0



              });


              await noti2.save();  //CREAR
              break;


            case 'normal':



              const noti3 = new Noti({


                titulo: req.body['titulo'],

                sub: req.body['sub'],
    
                img: "http://localhost:3000/images/"+session.pathImg+"",
    
                seccion: req.body['seccion'],
    
                texto: req.body['texto'],
    
                principal: 0,
    
                home: 0



              });


              await noti3.save();  //CREAR



              break;
          }



          res.send("1");








      } catch(error){
          console.error(error);
      }



  })();


  


});



app.post("/login", function (req, res) {


  (async () => {



      try{


          var UserSchema = new mongoose.Schema({

              nombre: String,

              usuario: String,

              password: String,

              admin: Boolean


          }, {collection: 'users'});



          var random = Math.random();


          var User = mongoose.model(''+random+'', UserSchema);

          
          
          await mongoose.connect("mongodb://localhost:27017", {
              dbName: 'deportesnet',
              useNewUrlParser: true
          });



          const ahBo = await User.findOne({usuario: req.body.usuario, password: req.body.password });  //SELECT


          if(ahBo){

              session.usuario = req.body.usuario;

              if(ahBo['admin']){


                console.log(ahBo['admin']);

                session.admin = ahBo['admin'];


              }else{
                session.admin=false;
              }


              
              console.log("LOGUEAR A " + session.usuario);

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





// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
