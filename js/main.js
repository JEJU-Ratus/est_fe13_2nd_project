const API = "./data/product.json";
const newProductGrid = document.querySelector("#new-product-grid");
const allProductGrid = document.querySelector(".product-grid.all-eyewear");
const moreBtn = document.querySelector(".more-btn");

let products = [];
let currentPage = 1;
const countPerPage = 12;
let infiniteMode = false;
let isLoading = false;

async function fetchProducts() {
  renderSkeleton();
  try {
    const res = await fetch(API);
    const data = await res.json();
    // console.log(data.products);
    products = data.products;
    // console.log(Array.isArray(products));
    allProductGrid.innerHTML = "";
    renderNewProducts(products);
    renderMoreProducts();
  } catch (error) {
    console.log(error, "에러가 발생했습니다.");
  } finally {
  }
}
// 스켈레톤 UI
function renderSkeleton() {
  const skeletonHTML = `
  <li class="product-card">
              <div class="skeleton-box skeleton"></div>
              <div class="product-info">
                <div class="skeleton-line skeleton" style="width: 25%"></div>
                <div class="skeleton-line skeleton"></div>
                <div class="color-options">
                  <div class="color-swatch skeleton"></div>
                  <div class="color-swatch skeleton"></div>
                  <div class="color-swatch skeleton"></div>
                </div>
                <div class="product-price-area">
                  <div class="skeleton-line skeleton" style="width: 25%"></div>
                  <div class="skeleton-line skeleton" style="width: 25%"></div>
                </div>
              </div>
            </li>
  `;
  newProductGrid.innerHTML = Array.from({ length: 4 }, () => skeletonHTML).join("");
  allProductGrid.innerHTML = Array.from({ length: 12 }, () => skeletonHTML).join("");
}
// 상품 리스트
function productHTML(p, showBadge = false) {
  return `<li class="product-card">
              <div class="product-image-area">
                <a href="product-detail.html?id=${p.id}">
                  <img
                    src="${p.thumbnail}"
                    alt="${p.title}"
                  />
                  ${showBadge ? '<span class="badge new-badge">NEW</span>' : ""}
                </a>
              </div>
              <div class="product-info">
                <span class="product-brand heading-xs">${p.brand}</span>
                <a href="product-detail.html?${p.id}">
                  <h3 class="product-name heading-m">${p.title}</h3>
                </a>
                <div class="color-options">
                  <span class="color-swatch silver"></span>
                  <span class="color-swatch yellow"></span>
                  <span class="color-swatch brown"></span>
                </div>
                <div class="product-price-area">
                  <strong class="price">${p.price.toLocaleString()}원</strong>
                </div>
              </div>
            </li>
    `;
}

// 신상품
function renderNewProducts(products) {
  const newProducts = products.slice(0, 4);
  // console.log(newProducts);
  newProductGrid.innerHTML = newProducts.map(np => productHTML(np, true)).join("");
}
// 전체 아이웨어
function renderMoreProducts() {
  if (isLoading) return;

  isLoading = true;

  const start = (currentPage - 1) * countPerPage;
  const end = currentPage * countPerPage;
  const sliced = products.slice(start, end);

  allProductGrid.insertAdjacentHTML("beforeend", sliced.map(p => productHTML(p)).join(""));

  currentPage++;

  if (end >= products.length) {
    moreBtn.style.display = "none";
  }

  isLoading = false;
}
//  더보기 클릭
moreBtn.addEventListener("click", () => {
  renderMoreProducts();
  infiniteMode = true;
});
window.addEventListener("scroll", () => {
  if (!infiniteMode) return;

  const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;

  if (nearBottom) {
    renderMoreProducts();
  }
});
fetchProducts();
