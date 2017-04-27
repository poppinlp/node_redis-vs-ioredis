# node\_redis-vs-ioredis

There are two popular redis client for Node: [node\_redis](https://github.com/NodeRedis/node_redis) and [ioredis](https://github.com/luin/ioredis).

This repo is a simple benchmark for them. Welcome PR to makes this not tooooo simple >.<

## About this benchmark

First of all i must say ioredis is a real full-featured redis client right now. This is a really big PRO.

I use [hiredis](https://github.com/redis/hiredis) to improve parser performance.

## Run

- Use `yarn` or `npm i` to install dependencies
- Use `npm test` to start benchmark

## Result

I do this benchmark test on my PC whose hardware are:

- System: OS X EI Capitan 10.11.6
- Processor: 4 GHz Intel Core i7
- Memory: 32 GB 1600 MHz DDR3
- Graphics: AMD Radeon R9 M290X 2048 MB

I got these output:

```
node_redis set: 836.005ms
ioredis set: 966.789ms
ioredis set pipeline: 147.655ms
node_redis get: 801.577ms
ioredis get: 903.011ms
ioredis get pipeline: 128.095ms
```

Welcome PR to makes this not tooooo simple >.<