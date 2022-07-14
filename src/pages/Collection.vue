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

        <div class="sort">
            Sort by
            <select @change="onChange($event)">
                <option value="price-low-to-high">Price: Low to High</option>
                <option value="price-high-to-low">Price: High to Low</option>
                <option value="id-low-to-high">Lowest NFT ID</option>
                <option value="id-high-to-low">Highest NFT ID</option>
            </select>
        </div>

        <div class="nfts">
            <NFT :nft="nft" v-for="nft in nfts" v-bind:key="nft.assetId"></NFT>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import collection from "../collection.json";

import NFT from "../components/NFT.vue";

export default {
    name: "Collection",
    data() {
        return {
            params: "",
            name: "",
            description: "",
            issuer: "",
            nfts: [],
        };
    },
    components: {
        NFT,
    },
    async mounted() {
        this.params = this.$route.params["name"];
        this.name = collection[this.params].name;
        this.description = collection[this.params].description;
        this.issuer = collection[this.params].address_issuer;

        await axios
            .get(`${window.nodeURL}/addresses/data/${window.contractAddress}`)
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    if (
                        res.data[i].key.endsWith("_issuer") &&
                        res.data[i].value == this.issuer
                    ) {
                        let data = {};

                        let l = res.data[i].key.length;

                        data.assetId = res.data[i].key.substring(0, l - 7);

                        data.name = res.data.find(
                            (item) => item.key == data.assetId + "_name"
                        ).value;

                        data.metadata = JSON.parse(
                            res.data.find(
                                (item) => item.key == data.assetId + "_description"
                            ).value
                        );

                        data.price =
                            res.data.find(
                                (item) => item.key == data.assetId + "_price"
                            ).value / 100000000;

                        this.nfts.push(data);
                    }
                }
            })
            .catch((err) => {
                console.error(err);
            });

        this.sortLowestPrice();
    },
    methods: {
        onChange(event) {
            let v = event.target.value;
            if (v == "price-low-to-high") {
                this.sortLowestPrice();
            } else if (v == "price-high-to-low") {
                this.sortHighestPrice();
            } else if (v == "id-low-to-high") {
                this.sortLowestId();
            } else if (v == "id-high-to-low") {
                this.sortHighestId();
            }
        },
        sortLowestPrice() {
            this.nfts = this.nfts.sort((a, b) =>
                a.price > b.price ? 1 : b.price > a.price ? -1 : 0
            );
        },
        sortHighestPrice() {
            this.nfts = this.nfts.sort((a, b) =>
                a.price < b.price ? 1 : b.price < a.price ? -1 : 0
            );
        },
        sortLowestId() {
            this.nfts = this.nfts.sort((a, b) =>
                a.metadata.id > b.metadata.id ? 1 : b.metadata.id > a.metadata.id ? -1 : 0
            );
        },
        sortHighestId() {
            this.nfts = this.nfts.sort((a, b) =>
                a.metadata.id < b.metadata.id ? 1 : b.metadata.id < a.metadata.id ? -1 : 0
            );
        },
    },
};
</script>

<style scoped>
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

.nfts {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 65px;
    gap: 0px 40px;
}
</style>
