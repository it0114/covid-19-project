import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import "../src/assets/reset.css"

import {Button} from 'vant';

const app = createApp(App)

app
    .use(createPinia())
    .use(Button)

app.mount('#app')
