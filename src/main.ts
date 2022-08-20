import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import "../src/assets/reset.css"

import {Button, Picker, Tab, Tabs} from 'vant';

const app = createApp(App)

app
    .use(createPinia())
    .use(Button)
    .use(Picker)
    .use(Tab)
    .use(Tabs)

app.mount('#app')
