import {defineStore} from 'pinia'
import type {RootObject, RootObjectDiseaseh5ShelfAreaTreeChildren} from "../RootObject"


export const useListDataStore = defineStore({
    id: 'listData',
    state: () => ({
        list: <RootObject>{},
        listChildren: <RootObjectDiseaseh5ShelfAreaTreeChildren[]>[]
    }),
    actions: {
        storageList(data: RootObject) {
            this.list = data
        },
        storageChildren(data: any) {
            this.listChildren = data
        }
    }
})
