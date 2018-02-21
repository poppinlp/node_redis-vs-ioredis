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

    // node_redis get with multi
    async () => {
        console.time('node_redis get with multi');

        let len = TEST_LEN;
        let multi = nodeRedis.multi();
        while (len--) {
            multi.get(`node_redis:${type}`);
        }
        await (new Promise(resolve => {
            multi.exec(resolve);
        }));

        console.timeEnd('node_redis get with multi');
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
    },

    // ioredis get with multi
    async () => {
        console.time('ioredis get with multi');

        let len = TEST_LEN;
        let multi = ioredis.multi();
        while (len--) {
            multi.get(`ioredis:${type}`);
        }
        await (multi.exec());

        console.timeEnd('ioredis get with multi');
    }
]);
