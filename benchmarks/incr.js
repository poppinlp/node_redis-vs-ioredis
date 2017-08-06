module.exports = ({TEST_LEN, TEST_DATA, nodeRedis, ioredis, type}) => ([
	// node_redis incr
    async () => {
        console.time('node_redis incr');

        let len = TEST_LEN;
        while (len--) {
            await (new Promise(resolve => {
                nodeRedis.incr(`node_redis:${type}`, resolve);
            }));
        }

        console.timeEnd('node_redis incr');
    },

	// ioredis incr
    async () => {
        console.time('ioredis incr');

        let len = TEST_LEN;
        while (len--) {
            await (ioredis.get(`ioredis:${type}`));
        }

        console.timeEnd('ioredis incr');
    },

	// ioredis get with pipeline
    async () => {
        console.time('ioredis incr with pipeline');

        let len = TEST_LEN;
        let pipeline = ioredis.pipeline();
        while (len--) {
            pipeline.get(`ioredis:${type}`);
        }
        await (pipeline.exec());

        console.timeEnd('ioredis incr with pipeline');
    }
]);