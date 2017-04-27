module.exports = ({TEST_LEN, TEST_DATA, nodeRedis, ioredis, type}) => ([
	// node_redis get
    async () => {
        console.time('node_redis get');

        let len = TEST_LEN;
        while (len--) {
            await (new Promise(resolve => {
                nodeRedis.get(`node_redis:${type}`, resolve);
            }));
        }

        console.timeEnd('node_redis get');
    },

	// ioredis get
    async () => {
        console.time('ioredis get');

        let len = TEST_LEN;
        while (len--) {
            await (ioredis.get(`ioredis:${type}`));
        }

        console.timeEnd('ioredis get');
    },

	// ioredis get with pipeline
    async () => {
        console.time('ioredis get with pipeline');

        let len = TEST_LEN;
        let pipeline = ioredis.pipeline();
        while (len--) {
            pipeline.get(`ioredis:${type}`);
        }
        await (pipeline.exec());

        console.timeEnd('ioredis get with pipeline');
    }
]);