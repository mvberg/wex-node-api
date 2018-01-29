'use strict';

const EventEmitter = require('events');
const Pusher = require('pusher-js/node');

class Depth extends EventEmitter {
	constructor(key='ee987526a24ba107824c', cluster='eu', encrypted=true) {
		super();

		this.key = key;
		this.socket = new Pusher(this.key, {
			cluster:cluster
		});

		this.socket.connection.bind('connected', ()=>{
			super.emit('connected');
			console.log('connected');
		});

		this.socket.connection.bind('disconnected', ()=>{
			super.emit('disconnected');
			console.log('disconnected');	
		});
	}

	subscribe(symbol, topic='depth') {
		const key = symbol + '.' + topic;
		const sub = this.socket.subscribe(key);
		sub.bind(topic, data=>{
			console.log(key, data);	
		});
	}
}

module.exports = Depth;

let d = new Depth();

d.subscribe('btc_usd');