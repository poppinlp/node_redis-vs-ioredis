# node\_redis-vs-ioredis

There are two popular redis client for Node: [node\_redis](https://github.com/NodeRedis/node_redis) and [ioredis](https://github.com/luin/ioredis).

This repo is a simple benchmark for them. Welcome PR to makes this not tooooo simple >.<

## About this benchmark

First of all i must say ioredis is a real full-featured redis client right now. This is a really big PRO.

I use [hiredis](https://github.com/redis/hiredis) to improve parser performance.

Your node version should newer than `7.6.0` since banchmark script use `async` and `await`.

## Run

1. Use `git clone git@github.com:poppinlp/node_redis-vs-ioredis.git` to clone this repo to local.
1. Use `yarn` or `npm i` to install dependencies.
1. Use `redis-server` to start redis server local with no password.
1. Use `npm test` to start benchmark.

## Result

I do this benchmark test on my PC whose hardware are:

- System: OS X EI Capitan 10.11.6
- Processor: 4 GHz Intel Core i7
- Memory: 32 GB 1600 MHz DDR3
- Graphics: AMD Radeon R9 M290X 2048 MB

I got these output:

```
node_redis set: 823.151ms
ioredis set: 928.765ms
ioredis set with pipeline: 163.151ms
node_redis get: 791.336ms
ioredis get: 896.413ms
ioredis get with pipeline: 129.523ms
node_redis hmset: 833.925ms
ioredis hmset: 1074.491ms
ioredis hmset with pipeline: 165.686ms
node_redis hgetall: 856.102ms
ioredis hgetall: 1032.495ms
ioredis hgetall with pipeline: 159.328ms
```

Welcome PR to makes this not tooooo simple >.<