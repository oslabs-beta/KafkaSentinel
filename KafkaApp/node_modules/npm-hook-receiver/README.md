# npm-hook-receiver

Sample code showing you how to receive a package hook from the npm registry, verify its signature, and handle its payload. This module makes a restify server that you configure to receive hook payloads at whatever path you like. The server emits events when notifications arrive. Listen for the events to do something interesting! For example, it's easy to write a [Slack bot](https://github.com/npm/npm-hook-slack) that echoes events to a Slack channel.

## Usage

```js
var makeReceiver = require('npm-hook-receiver');
var server = makeReceiver({
	secret: 'this-is-a-shared-secret',
	mount: '/hook'
});

server.on('hook', function(message)
{
	console.log(`got ${message.event} type ${message.type} on ${message.name}`);
	console.log(`object is in ${message.payload}`);
});

server.on('package:star', function(message)
{
	console.log(`package ${message.name} was starred by ${message.sender}!`);
});

server.listen(8080, function()
{
	console.log('Ready to receive hooks!');
});
```

## Configuration

This example hook receiver exports a single function that takes a config object and returns a restify server. The config object must have two required fields plus any configuration you'd like to pass along to restify's `createServer()` function. The two required fields are:

* `secret`: the secret you've shared with the registry for the hook
* `mount`: the url path you expect the hooks to be posted to

You must call `listen()` on the restify server yourself. The server object is an event emitter. Attach event listeners to it to act when hooks are fired.

## Events

* `hook`: emitted for all successfully-received notifications. Listen for this event to handle all hooks.
* `hook:error`: emitted on payload errors like missing or invalid signatures.
* An event is also emitted for each hook event string. E.g, listen for `package:star` to handle only starring notifications.

See the npm hooks API documentation for the full list of events.

## License

ISC
