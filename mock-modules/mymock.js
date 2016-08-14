
module.exports = function() {

	this.register = function(app) {
		app.use('/v2/57b0e6e426000012273d28a1', function (req, res, next) {
  			console.log("this is my mock");  			
  			res.send("MOCK DATA")
		});
	},

	this.reset = function(req, res, next) {
		res.send({status: "OK"});
	}

	return this;
}