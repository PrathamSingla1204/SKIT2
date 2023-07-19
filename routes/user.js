const express = require("express");
const router = express.Router();
const passport = require("passport");

const homeController = require("../controllers/home_Controller");

router.use('/csv', require('./csv'));
router.get('/signin',homeController.signin);
router.get('/signup',homeController.signup);
router.post('/create',homeController.create);
router.post('/login',passport.authenticate(
    'local',
    {failureRedirect:'/user/signin'},
),homeController.login);

module.exports = router;