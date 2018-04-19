var express = require('express');
var router = express.Router();
var Comment = require('../models/comments');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET feed page. */
router.get('/feed', function(req, res, next) {
  res.render('feed', { title: 'Express' });
});
router.get('/contact', function(req, res, next) {
    res.render('contact',{ title: 'Express' });
});
/* GET feed page. */
router.get('/Gallery', function(req, res, next) {
  res.render('Gallery', { title: 'Express' });
});



router.post('/addComment', function(req, res, next) {
   
    // Extract the request body which contains the comments
    comment = new Comment(req.body);
    comment.save(function (err, savedComment) {
        if (err)
            throw err;

        res.json({
            "id": savedComment._id
        });
    });
});

/**
 * Returns all comments from our database
 */
router.get('/getComments', function(req, res, next) {

    Comment.find({}, function (err, comments) {
        if (err)
            res.send(err);
        res.json(comments);
    });
});
router.put('/updateComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.update({_id:id}, req.body, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully updated the document"});
    });
});

/**
 * Deletes a comment from the database
 */

router.delete('/removeComment/:id', function(req, res, next){

    var id = req.params.id;
    Comment.remove({_id:id}, function (err) {
        if (err)
            res.send(err);

        res.json({status : "Successfully removed the document"});
    });
});
module.exports = router;


