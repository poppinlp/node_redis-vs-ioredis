module.exports = ({ nodeRedis, ioredis, type }) => {
	const NODE_REDIS_KEY = `node_redis:${type}`;
	const IOREDIS_KEY = `ioredis:${type}`;

	return [
		{
			name: "node_redis incr",
			obj: "node_redis",
			loop: () => nodeRedis.incr(NODE_REDIS_KEY),
		},
		{
			name: "node_redis incr with multi",
			obj: "node_redis",
			beforeLoop: (ctx) => (ctx.multi = nodeRedis.multi()),
			loop: (ctx) => ctx.multi.incr(NODE_REDIS_KEY),
			afterLoop: (ctx) => ctx.multi.exec(),
		},
		{
			name: "node_redis incr with batch",
			obj: "node_redis",
			beforeLoop: (ctx) => (ctx.batch = nodeRedis.multi()),
			loop: (ctx) => ctx.batch.incr(NODE_REDIS_KEY),
			afterLoop: (ctx) => ctx.batch.execAsPipeline(),
		},
		{
			name: "ioredis incr",
			obj: "ioredis",
			loop: () => ioredis.incr(IOREDIS_KEY),
		},
		{
			name: "ioredis incr with multi",
			obj: "ioredis",
			beforeLoop: (ctx) => (ctx.multi = ioredis.multi()),
			loop: (ctx) => ctx.multi.incr(IOREDIS_KEY),
			afterLoop: (ctx) => ctx.multi.exec(),
		},
		{
			name: "ioredis incr with pipeline",
			obj: "ioredis",
			beforeLoop: (ctx) => (ctx.pipeline = ioredis.pipeline()),
			loop: (ctx) => ctx.pipeline.incr(IOREDIS_KEY),
			afterLoop: (ctx) => ctx.pipeline.exec(),
		},
	];
};
