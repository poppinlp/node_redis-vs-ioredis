module.exports = ({TEST_LEN, TEST_DATA, nodeRedis, ioredis, type}) => ([
	// node_redis hmset
    async () => {
        console.time('node_redis hmset');

        let len = TEST_LEN;
        while (len--) {
            await (new Promise(resolve => {
                nodeRedis.hmset(`node_redis:${type}`, TEST_DATA.hash, resolve);
            }));
        }

        console.timeEnd('node_redis hmset');
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
    }
]);