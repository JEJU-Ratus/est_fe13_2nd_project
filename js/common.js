import { productData } from "./product.js";

function renderProducts() {
  const productGrid = document.querySelector(".product-grid");
  if (!productGrid) return;
  productGrid.innerHTML = productData
    .map(
      (product) => `
    <li class="product-card">
      <div class="product-image-area">
        <img src="${product.imageUrl}" alt="${product.name}">
      </div>
      <div class="product-info">
        <span class="product-brand">${product.brand}</span>
        <h3 class="product-name">${product.name}</h3>
        <strong class="price">${product.price.toLocaleString()}원</strong>
      </div>
    </li>
  `,
    )
    .join("");
}
document.addEventListener("DOMContentLoaded", renderProducts);
