<template>
    <div class="profile">
        <div class="profile__cover">
            <div class="profile__cover--text">
                <img :src="img" />
            </div>
        </div>
        <div class="profile__info">
            <div class="profile__name">
                <h1>{{ name ? name : address }}</h1>
                <p>{{ description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { create } from "identity-img";

export default {
    name: "Profile",
    data() {
        return {
            name: "",
            description: "",
            img: "",
        }
    },
    props: ["address"],
    async mounted() {
        await axios
            .get(`${window.nodeURL}/addresses/data/3PGSWDgad4RtceQYXBpq2x73mXLRJYLRqRP?matches=%5Euser(.*)${this.address}`)
            .then((res) => {
                for (let i = 0; i < res.data.length; i++) {
                    this.name = res.data.find(
                        (item) => item.key == "user_name_" + this.address
                    ).value;

                    this.description = res.data.find(
                        (item) => item.key == "user_desc_" + this.address
                    ).value;

                    const thumb = res.data.find(
                        (item) => item.key == "user_thumb_" + this.address
                    ).value;

                    if (thumb !== undefined) {
                        this.img = "https://infura-ipfs.io/ipfs/" + thumb;
                    }
                }
            })
            .catch((err) => {
                console.error(err);
            });

        if (this.img == "") {
            this.img = await create(this.address, { size: 120 });
        }
    },
}
</script>

<style scoped>
@media only screen and (max-width: 768px) {
    .profile__info {
        margin-top: -50px !important;
    }

    .profile__name > h1 {
        font-size: 14px;
    }
}

@media only screen and (max-width: 425px) {
    .profile__cover img {
        height: 90px !important;
    }
}

.profile {
    margin: 65px;
    height: 350px;
}

.profile__cover {
    position: relative;
    z-index: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 350px;
    max-width: 1400px;
    margin: auto;
    border-radius: 18px;
    background: radial-gradient(49.91% 258.29% at 60.66% 81.09%,#05f 0,#000 100%);
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
    overflow: hidden;
}

.profile__cover--text {
    display: flex;
    width: 100%;
    height: 100%;
    background-image: url("/img/marketplace.svg");
}

.profile__cover img {
    margin: auto;
    height: 120px;
    border-radius: 50%;
}

.profile__info {
    position: relative;
    z-index: 1;
    margin: auto;
    margin-top: -90px;
    max-width: 880px;
    border-radius: 18px;
    background-color: #fff;
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
}

.profile__name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 60px;
    color: #000;
}

.profile__name > h1 {
    text-align: center;
    text-overflow: ellipsis;
    overflow: hidden;
}

.profile__name > p {
    font-weight: 300;
    font-size: 1rem;
    line-height: 31px;
    text-align: center;
}
</style>
