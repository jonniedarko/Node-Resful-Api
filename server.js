var express = require('express');
var methodOverride = require('method-override');
var path = require('path');
var bodyParser = require('body-parser');
var restRoutes = require('./lib/rest.routes.js');
require('./config/db.config')();

var app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride());
app.use(bodyParser.urlencoded({extended: true}));
// Include our routes from "rest.routes.js"
restRoutes(app);

app.listen(1234, function(){
    console.log('Our First Express/Node Server listening on port 1234');
});
