var express = require('express');
var router = express.Router();
var _ = require('underscore');

var Section = require('../models/section');

router.get('/root', function (req, res, next) {
    Section.find({root: true}, {children: 0}).exec( function(err, sections) {
        if (err) {
            next(err);
        } else {
            res.status(200);
            res.json(sections);
        }
    });
});

router.get('/:id/children', function (req, res, next) {
    Section.findById(req.params['id'], {'children.children': 0}).populate('children').exec( function(err, section) {
        if (err) {
            next(err);
        } else {
            res.status(200);
            res.json(section.children);
        }
    });
});

router.post('/', function (req, res, next) {
    var newSection = new Section(req.body);
    newSection.save( function(err, section) {
        if (err) {
            next(err);
        } else {
            res.status(200);
            res.json(section);
        }
    });
});

router.get('/:id', function (req, res, next) {
    Section.findById(req.params['id']).populate('children').exec( function(err, section) {
        if (err) {
            next(err);
        } else {
            res.status(200);
            res.json(section);
        }
    });
});

router.put('/:id', function (req, res, next) {
    Section.findByIdAndUpdate(req.params['id'], req.body, {new: true}, function(err, section) {
        if (err) {
            next(err);
        } else {
            res.status(200);
            res.json(section);
        }
    });
});

module.exports = router;
