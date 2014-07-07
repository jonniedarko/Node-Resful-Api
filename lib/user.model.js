var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validate = require('./user.validation');

var User = new Schema({
    firstname: { type: String, required: true},
    surname:  { type: String, required: true},
    username: { type: String, required: true, index: {unique: true, dropDups: true} },
    password: { type: String, required: true}
});
var UserModel = mongoose.model("User", User);
/* include after Schema is created */
User.path('username').validate(function (input){
    return validate.isAlphaNumericOnly(input) && validate.isLongEnough(input);
}, "Username must Contain only Alpha-Numeric characters [A-z, 0-9]");
User.path('password').validate(function (input){
    return validate.isGoodPassword(input) && validate.isLongEnough(input);
}, "INVALID PASSWORD: Password must Contain only Alpha-Numeric characters [A-z, 0-9], be at Least 6 characters long and contain 1 UpperCase Character and one Number");

module.exports.UserModel = UserModel;