const API_URL = "https://api.escuelajs.co/api/v1/products";
let allProducts = [];
let filteredProducts = [];

let currentPage = 1;
let pageSize = 10;

async function getAllProducts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        allProducts = data;
        filteredProducts = data;
        render();
    } catch (error) {
        console.error("Lỗi khi load dữ liệu:", error);
    }
}

function render() {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    const pageData = filteredProducts.slice(start, end);

    renderTable(pageData);
    renderPagination();
}

function renderPagination() {
    const totalPages = Math.ceil(filteredProducts.length / pageSize);
    const paginationDiv = document.getElementById("pagination");

    paginationDiv.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.innerText = i;
        btn.style.margin = "0 5px";
        btn.onclick = () => {
            currentPage = i;
            render();
        };

        if (i === currentPage) {
            btn.style.fontWeight = "bold";
        }

        paginationDiv.appendChild(btn);
    }
}


function renderTable(products) {
    const tbody = document.querySelector("#productTable tbody");
    tbody.innerHTML = "";

    products.forEach(product => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${product.id}</td>
            <td>
                <img src="${product.images[0]}" alt="${product.title}">
            </td>
            <td>${product.title}</td>
            <td>${product.price}</td>
            <td>${product.category?.name}</td>
        `;

        tbody.appendChild(tr);
    });
}

function handleSearch() {
    const keyword = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(keyword)
    );

    currentPage = 1;
    render();
}
function changePageSize() {
    pageSize = parseInt(document.getElementById("pageSize").value);
    currentPage = 1;
    render();
}
function sortByPrice(order) {
    filteredProducts.sort((a, b) => {
        return order === "asc"
            ? a.price - b.price
            : b.price - a.price;
    });

    currentPage = 1;
    render();
}

function sortByTitle(order) {
    filteredProducts.sort((a, b) => {
        return order === "asc"
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
    });

    currentPage = 1;
    render();
}



// Gọi khi load trang
getAllProducts();
