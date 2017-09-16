var express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    User = require('../connection/database').User,
    helperJwt = require('../helpers/jwt');

router.post('/login', function(req, res, next)
{
    var user = {
        username: req.body.username,
        password: req.body.password
    };

    User.findOne(user, function(error, user, count)
    {
        if(error)
        {
            return res.status(400).json('Error obteniendo el usuario');
        }
        if(!user)
        {
            return res.status(404).json('No existe el usuario');
        }
        var token = jwt.sign(user.toObject(), helperJwt.secret);
        return res.status(200).json(token);
    })
});

router.post('/register', function(req, res, next)
{
    var user = {
        username: req.body.username,
        password: req.body.password
    };

    new User(user).save(function(err, post, count)
    {
        if(err)
        {
            return res.status(400).json('Error creando el usuario');
        }
        return res.status(200).json('Usuario registrado correctamente');
    })
});

module.exports = router;