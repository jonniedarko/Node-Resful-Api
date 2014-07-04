var UserModel    = require('./user.model').UserModel;


module.exports = function(app){
    app.get('/api', function(request, response){
        response.send('BAM! you got a response');
    });

    app.get('/api/user', function(request, response) {
        response.send('This is not implemented now');
    });

    app.post('/api/user', function (request, response) {
        console.log("request.body", request.body);
       var user = new UserModel({
            firstname: request.body.firstname,
            surname:  request.body.surname,
            username: request.body.username,
            password: request.body.password
       });
       user.save( function (error){
            if(!error){
                console.log("User '"+user.username+"' Created!");
                return response.send({status: 'OK', user:user})
            } else {
                console.log(err);
                response.statusCode = 500;
                response.send({ error: 'Server error' });
            }
       });
    });

    app.get('/api/user/:id', function(request, response) {
        response.send('This is not implemented now');
    });

    app.put('/api/user/:id', function (request, response){
        response.send('This is not implemented now');
    });

    app.delete('/api/user/:id', function (request, response){
        response.send('This is not implemented now');
    });
}