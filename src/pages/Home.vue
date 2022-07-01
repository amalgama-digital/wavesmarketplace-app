<template>
    <div class="wavesmarketplace-home">
        <div class="wavesmarketplace-first border-radius-18">
            <div class="wavesmarketplace-first-back border-radius-18">
                <div class="wavesmarketplace-first-text">
                    <h2 style="color: #FFFFFF;">WATCH YOUR<br>BRAINS</h2>
                    <a class="wavesmarketplace-go-to" href="/collection/zombiepunks">GO TO ZOMBIEPUNKS COLLECTION</a>
                </div>
            </div>
        </div>

        <div class="wavesmarketplace-second border-radius-18">
            <img src="/img/crown.svg">
            <div class="wavesmarketplace-second-text">
                <h2>BE AMONG THE FIRST</h2>
                <p>This is the world’s first multi-functional NFT marketplace, based on Waves Platform</p>
            </div>
        </div>

        <div class="wavesmarketplace-third border-radius-18">
            <div class="wavesmarketplace-third-text">
                <h2>EASY TO USE</h2>
                <p>Buying and selling NFTs was never that easy. Create your account, and you’re in!</p>
            </div>
            <img src="/img/easy-to-use.svg">
        </div>

        <div class="wavesmarketplace-second border-radius-18">
            <img src="/img/banksy.svg">
            <div class="wavesmarketplace-second-text">
                <h2>TRUE DIGITAL ART</h2>
                <p>Waves Marketplace provides professional moderation for almost every NFT listed on the platform.</p>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Home"
    }
</script>

<style scoped>
    @media only screen and (max-width: 1440px) {
        h2 {
            font-size: 42px !important;
        }

        .wavesmarketplace-first-text > p,
        .wavesmarketplace-second-text > p,
        .wavesmarketplace-third-text > p {
            font-size: 24px !important;
            line-height: 29px !important;
        }

        .border-radius-18 img {
            height: 400px !important;
            margin-top: auto !important;
        }
    }

    @media only screen and (max-width: 1024px) {
        h2 {
            font-size: 32px !important;
            line-height: 43px !important;
        }

        .wavesmarketplace-first-text > p,
        .wavesmarketplace-second-text > p,
        .wavesmarketplace-third-text > p {
            font-size: 22px !important;
            line-height: 27px !important;
        }

        .wavesmarketplace-second {
            margin: 70px 0px !important;
        }
    }

    @media only screen and (max-width: 983px) {
        .border-radius-18 img {
            display: none;
        }
    }

    @media only screen and (max-width: 640px) {
        h2 {
            font-size: 26px !important;
            line-height: 37px !important;
        }

        .wavesmarketplace-first-text > p,
        .wavesmarketplace-second-text > p,
        .wavesmarketplace-third-text > p {
            font-size: 20px !important;
            line-height: 25px !important;
        }

        .wavesmarketplace-first-text, .wavesmarketplace-second-text, .wavesmarketplace-third-text {
            padding: 0 30px !important;
        }

        .wavesmarketplace-go-to {
            font-size: 14px !important;
        }
    }

    @media only screen and (max-width: 500px) {
        .wavesmarketplace-go-to {
            font-size: 12px !important;
        }
    }

    h2 {
        font-weight: 500;
        font-size: 52px;
        line-height: 63px;
        margin: 0;
    }

    .border-radius-18 {
        border-radius: 18px;
    }

    .wavesmarketplace-home {
        margin: 40px;
        font-family: Inter;
        font-style: normal;
    }

    .wavesmarketplace-first {
        margin-top: 70px;
        background: black;
        height: 550px;
        box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.2)
    }

    .wavesmarketplace-first-back {
        background-image: url('/img/first-block.png');
        background-size: cover;
        background-position: center;
        height: 100%;
        display: flex;
        justify-content: space-between;
    }

    .wavesmarketplace-first-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 60px;
    }

    .wavesmarketplace-first-text > p {
        font-weight: 300;
        font-size: 26px;
        line-height: 31px;
        color: #FFFFFF;
    }

    .wavesmarketplace-go-to {
        color: #FFD645;
        border-radius: 8px;
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        margin: 50px 0;
        border: 0;
        text-align: center;
        width: max-content;
    }

    .wavesmarketplace-go-to, .wavesmarketplace-go-to:hover, .wavesmarketplace-go-to:active {
        text-decoration: none;
        color: #FFD645;
    }

    .wavesmarketplace-go-to:hover {
        cursor: pointer;
    }

    .wavesmarketplace-second {
        margin-top: 70px;
        height: 550px;
        border: 2px solid #A400CC;
        display: flex;
        margin: 70px 100px;
    }

    .wavesmarketplace-second > img {
        height: 600px;
        margin: auto;
        margin-top: -20px;
    }

    .wavesmarketplace-second-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 60px;
        color: black;
    }

    .wavesmarketplace-second-text > p {
        font-weight: 300;
        font-size: 26px;
        line-height: 31px;
    }

    .wavesmarketplace-third {
        margin-top: 70px;
        height: 550px;
        display: flex;
        box-shadow: 2px 2px 2px 0px rgb(206, 206, 206), -2px -2px 2px 0px rgba(255, 255, 255, 0.5);
    }

    .wavesmarketplace-third > img {
        height: 600px;
        margin: auto;
        margin-top: -20px;
    }

    .wavesmarketplace-third-text {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 60px;
        color: black;
    }

    .wavesmarketplace-third-text > p {
        font-weight: 300;
        font-size: 26px;
        line-height: 31px;
    }
</style>
