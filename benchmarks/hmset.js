module.exports = ({ TEST_LEN, TEST_DATA, nodeRedis, ioredis, type, console }) => {
    const redisHMSet = (k, o) => new Promise((resolve, reject) => nodeRedis.hmset(k, o, (err, data) => err ? reject(err) : resolve(data)));

    return [
        // node_redis hmset
        async () => {
            console.time('node_redis hmset');

            let len = TEST_LEN;
            while (len--) {
                await redisHMSet(`node_redis:${type}`, TEST_DATA.hash);
            }

            console.timeEnd('node_redis hmset');
        },

        // node_redis hmset with multi
        async () => {
            console.time('node_redis hmset with multi');

            let len = TEST_LEN;
            let multi = nodeRedis.multi();
            while (len--) {
                multi.hmset(`node_redis:${type}`, TEST_DATA.hash);
            }
            await (new Promise(resolve => {
                multi.exec(resolve);
            }));

            console.timeEnd('node_redis hmset with multi');
        },

        // ioredis hmset
        async () => {
            console.time('ioredis hmset');

            let len = TEST_LEN;
            while (len--) {
                await (ioredis.hmset(`ioredis:${type}`, TEST_DATA.hash));
            }

            console.timeEnd('ioredis hmset');
        },

        // ioredis hmset with pipeline
        async () => {
            console.time('ioredis hmset with pipeline');

            let len = TEST_LEN;
            let pipeline = ioredis.pipeline();
            while (len--) {
                pipeline.hmset(`ioredis:${type}`, TEST_DATA.hash);
            }
            await (pipeline.exec());

            console.timeEnd('ioredis hmset with pipeline');
        },

        // ioredis hmset with multi
        async () => {
            console.time('ioredis hmset with multi');

            let len = TEST_LEN;
            let multi = ioredis.multi();
            while (len--) {
                multi.hmset(`ioredis:${type}`, TEST_DATA.hash);
            }
            await (multi.exec());

            console.timeEnd('ioredis hmset with multi');
        }
    ];
};
