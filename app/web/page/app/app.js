import Vue from 'vue'
import App from 'app'
import app from './app.vue'

export default App.init({
  base: '/app',
  ...app
})