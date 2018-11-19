const express = require('express');
const router =  express.Router();

router.get('/', function(req, res){
   res.render('add', { errors: req.session.errors });
   req.session.errors = null;
});

module.exports =  router;

router.post('/add', function(req, res) {
   let name = req.body.name;
   let email = req.body.email;

   req.checkBody('name', 'Name is required').notEmpty();
   req.checkBody('email', 'Email is required').notEmpty();
   req.checkBody('email', 'Please enter a valid email').isEmail();

   const errors = req.validationErrors();
   if(errors){
      req.session.errors = errors;
      res.redirect('/user');
   }
   else{
      req.session.success = true;
      res.redirect('/');
   }

});
