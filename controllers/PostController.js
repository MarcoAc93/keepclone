var models = require('../models/model.js');

function getOne(req, res){
	var params = req.params;
	if(!params){
		res.send({success: false, message:'No hay parametros para procesar'});
	} else {
		if(!params.idPost){
			res.send({success: false, message:'No viene el id del Post'});
		} else {
			var idPost = params.idPost;

			models.Posts.findById(idPost).then(post => {
				if (!post) {
					res.send({success:false, message:'No se encontró el registro deseado'});
				} else {
					res.send({success: true, data:post});
				}
			});
		}
	}
}

function getOneInclude(req, res){
	var params = req.params;

	if (!params) {
		res.send({success: false, message:'No hay parametros'});
	} else {
		if(!params.idPost){
			res.send({success:false, message:'No viene el idPost'});
		} else {
			var idPost = req.params.idPost;
			models.Posts.findOne({
				where:{
					idPost:idPost
				},
				include:[{model:models.Comments, as:'comentario'}]
			}).then(post =>{
				if (!post) {
					res.send('No se encontró el registro deseado');
				} else {
					res.send({success:true, data:post});
				}
			});
		}
	}
}

function getAll(req, res){
	models.Posts.findAll({
		order: [['idPost', 'DESC']],
		include:[
			{model: models.Users, as:'usuario'},
			{model: models.Likes, as:'like', include:[{model:models.Users, as:'usuario'}]}
		]
	}).then(posts => {
		if (!posts) {
			res.send('Hubo un error en la consulta');
		} else {
			var success = true;
			res.send({success:success, data:posts});
		}
	});
}

function getAllInclude(req, res){
	models.Posts.findAll({
		order: [['idPost', 'DESC']],
		include:[
			{model:models.Comments, as:'comentario'},
			{model:models.Users, as:'usuario'},
			{model:models.Likes, as:'like', include:[{model:models.Users, as:'usuario'}]}
		],
	}).then(posts => {
		if (!posts) {
			res.send('Hubo un error en la consulta');
		} else {
			res.send({success:true, data:posts});
		}
	});
}

function createPost(req, res){
	var params = req.body;
	console.log(params);
	if (!params) {
		res.send({success:false, message:'No vienen los parametros'});
	} else {
		if (!params.titulo) {
			res.send({success:false, message:'Falta el titulo'});
		} else {
			if(!params.descripcion){
				res.send({success:false, message:'Falta la descripcion'});
			} else {
				if (!params.contenido) {
					res.send({success: false, message:'Falta el contenido'});
				} else {
					if (!params.usuarioIdUsuario) {
						res.send({success: false, message:'Falta el idUsuario'});
					}else {
						models.Posts.create(params).then(post => {
							if(!post){
								res.send('Hubo un problema al guardar el registro');
							} else {
								res.send({success:true, message:'Post creado correctamente', post:post});
							}
						});
					}
				}
			}
		}
	}
}

function updatePost(req, res){
	var idPost = req.params.idPost;
	var params = req.body;

	if (!idPost) {
		res.send({success:false, message:'No viene el idPost'});
	} else {
		if (!params.titulo) {
			res.send({success:false, message:'Falta el titulo'});
		} else {
			if (!params.descripcion) {
				res.send({success:false, message:'Falta la descripcion'});
			} else {
				if (!params.contenido) {
					res.send({success:false, message:'Falta el contenido'});
				} else {

					models.Posts.findOne({where:{idPost: idPost}}).then(post =>{
						if (!post) {
							res.send({success:false, message:'No se encontro el post'});
						} else {
							post.update(params).then((post) =>{
								if (!post) {
									res.send({success:false, message:'No se pudo actualizar el post'});
								} else {
									res.send({success:true, message:'Post actualizado', post:post});
								}
							});
						}
					});
				}
			}
		}
	}

}

function deletePost(req, res){
	var idPost = req.params.idPost;

	models.Posts.findById(idPost).then(post => {
		if (!post) {
			res.send({succes:false,  message:'No se encontró el registro deseado'});
		} else {
			post.destroy({force:true});
			res.send({success:true, message:'Registro eliminado'});
		}
	});

}

module.exports = {
	getOne,
	getOneInclude,
	getAll,
	getAllInclude,
	createPost,
	updatePost,
	deletePost
}