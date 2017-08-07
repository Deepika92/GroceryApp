'use strict';

const Boom = require('boom');  
const Joi = require('joi');
var GrocerymySchema = require('../model/grocerymySchema').GrocerymySchema;

module.exports = exports = function(server){

	console.log('Loading routes');
	exports.index(server);
	exports.create(server);
	exports.display(server);
	exports.delete(server);
};


exports.index =function(server){

	server.route({
		method: 'GET',
		path: '/Items/{id}',
    	handler: function (request, reply) {
		GrocerymySchema.find({}, function(err, grocery)
		{
			if(!err){

				reply(grocery);
			}
			else{

				reply(Boom.badImplementation(err));
			}
		});
		}

	});
};



exports.create =function(server){


	var item;
	server.route({
		method: 'POST',
		path: '/Items',
    	handler: function (request, reply) {

    	item = new GrocerymySchema();
    	item.id= new request.payload._id;
		item.Name = new request.payload.Name;
		item.Price= new request.payload.Price;
		item.StoreName= new request.payload.StoreName;
		item.Date= new request.payload.Date;    	

		event.save(function(err)
		{
			if(!err){

				reply(item).created('/grocery/'+item._id);
			}

			else{

				reply(Boom.forbidden(getErrorMessageFrom(err)));
			}
		});
		},

		config: {
        validate: {
            payload: {
                Name: Joi.string().min(3).max(50).required(),
                Price: Joi.string().min(1).max(50).required(),
                StoreName: Joi.string().min(3).max(50).required(),
                Date: Joi.string().min(3).max(50).required(),
                   
            }
       }
}

	});
};


exports.display =function(server){

	server.route({
		method: 'GET',
		path: '/Items/{id}',

		config:{
			validate:{

				path:{
					id:Joi.string().alphanum().min(3).required()
				}
			}

		},

    	handler: function (request, reply) {
		GrocerymySchema.findById(request.params.id, function(err, item)
		{
			if(!err&&item){

				reply(item);
			}
			else if(err){

				console.log(err);
				reply(Boom.notFound());
			}
			else{
				reply(Boom.notFound());

			}
		});
		}

	});
};


exports.remove =function(server){

	server.route({
		method: 'GET',
		path: '/Items/{id}',

		config:{
			validate:{

				path:{
					id:Joi.string().alphanum().min(3).required()
				}
			}

		},

    	handler: function (request, reply) {
		GrocerymySchema.findById(request.params.id, function(err, item)
		{
			if(!err&&item){
				item.remove();
				reply({message:"Grocery item deleted successfully"});
			}
			else if(err){

				
				reply(Boom.notFound());
			}
			else{
				console.log(err);
				reply(Boom.notFound());

			}
		});
		}

	});
};


function getErrorMessageFrom(err){
	 var errorMessage= '';

	 if (err.errors){
	 	for(var prop in err.errors){
	 		if(err.errors.hasOwnPoperty(prop)){

	 			errorMessage+= err.errors[prop].message + ' '
	 		}
	 	}


	 }

	 else{
	 	errorMessage=err.message;
	 		 }

	 		 return errorMessage;
}




