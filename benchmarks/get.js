module.exports = ({ nodeRedis, ioredis, type }) => {
	const NODE_REDIS_KEY = `node_redis:${type}`;
	const IOREDIS_KEY = `ioredis:${type}`;

	return [
		{
			name: "node_redis get",
			obj: "node_redis",
			loop: () =>
				new Promise(resolve => nodeRedis.get(NODE_REDIS_KEY, resolve))
		},
		{
			name: "node_redis get with multi",
			obj: "node_redis",
			beforeLoop: ctx => (ctx.multi = nodeRedis.multi()),
			loop: ctx => ctx.multi.get(NODE_REDIS_KEY),
			afterLoop: ctx => new Promise(resolve => ctx.multi.exec(resolve))
		},
		{
			name: "node_redis get with batch",
			obj: "node_redis",
			beforeLoop: ctx => (ctx.batch = nodeRedis.batch()),
			loop: ctx => ctx.batch.get(NODE_REDIS_KEY),
			afterLoop: ctx => new Promise(resolve => ctx.batch.exec(resolve))
		},
		{
			name: "ioredis get",
			obj: "ioredis",
			loop: () => ioredis.get(IOREDIS_KEY)
		},
		{
			name: "ioredis get with multi",
			obj: "ioredis",
			beforeLoop: ctx => (ctx.multi = ioredis.multi()),
			loop: ctx => ctx.multi.get(IOREDIS_KEY),
			afterLoop: ctx => ctx.multi.exec()
		},
		{
			name: "ioredis get with pipeline",
			obj: "ioredis",
			beforeLoop: ctx => (ctx.pipeline = ioredis.pipeline()),
			loop: ctx => ctx.pipeline.get(IOREDIS_KEY),
			afterLoop: ctx => ctx.pipeline.exec()
		}
	];
};
