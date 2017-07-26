'user strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'super_secret';

// Middleware para checar los headers de autenticacion
exports.ensureAuth = function(req, res, next){
	if(!req.headers.authorization)
		return res.status(403).send({message:'La peticion no tiene la cabecera de autenticacion'});

	var token = req.headers.authorization.replace(/['"]+/g, '');
	try{
		var payload = jwt.decode(token, secret);
		if (payload.exp <= moment().unix()) {
			return res.status(401).send({message:'El token a expirado'});	
		}
	}catch(ex){
		console.log(ex);
		return res.status(402).send({message:'El token no es valido'});
	}

	req.user = payload;
	next();
}