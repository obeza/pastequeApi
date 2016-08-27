"use strict";

var express = require('express');
var router = express.Router();
var modelUtilisateur = require('./../models/utilisateur');
var bcrypt = require('bcrypt');
var config = require('./../config');
const Salt = bcrypt.genSaltSync(config.salt);

// liste les utilisateurs
router.route('/utilisateur/list')
.get(function(req, res) {

    modelUtilisateur.find(function (err, utilisateur) {
        if (err) return console.error(err);
        res.json(utilisateur);
    });

});

// donne les infos sur un utilisateur
router.route('/utilisateur/:user_id')
.get(function(req, res) {

    modelUtilisateur.findById(req.params.user_id, function(err, utilisateur) {
        if (err)
            res.send(err);
        res.json(utilisateur);
    });

});

// ajouter un utilisateur via l'id envoyé dans le JSON
router.route('/utilisateur')
.post(function(req, res) {
     
    let data = req.body;
    
    data.passe = bcrypt.hashSync(data.passe, Salt);
    

    function creer(){
        console.log('5 secondes passées....');
        modelUtilisateur.create(data, function(err, utilisateur) {
        if (err) {
            if (err.code==11000)
                res.json({ code:"double" })
        } else {
            res.json({ code:"ok"}); // return user json if ok
        }
    });
    }

    setTimeout(creer, 5000);

    


})
// modifie un utilisateur via l'id envoyé dans le JSON
.put(function(req, res){

    let data = req.body;

    // je modifie tout sauf le mot de passe
    modelUtilisateur.findOneAndUpdate({id: data.id }, {
        prenom:data.prenom,
        nom:data.nom,
        email:data.email,
        statut:data.statut
    }, 
        ()=> {res.json({"msg":"ok"});
    });

});

module.exports = router;
