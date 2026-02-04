const Fuse = require("fuse.js");

function computeScore(product, textScore = 0) {
    const ratingScore = product.rating / 5;
    const stockScore = product.stock > 0 ? 1 : 0;

    const priceScore =
        product.mrp > 0 ? Math.max(0, 1 - product.price / product.mrp) : 0;

    return (
        0.35 * textScore +
        0.15 * ratingScore +
        0.15 * Math.log10(product.sales + 1) +
        0.1 * stockScore +
        0.1 * priceScore -
        0.1 * product.returnRate -
        0.05 * (product.complaints / 100)
    );
}

function rankProducts(products, query) {
    if (!query) {
        return products
            .map((p) => ({ ...p, _score: computeScore(p, 0.5) }))
            .sort((a, b) => b._score - a._score);
    }

    const fuse = new Fuse(products, {
        keys: ["title", "description"],
        includeScore: true, 
        threshold: 0.4,
    });

    const fuzzyResults = fuse.search(query);

    // If no fuzzy match → still rank all products
    if (fuzzyResults.length === 0) {
        return products
            .map((p) => ({ ...p, _score: computeScore(p, 0.2) }))
            .sort((a, b) => b._score - a._score);
    }

    const scored = fuzzyResults.map(({ item, score }) => {
        const textScore = score !== undefined ? 1 - score : 0.5;

        return {
            ...item,
            _score: computeScore(item, textScore),
        };
    });

    return scored.sort((a, b) => b._score - a._score);
}

module.exports = { rankProducts };
