# node\_redis-vs-ioredis

There are two popular redis client for Node: [node\_redis](https://github.com/NodeRedis/node_redis) and [ioredis](https://github.com/luin/ioredis).

This repo is a simple benchmark for them. Welcome PR to makes this not tooooo simple >.<

## About this benchmark

First of all i must say ioredis is a real full-featured redis client right now. This is a really big PRO.

I have no malice for both libraries. Just wanna do a performance benchmark.

## Run

1. Use `git clone git@github.com:poppinlp/node_redis-vs-ioredis.git` to clone this repo to local.
1. Use `yarn` or `npm i` to install dependencies.
1. Use `redis-server` to start redis server local with no password.
1. Use `npm test` to start benchmark.

## Result

I do this benchmark test on my PC whose hardware are:

- OS: Ubuntu 17.04 64-bit
- Processor: Intel® Core™ i5-4590 CPU @ 3.30GHz × 4 
- Memory: 8GiB
- Graphics: GeForce GTX 750 Ti/PCIe/SSE2

I got these output:

```
node_redis set: 551.966ms
ioredis set: 679.761ms
ioredis set with pipeline: 156.763ms
node_redis get: 537.623ms
ioredis get: 640.003ms
ioredis get with pipeline: 164.286ms
node_redis hmset: 571.139ms
ioredis hmset: 747.225ms
ioredis hmset with pipeline: 208.449ms
node_redis hgetall: 618.184ms
ioredis hgetall: 736.134ms
ioredis hgetall with pipeline: 243.452ms
node_redis incr: 575.395ms
ioredis incr: 667.477ms
ioredis incr with pipeline: 170.836ms
node_redis keys: 682.787ms
ioredis keys: 746.521ms
ioredis keys with pipeline: 243.462ms
```

Welcome PR to makes this not tooooo simple >.<
