'use strict'
var express = require('express');
var bodyParser  = require('body-parser');
var path = require('path');
var models = require('./models/model.js');
var cors = require('cors');
var app = express();

// las Rutas van aqui
var cards = require('./router/CardRouter.js');

// Parser para los request
app.use(cors({
	origin: 'http://localhost:4200',
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

/* app.use(express.static(__dirname + '/client/dist/'));
app.get('*', function(req, res){
res.sendFile(path.join(__dirname + '/client/dist/index.html'));
}); */

// Cargar Rutas
app.use('/api',cards);

module.exports = app;