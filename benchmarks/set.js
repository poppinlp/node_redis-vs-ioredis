module.exports = ({ TEST_DATA, nodeRedis, ioredis, type }) => {
	const NODE_REDIS_KEY = `node_redis:${type}`;
	const IOREDIS_KEY = `ioredis:${type}`;

	return [
		{
			name: "node_redis set",
			obj: "node_redis",
			loop: () => nodeRedis.set(NODE_REDIS_KEY, TEST_DATA.string),
		},
		{
			name: "node_redis set with multi",
			obj: "node_redis",
			beforeLoop: (ctx) => (ctx.multi = nodeRedis.multi()),
			loop: (ctx) => ctx.multi.set(NODE_REDIS_KEY, TEST_DATA.string),
			afterLoop: (ctx) => ctx.multi.exec(),
		},
		// https://github.com/redis/node-redis/issues/1796
		{
			name: "node_redis set with batch",
			obj: "node_redis",
			beforeLoop: (ctx) => (ctx.batch = nodeRedis.multi()),
			loop: (ctx) => ctx.batch.set(NODE_REDIS_KEY, TEST_DATA.string),
			afterLoop: (ctx) => ctx.batch.execAsPipeline(),
		},
		{
			name: "ioredis set",
			obj: "ioredis",
			loop: () => ioredis.set(IOREDIS_KEY, TEST_DATA.string),
		},
		{
			name: "ioredis set with multi",
			obj: "ioredis",
			beforeLoop: (ctx) => (ctx.multi = ioredis.multi()),
			loop: (ctx) => ctx.multi.set(IOREDIS_KEY, TEST_DATA.string),
			afterLoop: (ctx) => ctx.multi.exec(),
		},
		{
			name: "ioredis set with pipeline",
			obj: "ioredis",
			beforeLoop: (ctx) => (ctx.pipeline = ioredis.pipeline()),
			loop: (ctx) => ctx.pipeline.set(IOREDIS_KEY, TEST_DATA.string),
			afterLoop: (ctx) => ctx.pipeline.exec(),
		},
	];
};
