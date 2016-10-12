const bcrypt = require('bcryptjs');
const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/sign-out', function(req, res) {
    req.session.destroy(function(err) {
        res.redirect('/');
    });
});


// login
router.post('/login', function(req, res) {
    models.User.findOne({
        where: {
            email: req.body.email
        }
    }).then(function(user) {
        // Use bcrypt to compare the user's password input
        // with the hash stored in the user's row.
        // If the result is true,
        bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
            // if the result is true (and thus pass and hash match)
            if (result === true) {

                // save the user's information
                // to req.session, as the comments below show

                // so what's happening here?
                // we enter the user's session by setting properties to req.

                // we save the logged in status to the session
                req.session.logged_in = true;
                // the username to the session
                req.session.user_name = user.username;
                console.log('Username is:', user.username);
                // the user id to the session
                req.session.user_id = user.id;
                // and the user's email.
                req.session.user_email = user.email;

                res.redirect('/');
            }
            // if the result is anything but true (password invalid)
            else {
                // redirect user to sign in
                res.redirect('/');
            }
        });
    });
});


// register a user
router.post('/create', function(req, res) {
    models.User.findAll({
        where: {
			username: req.body.username,
            email: req.body.email
        }
    }).then(function(users) {

        if (users.length > 0) {
            console.log(users);
            res.send('We already have an email or username for this account');
        } else {

            // Using bcrypt, generate a 10-round salt,
            // then use that salt to hash the user's password.
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {

                    // Using the User model, create a new user,
                    // storing the email they sent and the hash you just made
                    models.User.create({
							username: req.body.username,
                            email: req.body.email,
                            password_hash: hash
                        })
                        // In a .then promise connected to that create method,
                        // save the user's information to req.session
                        // as shown in these comments
                        .then(function(user) {

                            // so what's happening here?
                            // we enter the user's session by setting properties to req.

                            // we save the logged in status to the session
                            req.session.logged_in = true;
                            // the username to the session
                            req.session.user_name = user.username;
                            // the user id to the session
                            req.session.user_id = user.id;
                            // and the user's email.
                            req.session.user_email = user.email;

                            // redirect to home on login
                            res.redirect('/');
                        });
                });
            });

        }
    });
});

module.exports = router;
