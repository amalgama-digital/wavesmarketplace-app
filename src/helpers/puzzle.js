import axios from "axios";

async function getPuzzleImage(assetId) {
    let metadata = {};
    await axios
        .get(
            `${window.nodeURL}/addresses/data/3PFQjjDMiZKQZdu5JqTHD7HwgSXyp9Rw9By?key=nft_${assetId}_image`
        )
        .then((res) => {
            metadata.url = res.data[0].value;
        })
        .catch((err) => {
            console.error(err);
        });

    return metadata;
}

export { getPuzzleImage }
