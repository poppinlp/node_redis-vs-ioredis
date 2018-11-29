module.exports = ({ TEST_LEN, TEST_DATA, nodeRedis, ioredis, type, console }) => {
    const redisIncr = k => new Promise((resolve, reject) => nodeRedis.incr(k, (err, data) => err ? reject(err) : resolve(data)));

    return [
        // node_redis incr
        async () => {
            console.time('node_redis incr');

            let len = TEST_LEN;
            while (len--) {
                await redisIncr(`node_redis:${type}`);
            }

            console.timeEnd('node_redis incr');
        },

        // node_redis incr with multi
        async () => {
            console.time('node_redis incr with multi');

            let len = TEST_LEN;
            let multi = nodeRedis.multi();
            while (len--) {
                multi.incr(`node_redis:${type}`);
            }
            await (new Promise(resolve => {
                multi.exec(resolve);
            }));

            console.timeEnd('node_redis incr with multi');
        },

        // ioredis incr
        async () => {
            console.time('ioredis incr');

            let len = TEST_LEN;
            while (len--) {
                await (ioredis.incr(`ioredis:${type}`));
            }

            console.timeEnd('ioredis incr');
        },

        // ioredis incr with pipeline
        async () => {
            console.time('ioredis incr with pipeline');

            let len = TEST_LEN;
            let pipeline = ioredis.pipeline();
            while (len--) {
                pipeline.incr(`ioredis:${type}`);
            }
            await (pipeline.exec());

            console.timeEnd('ioredis incr with pipeline');
        },

        // ioredis incr with multi
        async () => {
            console.time('ioredis incr with multi');

            let len = TEST_LEN;
            let multi = ioredis.multi();
            while (len--) {
                multi.incr(`ioredis:${type}`);
            }
            await (multi.exec());

            console.timeEnd('ioredis incr with multi');
        }
    ];
};
