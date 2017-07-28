var models = require('../models/model.js');

function getAll(req, res){
	models.Cards.findAll({
	}).then(cards => {
		if (!cards) {
			res.send('Hubo un error en la consulta');
		} else {
			res.send({success:true, data:cards});
		}
	});
}

function getOneLike(req, res){
	var params = req.params;
	models.Cards.findAll({
		where:{
			titulo:{
				$like: '%'+params.titulo+'%',
			}
		}
	}).then(card =>{
		if(!card){
			res.send({success:false, message:'No se encontró el registro deseado'});
		} else {
			res.send({success:true, data:card});
		}
	});
}

function getOne(req, res){
	var idCard = req.params.idCard;
	models.Cards.findById(idCard).then(card =>{
		if(!card){
			res.send({success:false, message:'No se encontró el registro deseado'});
		} else {
			res.send({success:true, data:card});
		}
	});
}


function createCard(req, res){
	var params = req.body;
	
	if (!params) {
		res.send({success:false, message:'No vienen los parametros'});
	} else {
		if (!params.titulo) {
			res.send({success:false, message:'Falta el titulo'});
		} else {
			if(!params.contenido){
				res.send({success:false, message:'Falta el contenido'});
			} else {
				models.Cards.create(params).then(card => {
					if(!card){
						res.send('Hubo un problema al crear el registro');
					} else {
						res.send({success:true, message:'card creado correctamente', data:card});
					}
				});
			}
		}
	}
}

function updateCard(req, res){
	var idCard = req.params.idCard;
	var params = req.body;

	if (!idCard) {
		res.send({success:false, message:'No viene el idCard'});
	} else {
		if (!params.titulo) {
			res.send({success:false, message:'Falta el titulo'});
		} else {
			if (!params.contenido) {
				res.send({success:false, message:'Falta la descripcion'});
			} else {
				models.Cards.findOne({where:{idCard: idCard}}).then(card =>{
					if (!card) {
						res.send({success:false, message:'No se encontro el card'});
					} else {
						card.update(params).then((card) =>{
							if (!card) {
								res.send({success:false, message:'No se pudo actualizar el card'});
							} else {
								res.send({success:true, message:'card actualizado', card:card});
							}
						});
					}
				});
			}
		}
	}
}

function deleteCard(req, res){
	var idCard = req.params.idCard;

	models.Cards.findById(idCard).then(card => {
		if (!card) {
			res.send({succes:false,  message:'No se encontró el registro deseado'});
		} else {
			card.destroy({force:true});
			res.send({success:true, message:'Registro eliminado'});
		}
	});
}

module.exports = {
	getOne,
	getOneLike,
	getAll,
	createCard,
	updateCard,
	deleteCard
}