module.exports = ({ TEST_DATA, nodeRedis, ioredis, type }) => {
	const NODE_REDIS_KEY = `node_redis:${type}`;
	const IOREDIS_KEY = `ioredis:${type}`;

	return [
		{
			name: "node_redis hmset",
			obj: "node_redis",
			loop: () =>
				new Promise(resolve =>
					nodeRedis.hmset(NODE_REDIS_KEY, TEST_DATA.hash, resolve)
				)
		},
		{
			name: "node_redis hmset with multi",
			obj: "node_redis",
			beforeLoop: ctx => (ctx.multi = nodeRedis.multi()),
			loop: ctx => ctx.multi.hmset(NODE_REDIS_KEY, TEST_DATA.hash),
			afterLoop: ctx => new Promise(resolve => ctx.multi.exec(resolve))
		},
		{
			name: "node_redis hmset with batch",
			obj: "node_redis",
			beforeLoop: ctx => (ctx.batch = nodeRedis.batch()),
			loop: ctx => ctx.batch.hmset(NODE_REDIS_KEY, TEST_DATA.hash),
			afterLoop: ctx => new Promise(resolve => ctx.batch.exec(resolve))
		},
		{
			name: "ioredis hmset",
			obj: "ioredis",
			loop: () => ioredis.hmset(IOREDIS_KEY, TEST_DATA.hash)
		},
		{
			name: "ioredis hmset with multi",
			obj: "ioredis",
			beforeLoop: ctx => (ctx.multi = ioredis.multi()),
			loop: ctx => ctx.multi.hmset(IOREDIS_KEY, TEST_DATA.hash),
			afterLoop: ctx => ctx.multi.exec()
		},
		{
			name: "ioredis hmset with pipeline",
			obj: "ioredis",
			beforeLoop: ctx => (ctx.pipeline = ioredis.pipeline()),
			loop: ctx => ctx.pipeline.hmset(IOREDIS_KEY, TEST_DATA.hash),
			afterLoop: ctx => ctx.pipeline.exec()
		}
	];
};
