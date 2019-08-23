# node\_redis-vs-ioredis

There are two popular redis client for Node: [node\_redis](https://github.com/NodeRedis/node_redis) and [ioredis](https://github.com/luin/ioredis).

This repository is a simple performance benchmark for them. PR is welcomed to makes this not tooooo simple >.<

## About this benchmark

First of all, I must say ioredis is a real full-featured redis client right now. This is a really big PRO.

I have no malice for both libraries. Just wanna do a performance benchmark.

## Run

1. Use `git clone git@github.com:poppinlp/node_redis-vs-ioredis.git` to clone this repo to local.
1. Use `yarn` or `npm i` to install dependencies.
1. Use `redis-server` to start redis server local with no password.
1. Use `yarn benchmark` or `npm run benchmark` to start benchmark.

## Result

I do this benchmark on my laptop with:

- OS: macOS 10.14.6
- Processor: 2.7 GHz Intel Core i7
- Memory: 16 GB 2133 MHz LPDDR3

And the result is like:

| Operation | node_redis(ms) | node_redis with multi(ms) | node_redis with batch(ms) |
| --- | --- | --- | --- |
| set | 975.642 | 90.095 | 62.411 |
| get | 1067.484 | 83.753 | 47.990 |
| hmset | 937.843 | 122.092 | 95.343 |
| hgetall | 1016.114 | 81.270 | 48.576 |
| incr | 827.890 | 47.513 | 33.893 |
| keys | 1045.368 | 245.800 | 202.975 |

| Operation | ioredis(ms) | ioredis with multi(ms) | ioredis with pipeline(ms) |
| --- | --- | --- | --- |
| set | 972.004 | 132.737 | 95.534 |
| get | 964.135 | 117.334 | 103.084 |
| hmset | 1006.690 | 162.359 | 152.416 |
| hgetall | 1091.209 | 124.997 | 113.609 |
| incr | 910.978 | 127.755 | 81.202 |
| keys | 975.638 | 302.184 | 233.408 |

PR is welcomed to makes this not tooooo simple >.<
