<template>
    <div class="sort">
        Sort by
        <select @change="onChange($event)">
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

export default {
    name: 'Sort',
    props: ['nfts'],
    methods: {
        onChange(event) {
            const v = event.target.value;
            if (v == 'price-low-to-high') {
                this.nfts = sortLowestPrice(this.nfts);
            } else if (v == 'price-high-to-low') {
                this.nfts = sortHighestPrice(this.nfts);
            } else if (v == 'id-low-to-high') {
                this.nfts = sortLowestId(this.nfts);
            } else if (v == 'id-high-to-low') {
                this.nfts = sortHighestId(this.nfts);
            }
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
