var express = require('express'),
    router = express.Router(),
    jwt = require('jsonwebtoken'),
    Post = require('../connection/database').Post,
    helperJwt = require('../helpers/jwt'),
    mongoose = require('mongoose');

router.get('/', function (req, res, next) {
    var token = helperJwt.decodeToken(req, res);
    jwt.verify(token, helperJwt.secret, function (error, decoded) {
        if (error || !decoded) {
            return res.status(401).end();
        }
        else {
            Post.find().populate('postedBy comments.postedBy').exec(function (err, posts) {
                if (err) {
                    return res.status(400);
                }
                res.status(200).json(posts);
            })
        }
    })
})

router.get("/:id", function (req, res, next) {
    var token = helperJwt.decodeToken(req);
    jwt.verify(token, helperJwt.secret, function (error, decoded) {
        if (error) {
            res.status(401);
        } else {
            Post.findById(req.params.id).populate('postedBy comments.postedBy').exec(function (err, post) {
                res.status(200).json(post);
            })
        }
    })
})

router.post('/:id/comment', function(req, res, next)
{
    var token = helperJwt.decodeToken(req);
    jwt.verify(token, helperJwt.secret, function(error, decoded)
    {
        if(error)
        {
            return res.status(401);
        }
        else
        {
            var comment = {
                postedBy: new mongoose.mongo.ObjectId(decoded._id),
                body: req.body.comment,
                date: new Date
            };

            Post.findByIdAndUpdate(
                req.params.id,
                {$push: {"comments": comment}},
                {new: true}
            ).populate('postedBy comments.postedBy', 'username').exec(function(err, post)
            {
                return res.status(200).json(post);
            })
        }
    })
})

router.put("/:id", function (req, res, next) {
    var token = helperJwt.decodeToken(req);
    jwt.verify(token, helperJwt.secret, function (error, decoded)
    {
        if(error)
        {
            return res.status(500);
        }
        else
        {
            Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, post)
            {
                if(err)
                {
                    return res.send(500, { error: err});
                }
                return res.send("Post actualizado correctamente");
            })
        }
    })
})

router.post('/', function(req, res, next)
{
    var token = helperJwt.decodeToken(req);
    jwt.verify(token, helperJwt.secret, function (error, decoded) {
        if (error) {
            res.status(401);
        } else {
            new Post({
                postedBy: new mongoose.mongo.ObjectId(decoded._id),
                title: req.body.post.title,
                body: req.body.post.body,
                comments: [],
                updated_at: Date.now()
            }).save(function(err, post, count)
            {
                if(err)
                {
                    return res.status(400);
                }
                else
                {
                    Post.findById(post._id).populate('postedBy comments.postedBy', 'username').exec(function (err, post) {
                        res.status(200).json(post);
                    })
                }
            })
        }
    })
});

router.delete("/:id", function (req, res, next) {
    var token = helperJwt.decodeToken(req);
    jwt.verify(token, helperJwt.secret, function (error, decoded)
    {
        if (error) {
            res.status(401).send(error);
        } else {
           Post.findOneAndRemove({_id: req.params.id}).exec(function(err, post, count)
           {
               return res.status(200).json({res: 'Post eliminado'});
           })
        }
    })
})

module.exports = router;