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
            res.render('index', {
                user_id: req.session.user_id,
                username: req.session.user_name,
                email: req.session.user_email,
                logged_in: req.session.logged_in,
                ramen: data
            });
        });
});

module.exports = router;
