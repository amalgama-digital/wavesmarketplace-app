<template>
    <div class="sort">
        Sort by
        <select v-model="store.sortBy" @change="onChange">
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="id-low-to-high">Lowest NFT ID</option>
            <option value="id-high-to-low">Highest NFT ID</option>
        </select>
    </div>
</template>

<script>
import {
    sortLowestPrice,
    sortHighestPrice,
    sortLowestId,
    sortHighestId,
} from '../helpers/sort';

import { useCollectionsStore } from '../stores/collections';

export default {
    name: 'Sort',
    setup() {
        const store = useCollectionsStore();
        return {
            store,
        };
    },
    mounted() {
        this.store.sortMethod = this.sortMethodByName();
    },
    methods: {
        sortMethodByName() {
            switch (this.store.sortBy) {
                case 'price-low-to-high':
                    return sortLowestPrice;
                case 'price-high-to-low':
                    return sortHighestPrice;
                case 'id-low-to-high':
                    return sortLowestId;
                case 'id-high-to-low':
                    return sortHighestId;
                default:
                    return sortLowestPrice;
            }
        },
        onChange() {
            this.store.sortMethod = this.sortMethodByName();
            this.$emit('change');
        },
    },
};
</script>

<style scoped>
@media only screen and (max-width: 425px) {
    .sort {
        margin: 50px 15px 0px 15px !important;
    }
}

.sort {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 55px 105px;
}

.sort > select {
    padding: 10px;
    border: 0;
    background: #f0f0f0;
    color: #0055ff;
    font-family: Inter;
    font-size: 14px;
    font-weight: 500;
}

.sort > select:hover,
.sort > select:active {
    border: 0;
}

.sort > select:focus-visible {
    outline: none;
}
</style>
