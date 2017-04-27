const config = {
    host: '127.0.0.1',
    port: 6379,
    dropBufferSupport: true
};

const nodeRedis = require('redis').createClient(config);
const ioredis = new require('ioredis')(config);
const TEST_LEN = 20000;

(async () => {

    await (async () => {
        console.time('node_redis set');

        let len = TEST_LEN;
        while (len--) {
            await (new Promise(resolve => {
                nodeRedis.set('node_redis', 1, resolve);
            }));
        }

        console.timeEnd('node_redis set');
    })();

    await (async () => {
        console.time('ioredis set');

        let len = TEST_LEN;
        while (len--) {
            await (ioredis.set('ioredis', 1));
        }

        console.timeEnd('ioredis set');
    })();

    await (async () => {
        console.time('ioredis set pipeline');

        let len = TEST_LEN;
        let pipeline = ioredis.pipeline();
        while (len--) {
            pipeline.set('ioredis', 1);
        }
        await (pipeline.exec());

        console.timeEnd('ioredis set pipeline');
    })();

    await (async () => {
        console.time('node_redis get');

        let len = TEST_LEN;
        while (len--) {
            await (new Promise(resolve => {
                nodeRedis.get('node_redis:1', resolve);
            }));
        }

        console.timeEnd('node_redis get');
    })();

    await (async () => {
        console.time('ioredis get');

        let len = TEST_LEN;
        while (len--) {
            await (ioredis.get('ioredis'));
        }

        console.timeEnd('ioredis get');
    })();

    await (async () => {
        console.time('ioredis get pipeline');

        let len = TEST_LEN;
        let pipeline = ioredis.pipeline();
        while (len--) {
            pipeline.get('ioredis');
        }
        await (pipeline.exec());

        console.timeEnd('ioredis get pipeline');
    })();

})().then(() => {
    nodeRedis.quit();
    ioredis.quit();
});
