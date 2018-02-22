import Vue from 'vue';
import App from 'app';
import app from './app.vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
// import store from 'store';
// import router from 'router';

App.use(iView);

export default App.init({
  ...app
  // router,
  // store
})