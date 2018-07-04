exports.DATABASE_URL = process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    (process.env.NODE_ENV === 'production' ?
        'mongodb://administrator:administrator123@ds127811.mlab.com:27811/node-capstone-shoppers-guide-bestbuy' :
        'mongodb://administrator:administrator123@ds127811.mlab.com:27811/node-capstone-shoppers-guide-bestbuy');
exports.PORT = 3000;
