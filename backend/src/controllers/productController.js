const { catalog, getNextId } = require("../data/catalog");


exports.storeProduct = (req, res) => {
    try {
        const id = getNextId();


        const product = {
            id,
            ...req.body,
            sales: Math.floor(Math.random() * 10000),
            returnRate: Math.random() * 0.2,
            complaints: Math.floor(Math.random() * 50),
            metadata: {}
        };


        catalog.set(id, product);
        res.json({ productId: id });
    } catch {
        res.status(500).json({ error: "Failed to store product" });
    }
};


exports.updateMetadata = (req, res) => {
    try {
        const { productId, Metadata } = req.body;


        if (!catalog.has(productId))
            return res.status(404).json({ error: "Product not found" });


        catalog.get(productId).metadata = Metadata;


        res.json({ productId, Metadata });
    } catch {
        res.status(500).json({ error: "Metadata update failed" });
    }
};