<template>
    <div>
        <profile :address="address"></profile>
        <div v-if="nfts.length > 0">
            <sort @change="setNfts"></sort>
            <div class="nfts">
                <NFT
                    :nft="nft"
                    :viewInfo="true"
                    v-for="nft in nfts"
                    v-bind:key="nft.assetId"
                ></NFT>
            </div>
        </div>
        <div class="empty" v-else-if="nfts.length <= 0">
            <p>?</p>
            <p>You don't have NFT yet</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import { getMetadata } from '../helpers/metadata';
import { getMarketInfo } from '../helpers/market';
import { sortLowestPrice } from '../helpers/sort';

import { useCollectionsStore } from '../stores/collections';

import Profile from '../components/Profile.vue';
import Sort from '../components/Sort.vue';
import NFT from '../components/NFT.vue';

export default {
    name: 'User',
    setup() {
        const store = useCollectionsStore();
        return {
            store,
        };
    },
    data() {
        return {
            address: '',
            nfts: [],
        };
    },
    components: {
        Profile,
        Sort,
        NFT,
    },
    async mounted() {
        this.address = this.$route.params.address;
        await this.getNFT(this.address);
    },
    methods: {
        async getNFT(address) {
            await axios
                .get(`${window.nodeURL}/assets/nft/${address}/limit/1000`)
                .then(async (res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        try {
                            const data = {};

                            data.name = res.data[i].name;
                            data.assetId = res.data[i].assetId;

                            data.issuer = res.data[i].issuer;
                            data.metadata = await getMetadata(
                                data.assetId,
                                data.issuer,
                                res.data[i].description
                            );

                            data.price = 0;

                            this.nfts.push(data);
                        } catch (err) {
                            console.error(err);
                        }
                    }
                })
                .catch((err) => {
                    console.error(err);
                });

            this.nfts = this.nfts.concat(
                await getMarketInfo('_owner', address)
            );

            this.nfts = sortLowestPrice(this.nfts);
        },
        setNfts() {
            this.nfts = this.store.sortMethod(this.nfts);
        },
    },
};
</script>

<style scoped>
@import '../assets/styles/button.css';
@import '../assets/styles/nfts.css';

.empty {
    font-family: Inter;
    font-style: normal;
}

.empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 357px;
    height: 500px;
    padding: 20px;
    margin: auto;
    border-radius: 18px;
}

.empty > p:first-child {
    font-size: 130px;
}

.empty > p:nth-child(2) {
    text-align: center;
}
</style>
