module.exports = ({ nodeRedis, ioredis, type }) => {
  const NODE_REDIS_KEY = `node_redis:${type}`;
  const IOREDIS_KEY = `ioredis:${type}`;

  return [
    {
      name: "node_redis hgetall",
      loop: () => new Promise(resolve => nodeRedis.hgetall(NODE_REDIS_KEY, resolve))
    },
    {
      name: "node_redis hgetall with multi",
      beforeLoop: ctx => (ctx.multi = nodeRedis.multi()),
      loop: ctx => ctx.multi.hgetall(NODE_REDIS_KEY),
      afterLoop: ctx => new Promise(resolve => ctx.multi.exec(resolve))
    },
    {
      name: "node_redis hgetall with batch",
      beforeLoop: ctx => (ctx.batch = nodeRedis.batch()),
      loop: ctx => ctx.batch.hgetall(NODE_REDIS_KEY),
      afterLoop: ctx => new Promise(resolve => ctx.batch.exec(resolve))
    },
    {
      name: "ioredis hgetall",
      loop: () => ioredis.hgetall(IOREDIS_KEY)
    },
    {
      name: "ioredis hgetall with multi",
      beforeLoop: ctx => (ctx.multi = ioredis.multi()),
      loop: ctx => ctx.multi.hgetall(IOREDIS_KEY),
      afterLoop: ctx => ctx.multi.exec()
    },
    {
      name: "ioredis hgetall with pipeline",
      beforeLoop: ctx => (ctx.pipeline = ioredis.pipeline()),
      loop: ctx => ctx.pipeline.hgetall(IOREDIS_KEY),
      afterLoop: ctx => ctx.pipeline.exec()
    }
  ];
};
