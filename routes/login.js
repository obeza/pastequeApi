"use strict";

var express = require('express');
var router = express.Router();
var modelUtilisateur = require('./../models/utilisateur');
var bcrypt = require('bcrypt');
var config = require('./../config');

var randomToken = require('random-token');

router.route('/login')
.post(function(req, res) {
     
    let data = req.body;

    // check si le JSON contient bien les variables email et passe
    if (data.email && data.passe){  

        modelUtilisateur.findOne( {
            email:data.email
        }, function(err, utilisateur) {
                if (err){
                    console.log( err);              
                }
                if (utilisateur){
                    let check = bcrypt.compareSync(data.passe, utilisateur.passe);

                    if (check && utilisateur.actif){
                        let token = randomToken(90);

                        modelUtilisateur.findOneAndUpdate({ _id: utilisateur.id }, {
                            token:token
                        },
                            ()=> {res.json({
                                prenom:utilisateur.prenom,
                                nom:utilisateur.nom,
                                email:utilisateur.email,
                                token:token
                            });
                        });
                    } else {
                        res.sendStatus(401);
                    }
                } else {
                    res.sendStatus(401);
                }
                
        });

    } else {
        res.sendStatus(401);
    }


});

module.exports = router;
