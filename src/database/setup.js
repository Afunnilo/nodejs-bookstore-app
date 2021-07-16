// set up mongoose
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const connectionString ='mongodb://localhost:27017/bookapp' || process.env.DB_URI ;

module.exports = function (){
    mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify:false
    }, (err)=> {
        if (err) {
            console.log(err)
        } else {
            console.log('bookbase connected succesfully')
        }
    });
}