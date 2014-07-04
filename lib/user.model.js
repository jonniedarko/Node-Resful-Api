var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = new Schema({
    firstname: { type: String, required: true},
    surname:  { type: String, required: true},
    username: { type: String, required: true},
    password: { type: String, required: true}
});
var UserModel = mongoose.model("User", User);

module.exports.UserModel = UserModel;