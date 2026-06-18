const API = "./data/product.json";
const newProductGrid = document.querySelector("#new-product-grid");

let LIMIT = 0;
let skip = 0;
let total = null;
let isLoading = false;

async function fetchProducts() {
  try {
    const res = await fetch(API);
    const data = await res.json();
    // console.log(data.products);
    products = data.products;
    // console.log(Array.isArray(products));
    renderSkeleton();
    renderNewProducts(products);
  } catch (error) {
    console.log(error, "에러가 발생했습니다.");
  } finally {
  }
}

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
}

function renderNewProducts(products) {
  const newProducts = products.slice(0, 4);
  console.log(newProducts);
  newProductGrid.innerHTML = newProducts
    .map(np => {
      return `<li class="product-card">
              <div class="product-image-area">
                <img
                  src="${np.thumbnail}"
                  alt="${np.title}"
                />
                <span class="badge new-badge">NEW</span>
              </div>
              <div class="product-info">
                <span class="product-brand heading-xs">${np.brand}</span>
                <h3 class="product-name heading-m">${np.title}</h3>
                <div class="color-options">
                  <span class="color-swatch silver"></span>
                  <span class="color-swatch yellow"></span>
                  <span class="color-swatch brown"></span>
                </div>
                <div class="product-price-area">
                  <strong class="price">${np.price.toLocaleString()}원</strong>
                </div>
              </div>
            </li>
    `;
    })
    .join("");
}

fetchProducts();
