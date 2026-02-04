# 🛒 E‑Commerce Search Engine Microservice

A production‑style backend search engine built with **Node.js + Express** that supports:

* Product catalog storage
* Metadata enrichment
* Intelligent product search with ranking
* Fuzzy matching for spelling mistakes
* Ranking based on rating, sales, price, stock, and complaints

Designed for **Tier‑2 / Tier‑3 India electronics marketplace** scenarios.

---

# 🚀 Tech Stack

* **Node.js** + **Express.js**
* **In‑memory catalog (Map)** for fast lookup
* **Fuse.js** for fuzzy search
* **Custom ranking algorithm**
* **CORS + JSON middleware**

---

# 📂 Project Structure

```
src/
 ├── controllers/
 │    ├── productController.js
 │    └── searchController.js
 ├── services/
 │    └── rankingService.js
 ├── data/
 │    └── catalog.js
 ├── seed/
 │    └── seedProducts.js
 └── app.js
```

---

# ▶️ How to Run the Project

```bash
npm install
npm run dev
```

Server runs at:

```
http://localhost:5000
```

On startup, **1000 sample products are seeded automatically** into memory.

---

# 📡 API Documentation

## 1️⃣ Health Check

### GET /

**Response**

```json
"Search Engine Running"
```

---

## 2️⃣ Store Product in Catalog

### POST `/api/v1/product`

Stores a new product in the in‑memory catalog.

### Request Body

```json
{
  "title": "iPhone 17",
  "description": "6.3 inch OLED display",
  "rating": 4.5,
  "stock": 50,
  "price": 79999,
  "mrp": 89999,
  "currency": "INR"
}
```

### Success Response

```json
{
  "productId": 101
}
```

---

## 3️⃣ Update Product Metadata

### PUT `/api/v1/product/meta-data`

Adds extra attributes like RAM, storage, color, etc.

### Request Body

```json
{
  "productId": 101,
  "Metadata": {
    "ram": "8GB",
    "storage": "128GB",
    "screensize": "6.3 inches",
    "color": "Red"
  }
}
```

### Success Response

```json
{
  "productId": 101,
  "Metadata": {
    "ram": "8GB",
    "storage": "128GB",
    "screensize": "6.3 inches",
    "color": "Red"
  }
}
```

---

## 4️⃣ Search Products (Ranked Results)

### GET `/api/v1/search/product?query=<search_text>`

Returns **ranked product list** based on:

* Text relevance (fuzzy search)
* Rating
* Sales volume
* Stock availability
* Discount / price value
* Return rate
* Customer complaints

### Example Request

```
GET /api/v1/search/product?query=sasta iphone
```

### Example Response

```json
{
  "data": [
    {
      "id": 103,
      "title": "iPhone 15",
      "price": 52000,
      "rating": 4.2,
      "stock": 25,
      "_score": 0.83
    }
  ]
}
```

Products are sorted by **descending `_score`**.

---

# 🧠 Ranking Algorithm Overview

Each product gets a **final relevance score**:

```
Score =
  0.35 × Text Match
+ 0.15 × Rating
+ 0.15 × Sales Popularity
+ 0.10 × Stock Availability
+ 0.10 × Discount Value
− 0.10 × Return Rate
− 0.05 × Complaints
```

### Features

* Handles **spelling mistakes** ("ifone" → "iphone")
* Works for **Hinglish queries** ("sasta iphone")
* Returns results even if **no exact match**

---

# ⚠️ Limitations (Current Version)

* Catalog stored **in memory** → resets on server restart
* No **database persistence**
* No **user personalization**

---

# 🔮 Future Improvements

* MongoDB / ElasticSearch persistence
* Click‑through based ML ranking
* City‑based personalization for Tier‑2/3 India
* Redis caching for <50ms search latency
* Swagger API documentation
* Frontend search UI

---

# 👨‍💻 Author Notes

This project demonstrates:

* REST API design
* Search relevance engineering
* Fuzzy matching
* Ranking algorithms
* Production‑style backend structuring

Suitable for **backend / full‑stack interview submissions**.

---

# 📜 License

MIT License
