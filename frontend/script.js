const BASE_URL = "http://localhost:5000/api/v1";


// Add product
async function addProduct() {
    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;


    const res = await fetch(`${BASE_URL}/product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price })
    });


    const data = await res.json();
    document.getElementById("addMsg").innerText = data.message || "Product added";
}


// Search product
async function searchProduct() {
    const query = document.getElementById("search").value;


    const res = await fetch(`${BASE_URL}/search/product?q=${query}`);
    const data = await res.json();


    const list = document.getElementById("results");
    list.innerHTML = "";


    data.products?.forEach(p => {
        const li = document.createElement("li");
        li.innerText = `${p.name} - ₹${p.price}`;
        list.appendChild(li);
    });
}