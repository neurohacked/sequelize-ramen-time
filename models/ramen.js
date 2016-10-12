/*
 * setup a model that defines
 * how interface with the database.
 */
var orm = require('../config/orm.js');

var ramen = {
	all: function (cb) {
		orm.all('ramen', function (res) {
			cb(res);
		});
	},
	// cols and vals are arrays
	create: function (cols, vals, cb) {
		orm.create('ramen', cols, vals, function (res) {
			cb(res);
		});
	},
	devour: function (objColVals, condition, cb) {
		orm.devour('ramen', objColVals, condition, function (res) {
			cb(res);
		});
	},
	trash: function (condition, cb) {
		orm.trash('ramen', condition, function (res) {
			cb(res);
		});
	}
};

module.exports = ramen;
