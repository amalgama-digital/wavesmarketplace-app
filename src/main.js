import Vue from 'vue';

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import router from './router';
import Index from './Index';

import { Signer } from '@waves/signer';

Vue.router = router;
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

window.nodeURL = 'https://nodes.wavesnodes.com';

window.signer = new Signer({
    NODE_URL: 'https://nodes.wavesnodes.com',
});

window.contractAddress = '3P2m8mf5M9yRUVgYzATiiK8wDTd4pHDiFLs';

if (
    window.location.href.indexOf('wavesmarketplace.com') > -1 ||
    window.location.href.indexOf('ost:') > -1 ||
    window.location.href.indexOf('wavesmarketplace-app.pages.dev') > -1
)
    new Vue({
        render: (h) => h(Index),
        el: '#app',
        router,
    });
