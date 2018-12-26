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

| Operation | node_redis Time(ms) | ioredis Time(ms) | ioredis with pipeline Time(ms) |
| --- | --- |--- |--- |
| set | 551.966 | 679.761 | 156.763 |
| get | 537.623 | 640.003 | 164.286 |
| hmset | 571.139 | 747.225 | 208.449 |
| hgetall | 618.184 | 736.134 | 243.452 |
| incr | 575.395 | 667.477 | 170.836|
| keys | 682.787 | 746.521 | 243.462 |

Welcome PR to makes this not tooooo simple >.<
