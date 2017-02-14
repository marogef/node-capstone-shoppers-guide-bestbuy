/* STEP 1 - load external resources*/
//for express
var express = require('express');
var bodyParser = require('body-parser');
var events = require('events');
var path=require('path');

//for the db
var mongoose = require('mongoose');
var config = require('./config');
var Product = require('./models/product');
var User = require('./models/user');

//for api
var unirest = require('unirest');

//for auth
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var passportLocal = require('passport-local');
var bcrypt = require('bcryptjs');
var methodOverride = require('method-override');




/* STEP 2 - initialize the app*/
var app = express();

// serves static files and uses json bodyparser
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride());

app.use(cookieParser());
app.use(expressSession({
    secret: 'secret123',
    resave: true,
    saveUninitialized: true,
    activeDuration: 5 * 60 * 1000
}));
// To do local authentication below lines are mandatory
app.use(passport.initialize());
app.use(passport.session());


/* STEP 3 - creating objects and constructors*/
var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};


//api call between the server and best buy api   
var getProducts = function(product_name) {
    // console.log("inside the getProducts function");
    var emitter = new events.EventEmitter();
    
    unirest.post('https://api.bestbuy.com/v1/products((search=' + product_name + '))?apiKey=ccw7r1Dxrz9wNwgQuNWLOKqZ&format=json')
        //after api call we get the response inside the "response" parameter

    .end(function(response) {

        //console.log(response);
        //success scenario
        if (response.ok) {
            emitter.emit('end', response.body);
        }
        //failure scenario
        else {
            emitter.emit('error', response.code);
        }
    });

    return emitter;
};

/* STEP 4 - defining the local api end points*/

//api call between the view and the controller
app.get('/product/:product_name', function(request, response) {

    if (request.params.product_name == "") {
        response.json("Specify a product name");
    }
    else {
        //console.log(request.params.product_name);

        var productDetails = getProducts(request.params.product_name);

        //get the data from the first api call
        productDetails.on('end', function(item) {
            //console.log(item);
            response.json(item);
        });

        //error handling
        productDetails.on('error', function(code) {
            response.sendStatus(code);
        });
    }
});

app.post('/product', function(req, res) {
    Product.create({
        name: req.body.name
    }, function(err, products) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(products);
    });
});


/* STEP 5 - login section get and post methods */

passport.use(new passportLocal.Strategy(function(username, password, done) {


    User.getUserByUsername(username, function(err, username) {
        if (err) throw err;
        if (!username) {
            console.log('Unknown user');
            return done(null, false, {
                message: 'Unknown user'
            });
        }
        else {
            //console.log(username);
            var hash = username.password;
            if (bcrypt.compareSync(password, hash)) {

                console.log("Autehntication passed");
                return done(null, {
                    id: username._id,
                    username: username.username
                });

            }
            else {
                console.log('Invalid password');
                return done(null, false, {
                    message: 'Invalid password'
                });
            }

        }
    });

}));


passport.serializeUser(function(username, done) {

    done(null, username.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, username) {

        done(err, username);
    });
});


app.get('/', function(req, res) {

    console.log("IS In Index", req.isAuthenticated());
    //if(req.isAuthenticated())
    //  console.log(req.user.username);
    //console.log("Request object is " , req.body );
    if (req.isAuthenticated()) {
        res.render('index', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user.username


        });
    }
    else {
        res.render('index', {
            isAuthenticated: false,
            user: "no data"
        });
    }
});

app.get('/login', function(req, res) {
    res.render('login', {
        isAuthenticated: req.isAuthenticated(),
        user: req.user
    });
    //console.log("Inside login function" , req.isAuthenticated());
    //console.log("Inside login function", req.body);
});

app.post('/login', passport.authenticate('local', {
    failureRedirect: '/'
}), function(req, res) {
    console.log(req.body.username, req.body.password)
    retStatus = 'Success';
    res.send({
        retStatus: retStatus,
        redirectTo: '/',
        msg: 'Auth successful' // this should help
    });
});



app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


// //Contact form get and post methods
// app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(bodyParser.json());

// app.get('/',function(req,res){
//   res.sendfile("index.html");
// });
// app.post('/btnLogin',function(req,res){
//   var name=req.body.name;
//   var email=req.body.email;
//   var message=req.body.msg;
//   console.log("User name = "+name+", email is "+email+", message is "+message);
//   res.end("yes");
// });

/* STEP 6 - start and run the server*/
exports.app = app;
exports.runServer = runServer;
app.listen(process.env.PORT, process.env.IP);