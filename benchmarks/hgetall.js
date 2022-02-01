module.exports = ({ nodeRedis, ioredis, type }) => {
	const NODE_REDIS_KEY = `node_redis:${type}`;
	const IOREDIS_KEY = `ioredis:${type}`;

	return [
		{
			name: "node_redis hgetall",
			obj: "node_redis",
			loop: () => nodeRedis.hGetAll(NODE_REDIS_KEY),
		},
		{
			name: "node_redis hgetall with multi",
			obj: "node_redis",
			beforeLoop: (ctx) => (ctx.multi = nodeRedis.multi()),
			loop: (ctx) => ctx.multi.hGetAll(NODE_REDIS_KEY),
			afterLoop: (ctx) => ctx.multi.exec(),
		},
		{
			name: "node_redis hgetall with batch",
			obj: "node_redis",
			beforeLoop: (ctx) => (ctx.batch = nodeRedis.multi()),
			loop: (ctx) => ctx.batch.hGetAll(NODE_REDIS_KEY),
			afterLoop: (ctx) => ctx.batch.execAsPipeline(),
		},
		{
			name: "ioredis hgetall",
			obj: "ioredis",
			loop: () => ioredis.hgetall(IOREDIS_KEY),
		},
		{
			name: "ioredis hgetall with multi",
			obj: "ioredis",
			beforeLoop: (ctx) => (ctx.multi = ioredis.multi()),
			loop: (ctx) => ctx.multi.hgetall(IOREDIS_KEY),
			afterLoop: (ctx) => ctx.multi.exec(),
		},
		{
			name: "ioredis hgetall with pipeline",
			obj: "ioredis",
			beforeLoop: (ctx) => (ctx.pipeline = ioredis.pipeline()),
			loop: (ctx) => ctx.pipeline.hgetall(IOREDIS_KEY),
			afterLoop: (ctx) => ctx.pipeline.exec(),
		},
	];
};
