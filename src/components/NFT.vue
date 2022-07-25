<template>
    <component :is="nft.assetId ? 'a' : 'div'" :href="link" class="nft">
        <img
            v-if="nft.metadata.url"
            :src="nft.metadata.url"
            :alt="nft.name"
            :style="nft.metadata.style"
            class="nft__img"
        />
        <p v-else class="nft__img--empty">?</p>
        <div v-if="viewInfo" class="nft__info">
            <div class="nft__name">
                <p>{{ nft.name }}</p>
            </div>
            <div v-if="nft.price" class="nft__price">
                <p>{{ nft.price }}</p>
            </div>
        </div>
    </component>
</template>

<script>
import { createStyle, createURL, parseName } from "../helpers/ducks";

export default {
    name: "NFT",
    props: ["nft", "viewInfo", "url"],
    created() {
        const ducks = parseName(this.nft.name);
        if (ducks.length > 1) {
            this.nft.metadata.url = createURL(this.nft.name, this.nft.assetId);
            this.nft.metadata.style = createStyle(this.nft.name);
        }
    },
    computed: {
        link() {
            if (this.url) {
                return `${this.url}/asset/${this.nft.assetId}`
            } else {
                return `/asset/${this.nft.assetId}`
            }
        }
    }
};
</script>

<style scoped>
@media only screen and (max-width: 425px) {
    a.nft > img.nft__img,
    a.nft > img.nft__img--empty {
        width: 170px !important;
    }

    a.nft > img.nft__img {
        height: 170px !important;
    }

    div.nft > img.nft__img,
    div.nft > img.nft__img--empty {
        width: 340px !important;
    }

    div.nft > img.nft__img {
        height: 340px !important;
    }

    .nft__img--empty {
        padding: 20px 0px !important;
        font-size: 107px !important;
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
    font-family: Inter;
    max-width: 357px;
    max-height: 450px;
}

.nft,
.nft:hover,
.nft:active {
    color: black;
    text-decoration: none;
}

.nft__img,
.nft__img--empty {
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

.nft__price > p::after {
    content: url("../assets/images/waves-token.svg");
    margin-top: 5px;
    margin-left: 10px;
}
</style>
