exports.init =function(server){

	console.log('Routes');
	require('./grocery')(server);
}