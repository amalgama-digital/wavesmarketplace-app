<template>
    <footer>
        <div class="footer__blocks">
            <div class="footer__logo">
                <a href="/">
                    <img src="/img/footer/logo.svg" />
                </a>
            </div>
            <div class="footer__links">
                <!-- <a id="discord" target="_blank" href="https://discord.gg/gfpKDfRtvf">
                    <img src="/img/footer/discord.svg" />
                </a> -->
                <a id="telegram" target="_blank" href="https://t.me/wavespunks_en">
                    <img src="/img/footer/telegram.svg" />
                </a>
                <a id="instagram" target="_blank" href="https://instagram.com/waves_punks">
                    <img src="/img/footer/instagram.svg" />
                </a>
            </div>
            <div class="footer__company">
                <a href="https://wavesassociation.org/">
                    <img src="/img/footer/wa.svg" />
                </a>
                <a href="https://picsell.art/">
                    <img src="/img/footer/psc.svg" />
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style scoped>
@media only screen and (max-width: 1440px) {
    footer {
        margin: 65px 40px !important;
    }

    .footer__text {
        left: -35px;
        margin: 0 !important;
        font-size: 9.6vw !important;
    }
}

@media only screen and (max-width: 768px) {
    .footer__text {
        left: -20px;
    }

    .footer__blocks {
        flex-direction: column !important;
    }

    .footer__links {
        margin: 20px 0px;
    }
}

@media only screen and (max-width: 500px) {
    .footer__text {
        left: -10px;
    }
}

footer {
    position: relative;
    max-width: 1360px;
    margin: auto;
    margin-top: 65px;
    margin-bottom: 25px;
}

.footer__blocks {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.footer__links > a:first-child,
.footer__links > a:nth-child(2) {
    margin-right: 10px;
}

.footer__company {
    display: flex;
}

.footer__company > a {
    display: flex;
    justify-content: center;
    align-items: center;
}

.footer__company > a:first-child {
    margin-right: 10px;
}
</style>
