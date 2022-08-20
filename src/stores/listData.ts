import {defineStore} from 'pinia'
import type {RootObject} from "../RootObject"


export const useListDataStore = defineStore({
    id: 'listData',
    state: () => ({
        list: <RootObject>{}
    }),
    actions: {
        storageData(data: RootObject) {
            this.list = data
        }
    }
})
