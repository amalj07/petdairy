const express = require('express');
const router = express.Router();

//Livestock Model
const Livestock = require('../models/livestock');
//User Model
const User = require('../models/official');

//Adding an article
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('add_livestock', {
    title: 'Add livestock details'
  })
});


//Saving the article to db POST
router.post('/add', (req, res) => {
  req.checkBody('ownerid', 'Owner ID is required').notEmpty();
  req.checkBody('ownername', 'Owner Name is required').notEmpty();
  req.checkBody('animalid', 'Animal ID is required').notEmpty();
  req.checkBody('animaltype', 'Animal ID is required').notEmpty();
  req.checkBody('birthdate', 'Birht Date is required').notEmpty();
  req.checkBody('place', 'Place is required').notEmpty();
  // req.checkBody('isinsured', 'Animal ID is required').notEmpty(); //check insured or not
  //req.checkBody('insuranceno', 'Insuracnce Number is required').notEmpty();
  // req.checkBody('isavlive', 'Animal ID is required').notEmpty(); //check animal is alive
  // req.checkBody('deathdate', 'Death Date is required').notEmpty();
  // req.checkBody('deathreason', 'Death Reason is required').notEmpty();

  //Get errors
  let errors = req.validationErrors();
  if (errors) {
    res.render('add_livestock', {
      title: 'Add livestock details',
      errors: errors
    });
  } else {
    let livestock = new Livestock();
    livestock.ownerid = req.body.ownerid;
    livestock.ownername = req.body.ownername;
    livestock.animalid = req.body.animalid;
    livestock.animaltype = req.body.animaltype;
    livestock.birthdate = req.body.birthdate;
    livestock.place = req.body.place;
    // livestock.insured = req.body.insured;
    // livestock.insuranceno = req.body.insuranceno;
    // livestock.alive = req.body.alive;
    // livestock.deathdate = req.body.deathdate;
    // livestock.deathreason = req.body.deathreason;
    // livestock.disease = req.body.disease;

    livestock.save().then( () => {
      req.flash('success', 'Livestock details added');
      res.redirect('/');
    }).catch( (err) => {
      console.log(err)
    });
  }
});


//Load edit form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Livestock.findById(req.params.id, (err, article) => {
    // if(article.author != req.user._id){
    //   req.flash('danger', 'Not Authorized');
    //   res.redirect('/');
    // }else{
    //   res.render('edit_livestock', {
    //     title: 'Edit livestock details',
    //     article: article
    //   });
    // }
    res.render('edit_livestock', {
      title: 'Edit livestock details',
      livestock: livestock
    });
  });
});


//Updating the livestock details
router.post('/edit/:id', (req, res) => {
  let livestock = {};
  livestock.ownerid = req.body.ownerid;
  livestock.ownername = req.body.ownername;
  livestock.animalid = req.body.animalid;
  livestock.animaltype = req.body.animaltype;
  livestock.birthdate = req.body.birthdate;
  livestock.place = req.body.place;
  // livestock.insured = req.body.insured;
  // livestock.insuranceno = req.body.insuranceno;
  // livestock.alive = req.body.alive;
  // livestock.deathdate = req.body.deathdate;
  // livestock.deathreason = req.body.deathreason;
  // livestock.disease = req.body.disease;

  let query = {_id: req.params.id};

  Livestock.update(query, livestock).then( () => {
    req.flash('success', 'Livestock details updated');
    res.redirect('/');
  }).catch( (err) => {
    console.log(err)
  })
})

//Deleting a livestock data
router.delete('/:id', (req, res) => {
  // if(!req.user._id){
  //   res.status(500).send();
  // }

  let query = {_id: req.params.id}

  Livestock.findById(req.params.animalid, (err, livestock) =>{
    // if (article.author != req.user._id) {
    //   res.status(500).send();
    // } else {
    //   Livestock.remove(query).then( () => {
    //     req.flash('danger', 'Livestock details deleted');
    //     res.send('Success');
    //   }).catch( (error) => {
    //     console.log(error)
    //   });
    // }
    Livestock.remove(query).then( () => {
      req.flash('danger', 'Livestock details deleted');
      res.send('Success');
    }).catch( (error) => {
      console.log(error)
    });
  });
});

//fetching single livestock data from db
router.get('/:id', (req, res) => {
  Livestock.findById(req.params.id, (err, livestock) => {
    // User.findById(article.author, (err, user) => {
        res.render('livestock', {
          livestock: livestock
          // author: user.name
        });
    // })
  });
});

//Access control
function ensureAuthenticated(req, res,next){
  if(req.isAuthenticated()){
    return next();
  } else{
    req.flash('danger','Please Login');
    res.redirect('/users/login');
  }
}

module.exports = router;
