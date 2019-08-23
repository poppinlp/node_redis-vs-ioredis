module.exports = ({ nodeRedis, ioredis, type }) => {
  const NODE_REDIS_KEY = `node_redis:${type}`;
  const IOREDIS_KEY = `ioredis:${type}`;

  return [
    {
      name: "node_redis get",
      loop: () => new Promise(resolve => nodeRedis.get(NODE_REDIS_KEY, resolve))
    },
    {
      name: "node_redis get with multi",
      beforeLoop: ctx => (ctx.multi = nodeRedis.multi()),
      loop: ctx => ctx.multi.get(NODE_REDIS_KEY),
      afterLoop: ctx => new Promise(resolve => ctx.multi.exec(resolve))
    },
    {
      name: "node_redis get with batch",
      beforeLoop: ctx => (ctx.batch = nodeRedis.batch()),
      loop: ctx => ctx.batch.get(NODE_REDIS_KEY),
      afterLoop: ctx => new Promise(resolve => ctx.batch.exec(resolve))
    },
    {
      name: "ioredis get",
      loop: () => ioredis.get(IOREDIS_KEY)
    },
    {
      name: "ioredis get with multi",
      beforeLoop: ctx => (ctx.multi = ioredis.multi()),
      loop: ctx => ctx.multi.get(IOREDIS_KEY),
      afterLoop: ctx => ctx.multi.exec()
    },
    {
      name: "ioredis get with pipeline",
      beforeLoop: ctx => (ctx.pipeline = ioredis.pipeline()),
      loop: ctx => ctx.pipeline.get(IOREDIS_KEY),
      afterLoop: ctx => ctx.pipeline.exec()
    }
  ];
};
