const events = require('events');

const emitter = new events.EventEmitter();

emitter.on('end', console.log);

setTimeout(() => {
    emitter.emit('end', 'Hello!');
}, 5000);