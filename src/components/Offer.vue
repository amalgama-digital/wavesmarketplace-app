<template>
    <div class="modal">
        <div>
            <button class="close" @click="close"></button>
            <p>Price (WAVES)</p>
            <input v-model="price" placeholder="Enter price" type="number" />
            <button @click="offerForSale">Submit</button>
        </div>
    </div>
</template>

<script>
import { ProviderKeeper } from '@waves/provider-keeper';
import { ProviderCloud } from '@waves.exchange/provider-cloud';

export default {
    name: 'Offer',
    data() {
        return {
            price: 0,
        };
    },
    props: ['assetId'],
    methods: {
        async provider() {
            const data = JSON.parse(window.localStorage.getItem('loginChoice'));
            if (data.choice === 'keeper') {
                const authData = { data: 'https://wavesmarketplace.com/' };
                await window.signer
                    .setProvider(new ProviderKeeper(authData))
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else if (data.choice === 'email') {
                window.signer.setProvider(new ProviderCloud());
            }
        },
        async offerForSale() {
            await this.provider();

            await window.signer
                .invoke({
                    dApp: window.contractAddress,
                    fee: 900000,
                    payment: [
                        {
                            assetId: this.assetId,
                            amount: 1,
                        },
                    ],
                    call: {
                        function: 'offerForSale',
                        args: [
                            {
                                type: 'integer',
                                value: this.price * 100000000,
                            },
                        ],
                    },
                })
                .broadcast()
                .then((res) => {
                    console.log(res);
                    this.close();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        close() {
            this.$emit('close', false);
        },
    },
};
</script>

<style scoped>
@import '../assets/styles/button.css';
@import '../assets/styles/modal.css';

.modal > div {
    flex-direction: column;
}

input {
    height: 30px;
    margin-bottom: 15px;
    font-size: 20px;
}
</style>
