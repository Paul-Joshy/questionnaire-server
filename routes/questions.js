var express = require('express');
var router = express.Router();
var _ = require('underscore');
var mongoose = require('mongoose');

var Question = require('../models/question');

router.get('/', function (req, res, next) {
    Question.find({
        'section_id': new mongoose.Types.ObjectId(req.query['section_id'])
    }).exec( function(err, questions) {
        if (err) {
            next(err);
        } else {
            res.status(200);
            res.json(questions);
        }
    });
});

router.post('/', function (req, res, next) {
    var newQuestion = new Question(req.body);
    newQuestion.save( function(err, question) {
        if (err) {
            next(err);
        } else {
            res.status(200);
            res.json(question);
        }
    });
});

module.exports = router;
