var UserModel    = require('./user.model').UserModel;


module.exports = function(app){
       app.get('/api/user', function (request, response) {
        return UserModel.find(function (error, users) {
            if (!error) {
                return response.send(users);
            } else {
                response.statusCode = 500;
                console.log('Internal error(%d): %s',response.statusCode,error.message);
                return response.send({ error: 'Server error' });
            }
        });
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

    app.get('/api/user/:id', function (request, response) {
        return UserModel.findById(request.params.id, function (error, user) {
            if(!user) {
                response.statusCode = 404;
                return response.send({ error: 'Not found' });
            }
            if (!error) {
                return response.send({ status: 'OK', user:user });
            } else {
                response.statusCode = 500;
                console.log('Internal error(%d): %s',response.statusCode,error.message);
                return response.send({ error: 'Server error' });
            }
        });
    });

    app.put('/api/user/:id', function (request, response){
        return UserModel.findById(request.params.id, function (error, user) {
            if(!user) {
                response.statusCode = 404;
                return response.send({ error: 'Not found' });
            }

            user.firstname = request.body.firstname;
            user.surname = request.body.surname;
            user.username = request.body.username;
            user.password = request.body.password;
            return user.save(function (error) {
                if (!error) {
                    console.log("user updated");
                    return response.send({ status: 'OK', user:user });
                } else {
                    if(error.name == 'ValidationError') {
                        response.statusCode = 400;
                        response.send({ error: 'Validation error' });
                    } else {
                        response.statusCode = 500;
                        response.send({ error: 'Server error' });
                    }
                    console.log('Internal error(%d): %s',response.statusCode,error.message);
                }
            });
        });
    });

    app.delete('/api/user/:id', function (request, response){
        return UserModel.findById(request.params.id, function (error, user) {
            if(!user) {
                response.statusCode = 404;
                return response.send({ error: 'Not found' });
            }
            return user.remove(function (err) {
                if (!error) {
                    console.log("User removed");
                    return response.send({ status: 'OK' });
                } else {
                    response.statusCode = 500;
                    console.log('Internal error(%d): %s',response.statusCode,error.message);
                    return response.send({ error: 'Server error' });
                }
            });
        });
    });
}