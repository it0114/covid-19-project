import {defineStore} from 'pinia'

export const useListDataStore = defineStore({
    id: 'listData',
    state: () => ({
        list: {}
    }),
    actions: {
        storageData(data: object) {
            this.list = data
        }
    }
})
