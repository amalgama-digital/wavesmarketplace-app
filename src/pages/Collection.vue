<template>
    <div>
        <div class="collection">
            <div class="collection__cover">
                <img :src="`/collections/${params}/background.png`" />
            </div>
            <div class="collection__info">
                <div class="collection__name">
                    <h1>{{ name }}</h1>
                    <p>{{ description }}</p>
                </div>
            </div>
        </div>

        <sort :nfts="nfts" @change="setNfts"></sort>

        <div class="nfts">
            <NFT
                :nft="nft"
                :viewInfo="true"
                v-for="nft in nfts"
                v-bind:key="nft.assetId"
            ></NFT>
        </div>
    </div>
</template>

<script>
import collection from '../collection.json';

import { getMarketInfo } from '../helpers/market';
import { sortLowestPrice } from '../helpers/sort';

import { useCollectionsStore } from '../stores/collections';

import Sort from '../components/Sort.vue';
import NFT from '../components/NFT.vue';

export default {
    name: 'Collection',
    setup() {
        const store = useCollectionsStore();
        return {
            store,
        };
    },
    data() {
        return {
            params: '',
            name: '',
            description: '',
            issuer: '',
            nfts: [],
        };
    },
    components: {
        Sort,
        NFT,
    },
    async mounted() {
        this.params = this.$route.params.name;
        this.name = collection[this.params].name;
        this.description = collection[this.params].description;
        this.issuer = collection[this.params].address_issuer;

        const nfts = await getMarketInfo('_issuer', this.issuer);

        this.nfts = this.store.sortMethod(nfts);
    },

    methods: {
        setNfts() {
            this.nfts = this.store.sortMethod(this.nfts);
        }
    }
};
</script>

<style scoped>
@import '../assets/styles/nfts.css';

@media only screen and (max-width: 768px) {
    .collection__name > h1 {
        font-size: 18px;
    }

    .collection__name > p {
        font-size: 14px !important;
    }
}

@media only screen and (max-width: 425px) {
    .collection {
        margin: 15px !important;
        gap: 0px 10px !important;
    }

    .collection,
    .collection__cover {
        height: max-content !important;
    }

    .collection__cover {
        display: none !important;
    }

    .collection__info {
        margin-top: 0 !important;
    }

    .collection__name {
        padding: 0 40px !important;
    }
}

.collection {
    margin: 65px;
    height: 550px;
}

.collection__cover {
    position: relative;
    z-index: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 550px;
    max-width: max-content;
    margin: auto;
    border-radius: 18px;
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.collection__cover > img {
    height: 100%;
}

.collection__info {
    position: relative;
    z-index: 1;
    margin: auto;
    margin-top: -90px;
    max-width: 880px;
    border-radius: 18px;
    background-color: #fff;
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
}

.collection__name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 60px;
    color: #000;
}

.collection__name > h1 {
    text-align: center;
}

.collection__name > p {
    font-weight: 300;
    font-size: 1rem;
    line-height: 31px;
    text-align: center;
}
</style>
