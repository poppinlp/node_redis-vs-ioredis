module.exports = ({ TEST_DATA, nodeRedis, ioredis, type }) => {
	const NODE_REDIS_KEY = `node_redis:${type}`;
	const IOREDIS_KEY = `ioredis:${type}`;

	return [
		{
			name: "node_redis hmset",
			obj: "node_redis",
			loop: () => nodeRedis.hSet(NODE_REDIS_KEY, TEST_DATA.hash),
		},
		{
			name: "node_redis hmset with multi",
			obj: "node_redis",
			beforeLoop: (ctx) => (ctx.multi = nodeRedis.multi()),
			loop: (ctx) => ctx.multi.hSet(NODE_REDIS_KEY, TEST_DATA.hash),
			afterLoop: (ctx) => ctx.multi.exec(),
		},
		{
			name: "node_redis hmset with batch",
			obj: "node_redis",
			beforeLoop: (ctx) => (ctx.batch = nodeRedis.multi()),
			loop: (ctx) => ctx.batch.hSet(NODE_REDIS_KEY, TEST_DATA.hash),
			afterLoop: (ctx) => ctx.batch.execAsPipeline(),
		},
		{
			name: "ioredis hmset",
			obj: "ioredis",
			loop: () => ioredis.hmset(IOREDIS_KEY, TEST_DATA.hash),
		},
		{
			name: "ioredis hmset with multi",
			obj: "ioredis",
			beforeLoop: (ctx) => (ctx.multi = ioredis.multi()),
			loop: (ctx) => ctx.multi.hmset(IOREDIS_KEY, TEST_DATA.hash),
			afterLoop: (ctx) => ctx.multi.exec(),
		},
		{
			name: "ioredis hmset with pipeline",
			obj: "ioredis",
			beforeLoop: (ctx) => (ctx.pipeline = ioredis.pipeline()),
			loop: (ctx) => ctx.pipeline.hmset(IOREDIS_KEY, TEST_DATA.hash),
			afterLoop: (ctx) => ctx.pipeline.exec(),
		},
	];
};
