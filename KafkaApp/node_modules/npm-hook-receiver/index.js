var
	assert  = require('assert'),
	crypto  = require('crypto'),
	restify = require('restify')
	;

module.exports = function makeServer(opts)
{
	assert(opts && (typeof opts === 'object'), 'you must pass an options object');
	assert(opts.secret, 'you must pass a shared secret in opts.secret');
	assert(opts.mount, 'you must pass a path for the hook in opts.mount');
	var secret = opts.secret;

	function handleMessage(request, response, next)
	{
		var signature = request.headers['x-npm-signature'];
		if (!signature)
		{
			server.emit('hook:error', 'no x-npm-signature header found');
			response.send(400, 'no x-npm-signature header found');
			return next();
		}

		var expected = crypto.createHmac('sha256', secret).update(request._body).digest('hex');
		if (signature !== 'sha256=' + expected)
		{
			server.emit('hook:error', 'invalid payload signature found in x-npm-signature header');
			response.send(400, 'invalid payload signature found in x-npm-signature header');
			return next();
		}

		var message = Object.assign({}, request.body);
		message.sender = request.body.hookOwner.username;

		server.emit(request.body.event, message);
		server.emit('hook', message);

		response.send(200, 'OK');
		next();
	}

	var server = restify.createServer(opts);

	server.use(restify.plugins.acceptParser(server.acceptable));
	server.use(restify.plugins.queryParser());
	server.use(restify.plugins.gzipResponse());
	server.use(restify.plugins.bodyParser({ mapParams: false }));
	server.post(opts.mount, handleMessage);

	return server;
};
