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

const runTests = async (TEST_LEN, TEST_DATA, console) => {
	for (let i = 0; i < units.length; i++) {
		const { name, type } = units[i];
		const tasks = require(`./benchmarks/${name}.js`)({ TEST_LEN, TEST_DATA, nodeRedis, ioredis, type, console });
		for (const task of tasks) {
			await task();
		}
	}
};

(async () => {
	try {
		// warm up a bit first
		await runTests(100, TEST_DATA, { time() { }, timeEnd() { } });
		// now go
		await runTests(TEST_LEN, TEST_DATA, console);
	} catch (e) {
		console.error('ERR', e);
	}
	nodeRedis.quit();
	ioredis.quit();
})();
