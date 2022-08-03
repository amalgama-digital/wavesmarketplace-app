import { getPuzzleImage } from '../helpers/puzzle';

async function getMetadata(assetId, issuer, description) {
    if (issuer == '3PFQjjDMiZKQZdu5JqTHD7HwgSXyp9Rw9By') {
        return await getPuzzleImage(assetId);
    } else {
        try {
            return JSON.parse(description);
        } catch {
            return description;
        }
    }
}

export { getMetadata };
