const API = "./data/product.json";

// 토스트 메시지 함수
function showToast(message) {
  const toast = document.querySelector("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
}

// URL에서 id로 상품 찾아서 정보 적용
async function loadProductDetail() {
  const params = new URLSearchParams(window.location.search);
  const productId = Number(params.get("id"));

  if (!productId) {
    console.error("URL에 id 파라미터가 없습니다.");
    return;
  }

  const res = await fetch(API);
  const { products } = await res.json();
  const product = products.find(p => p.id === productId);

  if (!product) {
    console.error("해당 상품을 찾을 수 없습니다. id:", productId);
    return;
  }

  const mainImg = document.querySelector(".main-img");
  if (mainImg) {
    mainImg.src = product.thumbnail;
    mainImg.alt = product.title;
  }

  const firstThumbnailImg = document.querySelector(".thumbnail-item:first-child img");
  if (firstThumbnailImg) {
    firstThumbnailImg.src = product.thumbnail;
    firstThumbnailImg.alt = product.title;
  }

  const brandName = document.querySelector(".brand-name");
  if (brandName) brandName.textContent = product.brand;

  const productTitle = document.querySelector(".product-title");
  if (productTitle) productTitle.textContent = product.title;

  const breadcrumbCurrent = document.querySelector(".breadcrumb [aria-current='page']");
  if (breadcrumbCurrent) breadcrumbCurrent.textContent = product.title;

  const currentPrice = document.querySelector(".current-price");
  if (currentPrice) currentPrice.textContent = `${product.price.toLocaleString()}원`;

  document.title = `ROUNZ | ${product.title}`;
}

function initProductDetail() {
  // 1. 즐겨찾기 버튼
  const wishBtn = document.querySelector(".btn-wish");
  if (wishBtn) {
    wishBtn.addEventListener("click", () => {
      const heartIcon = wishBtn.querySelector(".heart-icon");
      const isActive = wishBtn.classList.toggle("is-active");

      if (heartIcon) {
        heartIcon.textContent = "favorite";
        heartIcon.style.fontVariationSettings = isActive
          ? "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24"
          : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24";
      }

      showToast(isActive ? "즐겨찾기에 추가되었습니다." : "즐겨찾기에서 해제되었습니다.");
    });
  }

  // 2. 갤러리 썸네일 기능
  const mainImg = document.querySelector(".main-img");
  const thumbnails = document.querySelectorAll(".thumbnail-item");

  if (mainImg && thumbnails.length > 0) {
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener("click", () => {
        document.querySelector(".thumbnail-item.active")?.classList.remove("active");
        thumbnail.classList.add("active");

        const newImgSrc = thumbnail.querySelector("img")?.getAttribute("src");
        if (newImgSrc) mainImg.setAttribute("src", newImgSrc);
      });
    });
  }

  // 3. 컬러 칩 선택 기능
  let selectedColor = "기본";
  const colorChips = document.querySelectorAll(".chip");

  if (colorChips.length > 0) {
    colorChips.forEach(chip => {
      chip.addEventListener("click", () => {
        document.querySelector(".chip.active")?.classList.remove("active");
        chip.classList.add("active");

        selectedColor = chip.getAttribute("aria-label")?.replace(" 컬러 선택", "") || "기본";
        console.log(`선택된 컬러: ${selectedColor}`);
      });
    });
  }

  // 4. 액션 버튼
  const tryOnBtn = document.querySelector(".btn-try-on");
  const cartBtn = document.querySelector(".btn-cart");
  const buyBtn = document.querySelector(".btn-buy");

  const tryonModal = document.querySelector("#tryon-modal");
  const closeTryonBtn = document.querySelector("#close-tryon-modal");

  const cartConfirmModal = document.querySelector("#cart-confirm-modal");
  const goToCartBtn = document.querySelector("#go-to-cart");
  const closeCartModalBtn = document.querySelector("#close-cart-modal");

  // AI 가상 피팅 모달
  tryOnBtn?.addEventListener("click", () => {
    tryonModal?.classList.add("open");
  });

  closeTryonBtn?.addEventListener("click", () => {
    tryonModal?.classList.remove("open");
  });

  // 장바구니 버튼
  cartBtn?.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id") || "default-id";

    const productBrand = document.querySelector(".brand-name")?.textContent ?? "";
    const productName = document.querySelector(".product-title")?.textContent;
    const productPrice = document.querySelector(".current-price")?.textContent;
    const productImage = document.querySelector(".main-img")?.getAttribute("src");

    if (!productName || !productPrice || !productImage) {
      showToast("상품 정보를 불러오지 못했습니다.");
      return;
    }

    const numericPrice = parseInt(productPrice.replace(/[^0-9]/g, ""), 10);

    const cartItem = {
      id: productId,
      brand: productBrand,
      name: productName,
      price: numericPrice,
      image: productImage,
      color: selectedColor,
      quantity: 1,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItemIndex = cart.findIndex(
      item => item.id === cartItem.id && item.color === cartItem.color,
    );

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log("장바구니에 담긴 데이터:", cartItem);

    cartConfirmModal?.classList.add("open");
  });

  goToCartBtn?.addEventListener("click", () => {
    window.location.href = "cart.html";
  });

  closeCartModalBtn?.addEventListener("click", () => {
    cartConfirmModal?.classList.remove("open");
    showToast("장바구니에 상품이 담겼습니다.");
  });

  buyBtn?.addEventListener("click", () => {
    console.log("구매 페이지로 이동 로직 실행");
  });
}

// DOMContentLoaded에서 둘 다 실행
document.addEventListener("DOMContentLoaded", () => {
  loadProductDetail();
  initProductDetail();
});
