<template>
<div class="highlights">
    <div class="highlights__blocks">
        <div class="highlights__block">
            <img src="/img/highlights/item1.svg" />
            <p>BE AMONG THE FIRST</p>
            <p>
                This is the world’s first multi-functional NFT
                marketplace, based on Waves Platform
            </p>
        </div>
        <div class="highlights__block">
            <img src="/img/highlights/item2.svg" />
            <p>EASY TO USE</p>
            <p>
                Buying and selling NFTs was never that easy. Create your
                account, and you’re in!
            </p>
        </div>
        <div class="highlights__block">
            <img src="/img/highlights/item3.svg" />
            <p>TRUE DIGITAL ART</p>
            <p>
                Waves Marketplace provides professional moderation for
                almost every NFT listed on the platform.
            </p>
        </div>
        <div class="highlights__block">
            <img src="/img/highlights/item4.svg" />
            <p>CREATE YOUR OWN COLLECTION</p>
            <p>
                If you’re a digital artist, it’s your chance to step
                into the top league of the NFT-industry.
            </p>
        </div>
    </div>
    <div class="highlights__text">WAVES NFT RIDERS</div>
</div>
</template>

<script>
export default {
    name: "HighLights",
}
</script>

<style scoped>
@media only screen and (max-width: 425px) {
    .highlights__blocks {
        gap: 15px !important;
    }

    .highlights__block {
        width: 228px !important;
    }

    .highlights__text {
        left: -55px;
        width: max-content;
        max-width: initial !important;
        font-size: 11.1vw !important;
    }
}

.highlights {
    position: relative;
    margin-top: 100px;
}

.highlights__blocks {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 30px;
}

.highlights__block {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 246px;
    height: 246px;
    padding: 35px;
    border-radius: 20px;
    background: #f0f0f3;
    box-shadow: 3px 3px 5px rgba(9, 12, 31, 0.25),
        -3px -3px 6px rgba(255, 255, 255, 0.6);
    text-align: center;
}

.highlights__block > p {
    margin: 0;
}

.highlights__block > p:nth-child(2) {
    font-weight: 500;
    /* font-size: 30px; */
    font-size: 26px;
    /* line-height: 36px; */
    line-height: 30px;
}

.highlights__block > p:last-child {
    font-weight: 300;
    font-size: 14px;
    line-height: 17px;
}

.highlights__text {
    position: relative;
    /* left: -10px;
    width: max-content; */
    max-width: 1360px;
    margin: auto;
    font-weight: 900;
    font-size: 8.1vw;
    line-height: 182px;
    text-align: center;
    text-transform: uppercase;
    color: #f0f0f3;
    text-shadow: 3px 3px 5px rgba(9, 12, 31, 0.25),
        -3px -3px 6px rgba(255, 255, 255, 0.6);
}
</style>
