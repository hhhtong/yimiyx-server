// export * from './supplier'
// export * from './goods-category'
// export * from './goods-list'
// export * from './purchase-order'

const modulesContext = require.context('./', true, /\.js$/)
let API = {}
const chunks = modulesContext.keys().reduce((modules, key) => {
  if (key !== './index.js') {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@', modulesContext(key))
    API = {...API, ...modulesContext(key)}
  }
  return API
}, {})
export default {
  ...chunks
}
