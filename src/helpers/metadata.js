import axios from 'axios';

import { getPuzzleImage } from '../helpers/puzzle';

async function getMetadata(assetId, issuer, description) {
    if (issuer === '3PFQjjDMiZKQZdu5JqTHD7HwgSXyp9Rw9By') {
        return await getPuzzleImage(assetId);
    } else {
        var resp = {};
        try {
            resp = JSON.parse(description);
        } catch {
            const regex = '{"id": ([0-9]*)"?, "url": "(https://[a-z./0-9]*)"}';
            const matched = description.match(regex);
            resp = {
                id: matched[1],
                url: matched[2],
            };
        } finally {
            return resp;
        }
    }
}

/**
 * get asset url from issuer contract by address
 */
async function url_by_issuer(issuer, assetId) {
    try {
        const loc = `${window.nodeURL}/addresses/data/${issuer}`;
        const reqData = {
            "keys": [
                `${assetId}_url`
            ]
        };
        const response = await axios.post(
            loc,
            reqData
        );
        return response.data[0]?.value;
    } catch (error) {
        console.error("url_by_issuer", error);
    }
}

export { getMetadata, url_by_issuer };
