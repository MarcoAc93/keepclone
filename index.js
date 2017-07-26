var app = require('./server.js');
var port = process.env.PORT || 8000;
var Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:alonsocabralesAC93@localhost:3306/keep');

sequelize.authenticate().then(() => {
	app.listen(port, function(){
		console.log('Server Up');
	});
})
.catch(err => {
	console.error('Server Fail', err);
});