<template>
    <div class="wavespunks-home">
        <div class="wavespunks-content">
            <div class="wavespunks-main">
                <img class="wavespunks-logo" src="/img/logo.png">
                <!-- <div class="wavespunks-social">
                    <a id="discord" target="_blank" href="https://discord.gg/gfpKDfRtvf">
                        <img src="/img/discord.svg">
                    </a>
                    <a id="telegram" target="_blank" href="https://t.me/wavespunks">
                        <img src="/img/telegram.svg">
                    </a>
                    <a id="instagram" target="_blank" href="https://instagram.com/waves.punks">
                        <img src="/img/instagram.svg">
                    </a>
                    <a id="twitter" target="_blank" href="https://twitter.com/WavesPunks">
                        <img src="/img/twitter.svg">
                    </a>
                </div> -->
                <p class="wavespunks-text">NFT TSUNAMI IN...</p>
                <div class="countdown">
                    <div class="countdown-number">
                        <span class="countdown-time">{{ days }}</span>
                        <span class="countdown-text">Days</span>
                    </div>
                    <div class="countdown-number">
                        <span class="countdown-time">{{ hours }}</span>
                        <span class="countdown-text">Hours</span>
                    </div>
                    <div class="countdown-number">
                        <span class="countdown-time">{{ minutes }}</span>
                        <span class="countdown-text">Minutes</span>
                    </div>
                    <div class="countdown-number">
                        <span class="countdown-time">{{ seconds }}</span>
                        <span class="countdown-text">Seconds</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data(){
            return {
                days: "",
                hours: "",
                minutes: "",
                seconds: "",
                deadline: "December 27 2021 00:00:00 GMT+0300"
            }
        },
        mounted() {
            this.initializeClock(this.deadline);
        },
        methods: {
            initializeClock(endtime) {
                let vm = this;

                function getTimeRemaining(endtime) {
                    var t = Date.parse(endtime) - Date.parse(new Date());
                    var seconds = Math.floor((t / 1000) % 60);
                    var minutes = Math.floor((t / 1000 / 60) % 60);
                    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
                    var days = Math.floor(t / (1000 * 60 * 60 * 24));
                    return {
                        'total': t,
                        'days': days,
                        'hours': hours,
                        'minutes': minutes,
                        'seconds': seconds
                    };
                }

                function updateClock() {
                    var t = getTimeRemaining(endtime);

                    vm.days = t.days;
                    vm.hours = ('0' + t.hours).slice(-2);
                    vm.minutes = ('0' + t.minutes).slice(-2);
                    vm.seconds = ('0' + t.seconds).slice(-2);

                    if (t.total <= 0) {
                        clearInterval(timeinterval);
                    }
                }
                
                updateClock();
                var timeinterval = setInterval(updateClock, 1000);
            }
        }
    }
</script>

<style scoped>
    @media only screen and (max-width: 1200px) {
        .wavespunks-logo {
            max-width: 800px !important;
        }

        .wavespunks-text {
            font-size: 45px !important;
        }

        .countdown-time {
            font-size: 40px !important;
        }
    }

    @media only screen and (max-width: 800px) {
        .wavespunks-logo {
            max-width: 400px !important;
        }

        .wavespunks-text {
            font-size: 35px !important;
        }

        .countdown-time {
            font-size: 30px !important;
        }
    }

    @media only screen and (max-width: 400px) {
        .wavespunks-logo {
            max-width: 300px !important;
        }

        .wavespunks-text {
            font-size: 25px !important;
        }

        .countdown-number {
            margin: 0 10px !important;
        }

        .countdown-time {
            font-size: 20px !important;
        }
    }

    .wavespunks-home {
        background: #000000;
        color: white;
        height: 100vh;
        font-family: Inter;
        font-style: normal;
    }

    .wavespunks-content {
        background: radial-gradient(circle, rgba(121,0,121,1) 0%, rgba(0,0,0,1) 50%);
        height: 100%;
    }

    .wavespunks-main {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .wavespunks-logo {
        max-width: 1200px;
    }

    .wavespunks-text {
        font-weight: 500;
        font-size: 55px;
        line-height: 67px;
        text-align: center;
    }

    .wavespunks-social {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        width: 50%;
        justify-content: center;
        align-items: center;
        margin: auto;
    }

    .countdown {
        display: flex;
    }

    .countdown-number {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0px 25px;
    }

    .countdown-time {
        font-size: 50px;
    }

    .countdown-text {
        font-size: 12px;
    }
</style>
