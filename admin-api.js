var express = require('express');


module.exports = function(modulesDictionary) {
	this.modulesDictionary = modulesDictionary;

	var router = express.Router();
	router.use("/:appname/:method", function(req, res, next) {
		try {
			return modulesDictionary[req.params.appname][req.params.method](req, res, next);
		} catch(error) {
			console.log(error);
			res.send({error: 1, message:"No such module/method"});
		}
	});


	this.router = router;
	return this;
};