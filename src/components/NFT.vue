<template>
    <a :href="`/asset/${nft.assetId}`" class="nft">
        <img v-if="nft.metadata.url" :src="nft.metadata.url" :alt="nft.name"  class="nft__img"/>
        <p v-else class="nft__img--empty">?</p>
        <div class="nft__info">
            <div class="nft__name">
                <p>{{ nft.name }}</p>
            </div>
            <div v-if="nft.price" class="nft__price">
                <p>{{ nft.price }} <img src="/img/waves-token.svg" /></p>
            </div>
        </div>
    </a>
</template>

<script>
export default {
    name: "NFT",
    props: ["nft"],
};
</script>

<style scoped>
@media only screen and (max-width: 425px) {
    .nft__img, .nft__img--empty {
        width: 200px !important;
    }

    .nft__img {
        height: 200px !important;
    }

    .nft__img--empty {
        padding: 21px 0px !important;
    }

    .nft__info {
        flex-direction: column !important;
    }

    .nft__name {
        font-size: 14px !important;
    }

    .nft__price > p {
        margin-top: 0;
    }
}

.nft {
    max-width: 357px;
    max-height: 450px;
    margin-top: 20px;
}

.nft,
.nft:hover,
.nft:active {
    color: black;
    text-decoration: none;
}

.nft__img, .nft__img--empty {
    width: 375px;
    margin: auto;
    border-radius: 18px;
    box-shadow: 2px 2px 2px 0px rgb(206, 206, 206),
        -2px -2px 2px 0px rgba(255, 255, 255, 0.5);
}

.nft__img {
    height: 375px;
}

.nft__img--empty {
    padding: 109px 0px;
    font-size: 130px;
    text-align: center;
}

.nft__info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.nft__name {
    font-weight: 500;
    font-size: 22px;
    line-height: 27px;
}

.nft__price {
    font-weight: 300;
}

.nft__price > p {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.nft__price > p > img {
    margin-left: 10px;
}
</style>
