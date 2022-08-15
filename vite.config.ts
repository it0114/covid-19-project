import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite';
import {VantResolver} from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(
            {
                // @ts-ignore
                refTransform: true,
                reactivityTransform: true
            }
        ),
        vueJsx(),
        Components({
            resolvers: [VantResolver()
            ],
        }),],
    base: './', //打包相对路径
    server: {
        port: 2333, //指定端口号
        proxy: {
            // '/user': {
            //     target: "http://127.0.0.1:3000/"
            // }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})

