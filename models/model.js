var Sequelize = require('sequelize');

const sequelize = new Sequelize('blog2', 'root', 'alonsocabralesAC93', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
});

var Posts = sequelize.define('posts', {
	idPost:{
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	usuarioIdUsuario:{
		type: Sequelize.INTEGER
	},
	titulo:{
		type: Sequelize.STRING,
	},
	descripcion:{
		type: Sequelize.STRING,
	},
	contenido:{
		type: Sequelize.TEXT
	}
});



module.exports.Posts = Posts;
module.exports.sequelize = sequelize;