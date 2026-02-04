const { catalog } = require("../data/catalog");
const { rankProducts } = require("../services/rankingService");
const { normalizeQuery, detectPriceIntent, detectCheapIntent } = require("../utils/queryParser");


exports.searchProducts = (req, res) => {
    try {
        let query = normalizeQuery(req.query.query || "");


        let products = Array.from(catalog.values());


        const priceLimit = detectPriceIntent(query);
        const cheapIntent = detectCheapIntent(query);


        if (priceLimit) products = products.filter(p => p.price <= priceLimit);


        if (cheapIntent)
            products = products.sort((a, b) => a.price - b.price).slice(0, 50);


        const ranked = rankProducts(products, query);


        res.json({ data: ranked.slice(0, 20) });
    } catch {
        res.status(500).json({ error: "Search failed" });
    }
};