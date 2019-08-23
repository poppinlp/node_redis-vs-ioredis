module.exports = ({ nodeRedis, ioredis, type }) => {
  const NODE_REDIS_KEY = `node_redis:${type}`;
  const IOREDIS_KEY = `ioredis:${type}`;

  return [
    {
      name: "node_redis incr",
      loop: () => new Promise(resolve => nodeRedis.incr(NODE_REDIS_KEY, resolve))
    },
    {
      name: "node_redis incr with multi",
      beforeLoop: ctx => (ctx.multi = nodeRedis.multi()),
      loop: ctx => ctx.multi.incr(NODE_REDIS_KEY),
      afterLoop: ctx => new Promise(resolve => ctx.multi.exec(resolve))
    },
    {
      name: "node_redis incr with batch",
      beforeLoop: ctx => (ctx.batch = nodeRedis.batch()),
      loop: ctx => ctx.batch.incr(NODE_REDIS_KEY),
      afterLoop: ctx => new Promise(resolve => ctx.batch.exec(resolve))
    },
    {
      name: "ioredis incr",
      loop: () => ioredis.incr(IOREDIS_KEY)
    },
    {
      name: "ioredis incr with multi",
      beforeLoop: ctx => (ctx.multi = ioredis.multi()),
      loop: ctx => ctx.multi.incr(IOREDIS_KEY),
      afterLoop: ctx => ctx.multi.exec()
    },
    {
      name: "ioredis incr with pipeline",
      beforeLoop: ctx => (ctx.pipeline = ioredis.pipeline()),
      loop: ctx => ctx.pipeline.incr(IOREDIS_KEY),
      afterLoop: ctx => ctx.pipeline.exec()
    }
  ];
};
