module.exports = ({TEST_LEN, TEST_DATA, nodeRedis, ioredis, type}) => ([
	// node_redis hgetall
    async () => {
        console.time('node_redis hgetall');

        let len = TEST_LEN;
        while (len--) {
            await (new Promise(resolve => {
                nodeRedis.hgetall(`node_redis:${type}`, resolve);
            }));
        }

        console.timeEnd('node_redis hgetall');
    },

	// ioredis hgetall
    async () => {
        console.time('ioredis hgetall');

        let len = TEST_LEN;
        while (len--) {
            await (ioredis.hgetall(`ioredis:${type}`));
        }

        console.timeEnd('ioredis hgetall');
    },

	// ioredis hgetall with pipeline
    async () => {
        console.time('ioredis hgetall with pipeline');

        let len = TEST_LEN;
        let pipeline = ioredis.pipeline();
        while (len--) {
            pipeline.hgetall(`ioredis:${type}`);
        }
        await (pipeline.exec());

        console.timeEnd('ioredis hgetall with pipeline');
    }
]);