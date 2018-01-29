'use strict';

const EventEmitter = require('events');
const Pusher = require('pusher-js/node');

// https://wex.nz/pushAPI/docs#trades

class Trades extends EventEmitter {
	constructor(key = 'ee987526a24ba107824c', cluster = 'eu', encrypted = true) {
		super();

		this.key = key;
		this.socket = new Pusher(this.key, {
			cluster: cluster
		});

		this.socket.connection.bind('connected', () => {
			super.emit('connected');
		});

		this.socket.connection.bind('disconnected', () => {
			super.emit('disconnected');
		});
	}

	subscribe(symbol, topic = 'trades') {
		const key = symbol + '.' + topic;
		const sub = this.socket.subscribe(key);
		sub.bind(topic, data => {
			super.emit(symbol, data);
		});
		return this;
	}
}

module.exports = Trades;
