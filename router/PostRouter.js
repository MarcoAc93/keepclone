var express = require('express');
var PostController = require('../controllers/PostController.js');
var auth_md = require('../middlewares/authentication.js');
var api = express.Router();

api.get('/getAll', PostController.getAll);
api.get('/getOne/:idPost', PostController.getOne);
api.get('/getOneInclude/:idPost', PostController.getOneInclude);
api.post('/createPost', auth_md.ensureAuth, PostController.createPost);
api.get('/getAllInclude', PostController.getAllInclude);
api.put('/updatePost/:idPost', auth_md.ensureAuth, PostController.updatePost);
api.delete('/deletePost/:idPost', auth_md.ensureAuth, PostController.deletePost);

module.exports = api;