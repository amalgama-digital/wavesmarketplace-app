<template>
    <div class="home">
        <div class="first">
            <div class="first__cover">
                <div class="first__text">
                    <h2 style="color: #ffffff">WATCH YOUR<br />BRAINS</h2>
                    <a href="/collection/zombiepunks">VIEW ZOMBIE COLLECTION</a>
                </div>
            </div>
        </div>

        <div class="highlights">
            <div class="highlights__blocks">
                <div class="highlights__block">
                    <img src="/img/highlights/item1.svg" />
                    <p>BE AMONG THE FIRST</p>
                    <p>This is the world’s first multi-functional NFT marketplace, based on Waves Platform</p>
                </div>
                <div class="highlights__block">
                    <img src="/img/highlights/item2.svg" />
                    <p>EASY TO USE</p>
                    <p>Buying and selling NFTs was never that easy. Create your account, and you’re in!</p>
                </div>
                <div class="highlights__block">
                    <img src="/img/highlights/item3.svg" />
                    <p>TRUE DIGITAL ART</p>
                    <p>Waves Marketplace provides professional moderation for almost every NFT listed on the platform.</p>
                </div>
                <div class="highlights__block">
                    <img src="/img/highlights/item4.svg" />
                    <p>CREATE YOUR OWN COLLECTION</p>
                    <p>If you’re a digital artist, it’s your chance to step into the top league of the NFT-industry.</p>
                </div>
            </div>
            <div class="highlights__text">WAVES NFT RIDERS</div>
        </div>

        <div class="collections">
            <div class="collections__title">
                THE MOST NOTICEABLE COLLECTIONS
            </div>
            <div class="collections__blocks">
                <a class="collections__block" href="/collection/zombiepunks">
                    <img src="/img/collections/zombie.png" />
                </a>
                <a class="collections__block" href="/collection/wavespunks">
                    <img src="/img/collections/punks.png" />
                </a>
            </div>
        </div>

        <div class="merch">
            WHAT ABOUT<br>IRL NFT?
        </div>
    </div>
</template>

<script>
export default {
    name: "Home",
};
</script>

<style scoped>
@media only screen and (max-width: 768px) {
    .first__cover {
        background-position: left !important;
    }

    .first__text > h2 {
        font-size: 42px !important;
    }

    .collections__block > img {
        height: 170px !important;
    }
}

@media only screen and (max-width: 425px) {
    .first__cover {
        justify-content: center !important;
    }

    .first__text {
        padding: 0 !important;
    }

    .first__text > h2 {
        font-size: 32px !important;
        text-align: center;
    }

    .highlights__blocks {
        gap: 15px !important;
    }

    .highlights__block {
        width: 228px !important;
    }

    .collections__block {
        display: flex !important;
        justify-content: center;
        min-width: 230px;
        overflow: hidden;
    }

    .merch {
        font-size: 38px !important;
        line-height: 61px !important;
        text-align: center !important;
    }
}

.home {
    margin: 40px;
    font-family: Inter;
    font-style: normal;
}

.first {
    max-width: 1360px;
    height: 550px;
    margin: auto;
    margin-top: 70px;
    border-radius: 18px;
    background: black;
    box-shadow: 2px 2px 2px 0px rgba(0, 0, 0, 0.2);
}

.first__cover {
    display: flex;
    justify-content: space-between;
    height: 100%;
    border-radius: 18px;
    background-image: url("/img/first-block.png");
    background-size: cover;
    background-position: center;
}

.first__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 60px;
}

.first__text > h2 {
    margin: 0;
    font-weight: 500;
    font-size: 52px;
    line-height: 63px;
}

.first__text > a {
    width: max-content;
    margin: 50px 0;
    border: 0;
    border-radius: 8px;
    color: #ffd645;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
    text-align: center;
}

.first__text > a,
.first__text > a:hover,
.first__text > a:active {
    text-decoration: none;
    color: #ffd645;
    cursor: pointer;
}

.highlights {
    position: relative;
    margin-top: 100px;
    overflow: hidden;
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
    left: -10px;
    width: max-content;
    font-weight: 900;
    font-size: 10.1vw;
    line-height: 182px;
    text-align: center;
    text-transform: uppercase;
    color: #f0f0f3;
    text-shadow: 3px 3px 5px rgba(9, 12, 31, 0.25),
        -3px -3px 6px rgba(255, 255, 255, 0.6);
}

.collections {
    margin-top: 100px;
}

.collections__title {
    margin-bottom: 30px;
    font-weight: 500;
    font-size: 35px;
    line-height: 42px;
    text-align: center;
}

.collections__blocks {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0 40px;
    max-width: max-content;
    margin: auto;
    padding: 10px 0px;
    overflow: hidden;
    overflow-x: scroll;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none;
}

.collections__blocks::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
}

.collections__block {
    display: block;
    border-radius: 20px;
    filter: drop-shadow(3px 3px 5px rgba(9, 12, 31, 0.25))
        drop-shadow(-3px -3px 6px rgba(255, 255, 255, 0.6));
}

.collections__block > img {
    height: 246px;
}

.merch {
    max-width: 1360px;
    height: 196px;
    margin: auto;
    margin-top: 100px;
    padding: 60px;
    border-radius: 20px;
    font-weight: 500;
    font-size: 50px;
    line-height: 90px;
    color: #FFFFFF;
    background-image: url('/img/merch.png');
    background-size: cover;
    background-position: center;
    text-align: right;
}
</style>
