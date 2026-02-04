const { catalog, getNextId } = require("../data/catalog");

function seedProducts() {
    for (let i = 0; i < 1000; i++) {
        const id = getNextId();

        catalog.set(id, {
            id,
            title: `iPhone ${Math.floor(Math.random() * 10) + 10}`,
            description: "Sample generated iPhone product",
            rating: Math.random() * 2 + 3,
            stock: Math.floor(Math.random() * 100),
            price: Math.floor(Math.random() * 80000) + 20000,
            mrp: Math.floor(Math.random() * 90000) + 30000,
            currency: "INR",
            sales: Math.floor(Math.random() * 10000),
            returnRate: Math.random() * 0.2,
            complaints: Math.floor(Math.random() * 50),
            metadata: {}
        });
    }

    console.log("✅ Seeded 1000 products into in-memory catalog");
}

module.exports = seedProducts;
