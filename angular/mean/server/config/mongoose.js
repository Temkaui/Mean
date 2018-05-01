let mongoose = require('mongoose');
let fs = require('fs');
let path = require('path');
let models = path.join(__dirname, '../Products');
mongoose.connect('mongodb://localhost/Products');

fs.readdirSync(models).forEach(function(file) {
	if(file.indexOf('.js') >= 0) {
		require(models + '/' + file);
	}
});