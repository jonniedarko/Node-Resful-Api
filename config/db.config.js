module.exports = function () {
    var mongoose = require('mongoose');

    mongoose.connect('mongodb://localhost:27017/crudusers');

    var db = mongoose.connection;

    db.on('error', function(error){
        console.log("connection error: "+error.message);
    });

    db.once('open', function(){
        console.log("Connected successfull!")
    });
}