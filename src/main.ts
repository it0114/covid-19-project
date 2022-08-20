import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import "../src/assets/reset.css"

import {Button, Picker, Tab, Tabs, Field, Popup,Sticky} from 'vant';

const app = createApp(App)

app
    .use(createPinia())
    .use(Button)
    .use(Picker)
    .use(Tab)
    .use(Tabs)
    .use(Field)
    .use(Popup)
    .use(Sticky)

app.mount('#app')
