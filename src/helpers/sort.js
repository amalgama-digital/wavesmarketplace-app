function sortLowestPrice(data) {
    return data.sort((a, b) =>
        a.price > b.price ? 1 : b.price > a.price ? -1 : 0
    );
};

function sortHighestPrice(data) {
    return data.sort((a, b) =>
        a.price < b.price ? 1 : b.price < a.price ? -1 : 0
    );
};

function sortLowestId(data) {
    return data.sort((a, b) =>
        a.metadata.id > b.metadata.id ? 1 : b.metadata.id > a.metadata.id ? -1 : 0
    );
};

function sortHighestId(data) {
    return data.sort((a, b) =>
        a.metadata.id < b.metadata.id ? 1 : b.metadata.id < a.metadata.id ? -1 : 0
    );
};

export { sortLowestPrice, sortHighestPrice, sortLowestId, sortHighestId }