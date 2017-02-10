var unirest = require('unirest');
var express = require('express');
var bodyParser = require('body-parser');
var events = require('events');
var config = require('./config');
var Product = require('./models/product');

//mine:
// var server = http.createServer(router);
// var io = socketio.listen(server);

// var node = require("node");
// var http = require('http');
var mongoose = require('mongoose');
// const app = express();
var app = express();

// serves static files and uses json bodyparser
app.use(bodyParser.json());
app.use(express.static('public'));


/* STEP 2 - creating objects and constructors*/
var runServer = function (callback) {
    mongoose.connect(config.DATABASE_URL, function (err) {
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function () {
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {
    runServer(function (err) {
        if (err) {
            console.error(err);
        }
    });
};
// ;
// module.exports =function(query,callback) {
//api call between the server and basketball api   
var getProducts = function(product_name) {
    // console.log("inside the getProducts function");
    var emitter = new events.EventEmitter();
//    unirest.post('https://api.bestbuy.com/v1/products((search=' + product_name + '*))?apiKey=t5reggzup769kevta2bdabkx&format=json&type!=BlackTie&customerTopRated=true)?sort=salesRankShortTerm.asc')
    unirest.post('https://api.bestbuy.com/v1/products((search=' + product_name + '))?apiKey=t5reggzup769kevta2bdabkx&format=json')
        //after api call we get the response inside the "response" parameter
 
        .end(function(response) {
            
            console.log(response);
            //success scenario
            if (response.ok) {
                emitter.emit('end', response.body);
            }
            //failure scenario
            else {
                console.log("error line 28");
                emitter.emit('error', response.code);
            }
        });
        
    return emitter;
};
//api call between the view and the controller
app.get('/product/:product_name', function(request, response, error) {
    
    if (request.params.product_name == "") {
        response.json("Specify a product name");
    }
    else {
    console.log(request.params.product_name);

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


// //login section get and post methods
// app.use(bodyParser.urlencoded({ extended: false }));
// // app.use(bodyParser.json());

// app.get('/',function(req,res){
//   res.sendfile("form.html");
// });
// app.post('/login',function(req,res){
//   var username=req.body.user;
//   var password=req.body.password;
//   console.log("User name = "+username+", password is "+password);
//   res.end("yes");
// });


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


exports.app = app;
exports.runServer = runServer;
app.listen(process.env.PORT, process.env.IP);