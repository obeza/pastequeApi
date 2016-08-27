var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var config = require('./config');

var mongoose   = require('mongoose');

mongoose.connect(config.database, function(err) {
    if (err) {
        console.log( "\x1b[33m", err);
        console.log( "\x1b[0m" )
    }
});

// charge les routes
var utilisateurRoute = require('./routes/utilisateur');
var loginRoute = require('./routes/login');

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.use('/api', utilisateurRoute);
app.use('/api', loginRoute);

var port = process.env.PORT || 8080; 

// START THE SERVER
// =============================================================================

app.listen(port);
console.log('Magic happens on port ' + port);