import { defineStore } from 'pinia'

import {
    sortLowestPrice,
    sortHighestPrice,
    sortLowestId,
    sortHighestId,
} from '../helpers/sort';

export const useCollectionsStore = defineStore('collections', {
    state: () => ({
        sortBy: 'price-low-to-high',
        sortMethod: undefined,
    }),
})
