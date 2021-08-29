import {createApp} from 'vue'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import App from './App.vue'
import router from './router'
import store from './store'


// Vue.config.devtools = process.env.NODE_ENV === 'development'
const app = createApp(App)
  .use(store)
  .use(router)
  .use(ElementPlus)

// window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app.constructor

app.mount('#app')
