var express = require('express');
var path = require('path');
var app = express();

// starting static fileserver, that will watch `public` folder (in our case there will be `index.html`)
app.use(express.static(path.join(__dirname, "public")));

app.get('/api', function(request, response){
    response.send('BAM! you got a response');
});

app.listen(1234, function(){
    console.log('Our First Express/Node Server listening on port 1234');
});
