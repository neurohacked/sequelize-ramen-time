const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    models.Ramen.findAll({
            include: [models.User]
        })
        // connect the findAll to this .then
        .then(function(data) {
            // grab the user info from our req.
            // How is it in our req?
            // This info gets saved to req via the users_controller.js file.
            res.render('ramen/index', {
                user_id: req.session.user_id,
                username: req.session.user_name,
                email: req.session.user_email,
                logged_in: req.session.logged_in,
                ramen: data
            });
        });
});

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
