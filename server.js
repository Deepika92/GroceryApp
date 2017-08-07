var Hapi= require('hapi');
var server = new Hapi.Server('localhost', 27017);
var routes =require('./routes');
var Mongoose=require('mongoose');


Mongoose.connect('mongodb://localhost/grocerydb');

var rootHandler= function(request, reply){
	reply({message: "Welcome to your Grocery App"});
};

server.route({
	method:'GET',
	path:'/',
	handler:rootHandler
});

routes.init(server);

server.start(function(){

console.log('app listening on port 27017' + server.info.uri);

})