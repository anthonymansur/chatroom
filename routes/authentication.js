const passport = require('passport');
const { User } = require('../models');

module.exports = app => {
    app.post('/login', passport.authenticate('local'), (req, res) => {
        if (req.user) {
            res.status(200).send("Passed!");
        } else {
            res.status(401).send("Failed!");
        }
    });
    app.post('/signup', async (req, res) => {
        if (!req.body.email || !req.body.password) {
            res.status(400).end();
        } else {
            // TODO: search for user
            const user = new User({
                email: res.body.email
            });
            user.setPassword(req.body.password);
            try {
                await user.save();
                res.status(200).redirect('/');
            } catch(e) {
                return res.status(500).send({
                    message: e.message
                });
            }
        }
    });
}