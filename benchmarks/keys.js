module.exports = ({ nodeRedis, ioredis, type }) => {
	const NODE_REDIS_KEY = type;
	const IOREDIS_KEY = type;

	return [
		{
			name: "node_redis keys",
			obj: "node_redis",
			loop: () =>
				new Promise(resolve => nodeRedis.keys(NODE_REDIS_KEY, resolve))
		},
		{
			name: "node_redis keys with multi",
			obj: "node_redis",
			beforeLoop: ctx => (ctx.multi = nodeRedis.multi()),
			loop: ctx => ctx.multi.keys(NODE_REDIS_KEY),
			afterLoop: ctx => new Promise(resolve => ctx.multi.exec(resolve))
		},
		{
			name: "node_redis keys with batch",
			obj: "node_redis",
			beforeLoop: ctx => (ctx.batch = nodeRedis.batch()),
			loop: ctx => ctx.batch.keys(NODE_REDIS_KEY),
			afterLoop: ctx => new Promise(resolve => ctx.batch.exec(resolve))
		},
		{
			name: "ioredis keys",
			obj: "ioredis",
			loop: () => ioredis.keys(IOREDIS_KEY)
		},
		{
			name: "ioredis keys with multi",
			obj: "ioredis",
			beforeLoop: ctx => (ctx.multi = ioredis.multi()),
			loop: ctx => ctx.multi.keys(IOREDIS_KEY),
			afterLoop: ctx => ctx.multi.exec()
		},
		{
			name: "ioredis keys with pipeline",
			obj: "ioredis",
			beforeLoop: ctx => (ctx.pipeline = ioredis.pipeline()),
			loop: ctx => ctx.pipeline.keys(IOREDIS_KEY),
			afterLoop: ctx => ctx.pipeline.exec()
		}
	];
};
