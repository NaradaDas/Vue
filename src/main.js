import { createApp } from 'vue';
import numberFormat from '@/helpers/numberFormat';
import mitt from 'mitt';
import App from './App.vue';
import router from './router';
import store from './store';

const s = () => console.log('hi');

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.methods = { s };
app.config.globalProperties.emitter = emitter;
app.config.devtools = true;
app.config.globalProperties.$filters = { numberFormat };
app.use(router).use(store).mount('#app');
