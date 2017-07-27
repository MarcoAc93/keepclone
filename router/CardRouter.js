var express = require('express');
var CardController = require('../controllers/CardController.js');
var api = express.Router();

api.get('/getOneLike/:titulo', CardController.getOneLike);
api.get('/getOne/:idCard', CardController.getOne);
api.get('/getAll', CardController.getAll);
api.post('/createCard', CardController.createCard);
api.put('/updateCard/:idCard', CardController.updateCard);
api.delete('/deleteCard/:idCard', CardController.deleteCard);

module.exports = api;