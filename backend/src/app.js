const express = require("express");
const cors = require("cors");


const { storeProduct, updateMetadata } = require("./controllers/productController");
const { searchProducts } = require("./controllers/searchController");
const seedProducts = require("./seed/seedProducts");

const app = express();
app.use(cors());
app.use(express.json());


// check
app.get("/", (_, res) => res.send("Search Engine Running"));


// Product APIs
app.post("/api/v1/product", storeProduct);
app.put("/api/v1/product/meta-data", updateMetadata);


// Search API
app.get("/api/v1/search/product", searchProducts);
seedProducts();

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));