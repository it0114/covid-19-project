import {defineStore} from 'pinia'
import type {
    RootObject,
    RootObjectDiseaseh5ShelfAreaTreeChildren,
    RootObjectDiseaseh5ShelfChinaAdd,
    RootObjectDiseaseh5ShelfChinaTotal
} from "@/RootObject"


export const useListDataStore = defineStore({
    id: 'listData',
    state: () => ({
        list: <RootObject>{},
        listChildren: <RootObjectDiseaseh5ShelfAreaTreeChildren[]>[],
        chinaAdd: <RootObjectDiseaseh5ShelfChinaAdd>{},
        chinaTotal: <RootObjectDiseaseh5ShelfChinaTotal>{}
    }),
    actions: {
        storageList(data: RootObject) {
            this.list = data
        },
        storageChildren(data: any) {
            this.listChildren = data
        },
        storageChinaAdd(data: RootObjectDiseaseh5ShelfChinaAdd) {
            this.chinaAdd = data
        },
        storageChinaTotal(data: RootObjectDiseaseh5ShelfChinaTotal) {
            this.chinaTotal = data
        }
    }
})
