module.exports = ({TEST_LEN, TEST_DATA, nodeRedis, ioredis, type}) => ([
	// node_redis keys
    async () => {
        console.time('node_redis keys');

        let len = TEST_LEN;
        while (len--) {
            await (new Promise(resolve => {
                nodeRedis.keys(type, resolve);
            }));
        }

        console.timeEnd('node_redis keys');
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
    }
]);
