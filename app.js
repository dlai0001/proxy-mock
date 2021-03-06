//################# CONFIG ####################################
proxyToAddress = "http://www.mocky.io"; //address to proxy to.

servicePort = 3000; //port to run this service
//#############################################################

var express = require('express');
var fs = fs || require('fs');

var app = express();
var mockModules = {}; //store object with our mock middleware.

// Register Mock Middleware modules
console.log("Registering middleware mock modules.");
const mockModulePath = "./mock-modules/";
files = fs.readdirSync(mockModulePath);
files.forEach(function(item) {
	moduleName = item.slice(0, -3);
	console.log("loading ", moduleName, "...");
	var mock_middleware = require(mockModulePath + moduleName);	
	mockModules[moduleName] = new mock_middleware();
	mockModules[moduleName].register(app);	
});

// Setting up our webadmin
app.use("/_admin", express.static('admin-web'));
var AdminApi = require("./admin-api");
var adminApiInstance = new AdminApi(mockModules);
app.use("/_adminapi", adminApiInstance.router);

// Setting up our proxy
var proxy = require('http-proxy-middleware');
var options = {
        target: proxyToAddress, // target host
        changeOrigin: true,               // needed for virtual hosted sites
        ws: true,                         // proxy websockets
        
        proxyTable: {
            // when request.headers.host == 'dev.localhost:3000',
            // override target 'http://www.example.org' to 'http://localhost:8000'
            proxyToAddress : 'http://localhost:'+ servicePort
        }
    };
var proxyInstance = proxy(options);
app.use(proxyInstance);


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


