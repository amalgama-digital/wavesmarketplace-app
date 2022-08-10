import axios from 'axios';
import { getMetadata } from './metadata';

async function getMarketInfo(key, value) {
    const nfts = [];
    try {
        const res = await axios.get(
            `${window.nodeURL}/addresses/data/${window.contractAddress}`
        );
        const resData = res.data;
        for (let i = 0; i < resData?.length; i++) {
            if (resData[i].key.endsWith(key) && resData[i].value === value) {
                const data = {};

                const l = resData[i].key.length;

                data.assetId = resData[i].key.substring(0, l - key.length);

                data.name = resData.find(
                    (item) => item.key === data.assetId + '_name'
                ).value;

                const raw_meta = resData.find(
                    (item) => item.key === data.assetId + '_description'
                ).value;

                data.metadata = await getMetadata(
                    undefined,
                    undefined,
                    raw_meta
                );

                data.price =
                    resData.find((item) => item.key === data.assetId + '_price')
                        .value / 100000000;

                nfts.push(data);
            }
        }
    } catch (error) {
        console.error(error);
    }

    return nfts;
}

export { getMarketInfo };
