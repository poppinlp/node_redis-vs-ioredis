module.exports = ({ TEST_DATA, nodeRedis, ioredis, type }) => {
  const NODE_REDIS_KEY = `node_redis:${type}`;
  const IOREDIS_KEY = `ioredis:${type}`;

  return [
    {
      name: "node_redis set",
      loop: () => new Promise(resolve => nodeRedis.set(NODE_REDIS_KEY, TEST_DATA.string, resolve))
    },
    {
      name: "node_redis set with multi",
      beforeLoop: ctx => (ctx.multi = nodeRedis.multi()),
      loop: ctx => ctx.multi.set(NODE_REDIS_KEY, TEST_DATA.string),
      afterLoop: ctx => new Promise(resolve => ctx.multi.exec(resolve))
    },
    {
      name: "node_redis set with batch",
      beforeLoop: ctx => (ctx.batch = nodeRedis.batch()),
      loop: ctx => ctx.batch.set(NODE_REDIS_KEY, TEST_DATA.string),
      afterLoop: ctx => new Promise(resolve => ctx.batch.exec(resolve))
    },
    {
      name: "ioredis set",
      loop: () => ioredis.set(IOREDIS_KEY, TEST_DATA.string)
    },
    {
      name: "ioredis set with multi",
      beforeLoop: ctx => (ctx.multi = ioredis.multi()),
      loop: ctx => ctx.multi.set(IOREDIS_KEY, TEST_DATA.string),
      afterLoop: ctx => ctx.multi.exec()
    },
    {
      name: "ioredis set with pipeline",
      beforeLoop: ctx => (ctx.pipeline = ioredis.pipeline()),
      loop: ctx => ctx.pipeline.set(IOREDIS_KEY, TEST_DATA.string),
      afterLoop: ctx => ctx.pipeline.exec()
    }
  ];
};
