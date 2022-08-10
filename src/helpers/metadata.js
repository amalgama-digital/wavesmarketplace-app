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

export { getMetadata };
