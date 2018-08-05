/**
 * 生产环境配置
 *
 * 最终生效的配置为 prod + default（前者覆盖后者）
 */
import { DefaultConfig } from './config.default'

export default () => {
  const config: DefaultConfig = {}
  return config
}
