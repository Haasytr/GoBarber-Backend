import { RedisOptions } from 'ioredis'

interface ICacheConfig {
  driver: 'redis'

  config: {
    redis: RedisOptions
  }
}

export default {
  driver: {},
  config: {
    redis: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASS || null,
    }
  }
} as ICacheConfig;
