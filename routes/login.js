var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user')

router.post('/', function(req, res){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            res.json(err);
        }
        else{
            if(!user){
                res.send(`${email} not registered!`);
            }
            else if(user.password !== req.body.password){
                    res.send('Password is incorrect!');
            }
            else{
                // var token = 'blahblah'
                var token = jwt.sign(user, 'shhhhh', {expiresIn: 1440});

                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }
        }
    })
})

router.use( function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    console.log(token);
    // verifies secret and checks exp
    jwt.verify(token, 'shhhhh', function(err, decoded) {      
      if (err) {
        res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});

router.get('/dashboard', function(req, res){
    res.send('logged in');
})

module.exports = router;