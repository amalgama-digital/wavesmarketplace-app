import { defineStore } from 'pinia'

export const useCollectionsStore = defineStore('collections', {
    state: () => ({
        sortBy: 'price-low-to-high',
        sortMethod: undefined,
    }),
})
