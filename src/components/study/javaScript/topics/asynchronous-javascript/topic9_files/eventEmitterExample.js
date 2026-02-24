// eventEmitterExample.js
const EventEmitter = require('events');

// Create an emitter instance
const chatEmitter = new EventEmitter();

// Subscribe to 'message' event
chatEmitter.on('message', (user, text) => {
  console.log(`${user}: ${text}`);
});

// Emit events (simulate incoming messages)
chatEmitter.emit('message', 'Tuhina', 'Hello from Barrackpore!');
chatEmitter.emit('message', 'Abhronila', 'Hi, anyone in Shyamnagar?');

// Unsubscribe (remove listener)
const listener = (user) => console.log(`${user} joined`);
chatEmitter.on('join', listener);
chatEmitter.emit('join', 'Debangshu');
chatEmitter.off('join', listener); // no more notifications