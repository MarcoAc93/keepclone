var Sequelize = require('sequelize');

const sequelize = new Sequelize('keep', 'root', 'alonsocabralesAC93', {
	host: 'localhost',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
});

var Cards = sequelize.define('cards', {
	idCard:{
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	titulo:{
		type: Sequelize.STRING,
	},
	contenido:{
		type: Sequelize.TEXT
	}
});



sequelize.sync().then(() => {
  console.log('bien')
}).catch(error => {
  console.log('mal')
})