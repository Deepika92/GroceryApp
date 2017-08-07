var Mongoose = require('mongoose');
var Schema= Mongoose.Schema;

var GrocerySchema= new Schema({

_id :{ type: Number, required: true, trim:true},
Name:{ type: String, required: true, trim:true},
Price:{ type: String, required: true, trim:true},
StoreName:{ type: String, required: true, trim:true},
Date:{ type: Date, required: true, default:Date.now}

});

var grocerymySChema= Mongoose.model('Grocery',GrocerySchema );

module.exports= {
	GrocerymySchema:Grocery\
};
