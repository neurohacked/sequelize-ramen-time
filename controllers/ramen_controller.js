const models = require('../models');
const express = require('express');
const router = express.Router();

router.post('/create', function(req, res) {
    models.Ramen.create({
            ramen_name: req.body.ramen_name,
            image: req.body.image,
            devoured: req.body.devoured,
            user_id: req.session.user_id
        })
        // connect the .create to this .then
        .then(function() {
            res.redirect('/');
        });
});

router.put('/update/:id', function(req, res) {
    models.Ramen.update({
            devoured: req.body.devoured
        }, {
            where: {
                id: req.params.id
            }
        })
        // connect it to this .then.
        .then(function(result) {
            res.redirect('/');
        }, function(rejectedPromiseError) {

        });
});

router.delete('/delete/:id', function(req, res) {
    models.Ramen.destroy({
            where: {
                id: req.params.id
            }
        })
        // connect it to this .then.
        .then(function() {
            res.redirect('/');
        });

});

module.exports = router;
