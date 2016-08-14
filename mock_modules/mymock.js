
module.exports = {
	register: function(app) {
		app.use('/v2/57b0e6e426000012273d28a1', function (req, res, next) {
  			console.log("this is my mock");  			
  			res.send("MOCK DATA")
		});
	},

	reset: function() {
		//do nothing
	}
}