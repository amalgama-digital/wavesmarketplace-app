import axios from 'axios';

async function getMarketInfo(key, value) {
    const nfts = [];
    await axios
        .get(`${window.nodeURL}/addresses/data/${window.contractAddress}`)
        .then((res) => {
            for (let i = 0; i < res.data.length; i++) {
                if (
                    res.data[i].key.endsWith(key) &&
                    res.data[i].value === value
                ) {
                    const data = {};

                    const l = res.data[i].key.length;

                    data.assetId = res.data[i].key.substring(0, l - key.length);

                    data.name = res.data.find(
                        (item) => item.key === data.assetId + '_name'
                    ).value;

                    data.metadata = JSON.parse(
                        res.data.find(
                            (item) => item.key === data.assetId + '_description'
                        ).value
                    );

                    data.price =
                        res.data.find(
                            (item) => item.key === data.assetId + '_price'
                        ).value / 100000000;

                    nfts.push(data);
                }
            }
        })
        .catch((err) => {
            console.error(err);
        });

    return nfts;
}

export { getMarketInfo };
