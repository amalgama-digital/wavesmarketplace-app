<template>
    <div>
        <profile :address="address"></profile>
        <div v-if="nfts.length > 0">
            <sort :nfts="nfts"></sort>
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
import axios from "axios";

import { sortLowestPrice } from "../helpers/sort";

import Profile from "../components/Profile.vue";
import Sort from "../components/Sort.vue";
import NFT from "../components/NFT.vue";

export default {
    name: "User",
    data() {
        return {
            address: "",
            nfts: [],
        };
    },
    components: {
        Profile,
        Sort,
        NFT,
    },
    async mounted() {
        this.address = this.$route.params["address"];
        await this.getNFT(this.address);
    },
    methods: {
        async getNFT(address) {
            await axios
                .get(`${window.nodeURL}/assets/nft/${address}/limit/1000`)
                .then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        try {
                            let data = {};
                            data.name = res.data[i].name;
                            data.assetId = res.data[i].assetId;
                            data.metadata = JSON.parse(res.data[i].description);
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

            await axios
                .get(
                    `${window.nodeURL}/addresses/data/${window.contractAddress}`
                )
                .then((res) => {
                    for (let i = 0; i < res.data.length; i++) {
                        if (
                            res.data[i].key.endsWith("_owner") &&
                            res.data[i].value == address
                        ) {
                            let data = {};

                            let l = res.data[i].key.length;

                            data.assetId = res.data[i].key.substring(0, l - 6);

                            data.name = res.data.find(
                                (item) => item.key == data.assetId + "_name"
                            ).value;

                            data.metadata = JSON.parse(
                                res.data.find(
                                    (item) => item.key == data.assetId + "_description"
                                ).value
                            );

                            data.price = res.data.find(
                                (item) => item.key == data.assetId + "_price"
                            ).value / 100000000;

                            this.nfts.push(data);
                        }
                    }
                })
                .catch((err) => {
                    console.error(err);
                });

            this.nfts = sortLowestPrice(this.nfts);
        },
    },
};
</script>

<style scoped>
@import "../assets/styles/button.css";
@import "../assets/styles/nfts.css";

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
