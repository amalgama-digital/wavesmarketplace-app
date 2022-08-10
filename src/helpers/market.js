import axios from 'axios';

async function getMarketInfo(key, value) {
    const nfts = [];
    await axios
        .get(`${window.nodeURL}/addresses/data/${window.contractAddress}`)
        .then((res) => {
            const resData = res.data;
            for (let i = 0; i < resData?.length; i++) {
                if (
                    resData[i].key.endsWith(key) &&
                    resData[i].value === value
                ) {
                    const data = {};

                    const l = resData[i].key.length;

                    data.assetId = resData[i].key.substring(0, l - key.length);

                    data.name = resData.find(
                        (item) => item.key === data.assetId + '_name'
                    ).value;

                    data.metadata = JSON.parse(
                        resData.find(
                            (item) => item.key === data.assetId + '_description'
                        ).value
                    );

                    data.price =
                        resData.find(
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
