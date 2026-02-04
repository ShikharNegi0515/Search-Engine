const BASE_URL = "http://localhost:5000/api/v1";


// Add product
async function addProduct() {
    const title = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = Number(document.getElementById("price").value);

    try {
        const res = await fetch(`${BASE_URL}/product`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, price })
        });

        const data = await res.json();
        document.getElementById("addMsg").innerText =
            data.productId ? "✅ Product added successfully" : "❌ Failed to add product";
    } catch (err) {
        console.error(err);
        document.getElementById("addMsg").innerText = "Error adding product";
    }
}


// Search product
async function searchProduct() {
    const query = document.getElementById("search").value;

    try {
        const res = await fetch(`${BASE_URL}/search/product?query=${query}`);
        const data = await res.json();

        const list = document.getElementById("results");
        list.innerHTML = "";

        if (!data.data || data.data.length === 0) {
            list.innerHTML = "<li>No products found</li>";
            return;
        }

        data.data.forEach(p => {
            const li = document.createElement("li");
            li.innerText = `${p.title} - ₹${p.price}`;
            list.appendChild(li);
        });

    } catch (err) {
        console.error("Search error:", err);
    }
}
