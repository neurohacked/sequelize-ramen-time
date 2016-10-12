/*
 * functions for routing
 * and the logic of each route.
 */
var express = require('express');
var router = express.Router();
var ramen = require('../models/ramen.js');

router.get('/', function(req, res) {
    ramen.all(function(data) {
        var hbsObject = {
            ramen: data
        };
        // console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/ramen/create', function(req, res) {
    ramen.create(['name', 'image', 'devoured'], [req.body.name, req.body.image, req.body.devoured], function() {
        res.redirect('/');
    });
});

router.put('/ramen/devour/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;

    console.log('Ramen', condition);

    ramen.devour({
        devoured: req.body.devoured
    }, condition, function() {
        res.redirect('/');
    });
});

router.delete('/ramen/trash/:id', function(req, res) {
    var condition = 'id = ' + req.params.id;

    console.log('Ramen', condition);

    ramen.trash(condition, function() {
        res.redirect('/');
    });
});

module.exports = router;
