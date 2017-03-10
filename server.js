/* STEP 1 - load external resources*/
//for express
var express = require('express');
var bodyParser = require('body-parser');
var events = require('events');
// var path=require('path');

//for the db
var mongoose = require('mongoose');
var config = require('./config');
var Product = require('./models/product');

//for api
var unirest = require('unirest');

/* STEP 2 - initialize the app*/
var app = express();

// serves static files and uses json bodyparser
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

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
    //console.log("inside the getProducts function");
    var emitter = new events.EventEmitter();
    https://api.bestbuy.com/v1/products((search=ipad))?apiKey=ccw7r1Dxrz9wNwgQuNWLOKqZ&format=json
    unirest.post('https://api.bestbuy.com/v1/products((search=' + product_name + '))?apiKey=ccw7r1Dxrz9wNwgQuNWLOKqZ&format=json')
    //after api call we get the response inside the "response" parameter
    .end(function(response) {
        console.log(response.body);
        //success scenario
        if (response.ok) {
            emitter.emit('end', response.body);
        }
        //failure scenario
        else {
            emitter.emit('api call retuned error:', response.code);
        }
    });

    return emitter;
};

/* STEP 4 - defining the local api end points*/

//api call between the view and the controller
app.get('/product/:product_name', function(request, response) {
    //console.log(request.params.product_name);
    if (request.params.product_name == "") {
        response.json("Specify a product name");
    }
    else {
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

app.post('/favorite-product', function(req, res) {
    Product.create({
        name: req.body.productName
    }, function(err, products) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(products);
    });
});
app.get('/favorite-products', function(req, res) {
    Product.find(function(err, products) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(200).json(products);
    });
});

app.delete('/delete-favorites', function (req, res) {
    Product.remove(req.params.id, function (err, items) {
        if (err)
            return res.status(404).json({
                message: 'Item not found.'
            });

        res.status(200).json(items);
    });
});

/* STEP 6 - start and run the server*/
exports.app = app;
exports.runServer = runServer;
app.listen(process.env.PORT, process.env.IP);