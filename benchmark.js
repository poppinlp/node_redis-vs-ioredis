const NodeRedis = require('redis');
const IORedis = require('ioredis');

const REDIS_CONFIG = {
	host: '127.0.0.1',
	port: 6379,
	dropBufferSupport: true
};
const TEST_LEN = 20000;
const TEST_DATA = {
	string: 'hello world',
	number: 0,
	hash: {
		foo: 'bar',
		hello: 'world'
	}
};

const nodeRedis = NodeRedis.createClient(REDIS_CONFIG);
const ioredis = new IORedis(REDIS_CONFIG);

const units = [{
	name: 'set',
	type: 'string'
}, {
	name: 'get',
	type: 'string'
}, {
	name: 'hmset',
	type: 'hash'
}, {
	name: 'hgetall',
	type: 'hash'
}, {
	name: 'incr',
	type: 'number'
}, {
	name: 'keys',
	type: '*'
}];

(async () => {
	const unitsLen = units.length;

	for (let i = 0; i < unitsLen; i++) {
		const { name, type } = units[i];
		const tasks = require(`./benchmarks/${name}.js`)({ TEST_LEN, TEST_DATA, nodeRedis, ioredis, type });
		while (tasks.length) await tasks.shift()();
	}
})().then(() => {
	nodeRedis.quit();
	ioredis.quit();
});
