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
        if (!req.body.username || !req.body.password || !req.body.confirm) {
            res.status(400).send({
                message: "Please enter the required fields."
            });
        } else {
            if (req.body.password !== req.body.confirm) {
                return res.status(400).send({
                    message: "passwords do not match."
                });
            }
            try {
                const dup = await User.findOne({ username: req.body.username });
                if (dup !== null) {
                    return res.status(400).send({
                        message: "username already taken."
                    });
                }
            } catch (e) {
                return res.status(500).send({
                    message: e.message
                });
            }

            const user = new User();
            user.username = req.body.username;
            await user.setPassword(req.body.password);
            console.log(user);
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