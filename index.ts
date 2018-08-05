import { startCluster } from 'egg'

// 启用集群，充分利用多核CPU性能
startCluster({
  baseDir: __dirname,
  workers: process.env.WORKERS,
  port: process.env.PORT
})
