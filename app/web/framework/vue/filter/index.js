/* eslint-disable */
import Vue from 'vue'

/**
 * 对空的内容进行‘--’替换
 */
// Vue.filter('formatColumnData', input => {
//   input ? input : '--'
// })

/**
 * 去掉HTML标签
 */
Vue.filter('removeHtml', input => {
  return input && input.replace(/<(?:.|\n)*?>/gm, '')
    .replace(/(&rdquo;)/g, '\"')
    .replace(/&ldquo;/g, '\"')
    .replace(/&mdash;/g, '-')
    .replace(/&nbsp;/g, '')
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/<[\w\s"':=\/]*/, '')
})
