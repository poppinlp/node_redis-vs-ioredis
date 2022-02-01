const NodeRedis = require("redis");
const IORedis = require("ioredis");
const fs = require("fs");

const REDIS_CONFIG = {
	host: "127.0.0.1",
	port: 6379,
	dropBufferSupport: true
};
const TEST_LEN = 20000;
const TEST_DATA = {
	string: "hello world",
	number: 0,
	hash: {
		foo: "bar",
		hello: "world"
	}
};

// Read args
var args = process.argv.slice(2);
args.forEach((el, i, arr) => {
	if (el == "--length" && arr[i + 1] && (len = parseInt(arr[i + 1]))) {
		TEST_LEN = len;
		console.log("Using custom length");
	} else if (el == "--datafile" && (file = arr[i + 1])) {
		fs.readFile(file, "utf8", (err, data) => {
			if (err) throw err;
			let json = JSON.parse(data);
			if (json.string && json.number && json.hash) {
				TEST_DATA = json;
				console.log("Using datafile");
			}
		});
	}
});

const nodeRedis = NodeRedis.createClient(
	`redis://${REDIS_CONFIG.host}:${REDIS_CONFIG.port}`
);
const ioredis = new IORedis(REDIS_CONFIG);

const units = [
	{ name: "set", type: "string" },
	{ name: "get", type: "string" },
	{ name: "hmset", type: "hash" },
	{ name: "hgetall", type: "hash" },
	{ name: "incr", type: "number" },
	{ name: "keys", type: "*" }
];

let avg = [];

const runTests = async (TEST_LEN, TEST_DATA, output) => {
	for (let i = 0; i < units.length; ++i) {
		const { name, type } = units[i];
		const taskArgs = { TEST_DATA, nodeRedis, ioredis, type };
		const tasks = require(`./benchmarks/${name}.js`)(taskArgs);
		for (const { name, obj, beforeLoop, loop, afterLoop } of tasks) {
			let startTime = process.hrtime();
			const ctx = {};
			beforeLoop && beforeLoop(ctx);
			for (let i = 0; i < TEST_LEN; ++i) await loop(ctx);
			afterLoop && (await afterLoop(ctx));
			if (output) {
				let endTime = process.hrtime(startTime);
				let time = parseFloat(
					(endTime[1] / 1000000 + endTime[0] * 1000).toFixed(6)
				);
				console.log(`${name}: ${time}ms`);
				if (!avg.some(val => val.obj == obj))
					avg.push({ obj, time: 0, calls: 0 });
				let lavg = avg.find(val => val.obj == obj);
				lavg.calls++;
				lavg.time += time;
			}
		}
	}
};

(async () => {
	try {
		await nodeRedis.connect();
		// warm up a bit first
		await runTests(100, TEST_DATA, false);
		// now go
		console.log(".: Warmup complete :.");
		await runTests(TEST_LEN, TEST_DATA, true);
		console.log(".: Test Results :.");
		avg = avg.map(el => {
			el.average = parseFloat((el.time / el.calls).toFixed(3));
			console.log(`${el.obj} had an average time of ${el.average}ms`);
			return el;
		});
		console.log(".: WINNER :.");
		let winner = avg.reduce((obj1, obj2) => {
			return obj1.average > obj2.average ? obj2 : obj1;
		});
		console.log(
			`The winner is ${winner.obj} with an average of ${winner.average}ms`
		);
	} catch (e) {
		console.error("ERR", e);
	}

	nodeRedis.quit();
	ioredis.quit();
})();
