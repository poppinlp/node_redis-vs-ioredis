module.exports = ({ TEST_LEN, TEST_DATA, nodeRedis, ioredis, type, console }) => {
    const redisKeys = k => new Promise((resolve, reject) => nodeRedis.keys(k, (err, data) => err ? reject(err) : resolve(data)));

    return [
        // node_redis keys
        async () => {
            console.time('node_redis keys');

            let len = TEST_LEN;
            while (len--) {
                await redisKeys(type);
            }

            console.timeEnd('node_redis keys');
        },

        // node_redis get with multi
        async () => {
            console.time('node_redis keys with multi');

            let len = TEST_LEN;
            let multi = nodeRedis.multi();
            while (len--) {
                multi.keys(type);
            }
            await (new Promise(resolve => {
                multi.exec(resolve);
            }));

            console.timeEnd('node_redis keys with multi');
        },

        // ioredis get
        async () => {
            console.time('ioredis keys');

            let len = TEST_LEN;
            while (len--) {
                await (ioredis.keys(type));
            }

            console.timeEnd('ioredis keys');
        },

        // ioredis get with pipeline
        async () => {
            console.time('ioredis keys with pipeline');

            let len = TEST_LEN;
            let pipeline = ioredis.pipeline();
            while (len--) {
                pipeline.keys(type);
            }
            await (pipeline.exec());

            console.timeEnd('ioredis keys with pipeline');
        },

        // ioredis get with multi
        async () => {
            console.time('ioredis keys with multi');

            let len = TEST_LEN;
            let multi = ioredis.multi();
            while (len--) {
                multi.keys(type);
            }
            await (multi.exec());

            console.timeEnd('ioredis keys with multi');
        }
    ];
};
