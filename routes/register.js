var express = require('express');
var router = express.Router();
var User = require('../models/user');
var sendinblue = require('sendinblue-api');

router.post('/details/', function(req, res){
  function sendemail(username, email){
    console.log(`username = ${username}, email = ${email}`)
    var obj = {};
    var input = {
      to: {},
      from: [],
      subject: "",
      html: ""
    };
    input.to[email] = email;
    input.from = [email, `from ${username}`];
    input.subject = "Hola";
    input.html = `Dear ${username}, <a href="localhost:3000/verify/${email}">Click here to verify your account</a>`
    console.log(input);

    var parameters = { "apiKey": "kUyApt4bCH38WIqn", "timeout": 5000 };
    var sendinObj = new sendinblue(parameters);
    sendinObj.send_email(input, function(err, response){
      if (err) {
        console.log('Error response received');
        obj.error = error;
      }
      obj.response = response;
      res.send(obj);
    });
  }
  console.log
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.password = req.body.password;
  newUser.email = req.body.email;
  newUser.save(function(err){
    if(err){
      console.log(err);
      res.json(err)
    }
    else{
      // res.json({
      //   success: true
      // });
      console.log("Data saved!");
      sendemail(req.body.username, req.body.email);
    }
  })
})

router.get('/verify/:email', function(req, res){
  User.findOne({email: req.params.email}, function(err, docs){
    if(err)
      res.json(err);
    else{
      if(!docs){
        console.log(`account = ${docs}`)
        res.send(`The account ${req.params.email} is not registered!`)
      }
      else if(docs.hasVerified === true){
        res.send(`The account ${req.params.email} has already been verified before`)
      }
      else{
        User.findOneAndUpdate({email: req.params.email}, {$set:{hasVerified: true}}, function(err, doc){
          if(err){
            res.json(err);
          }
          else{
            res.send(`${req.params.email} has been verified!`)
          }
        })

      }
  }})
})

module.exports = router;
