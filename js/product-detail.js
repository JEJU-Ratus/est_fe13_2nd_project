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
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", () => {
        document.querySelector(".thumbnail-item.active")?.classList.remove("active");
        thumbnail.classList.add("active");
        const newImgSrc = thumbnail.querySelector("img").getAttribute("src");
        if (newImgSrc) mainImg.setAttribute("src", newImgSrc);
      });
    });
  }

  // 3. 컬러 칩 선택 기능
  let selectedColor = "기본"; // 선택된 컬러를 저장할 변수
  const colorChips = document.querySelectorAll(".chip");
  if (colorChips.length > 0) {
    colorChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelector(".chip.active")?.classList.remove("active");
        chip.classList.add("active");
        selectedColor = chip.getAttribute("aria-label")?.replace(" 컬러 선택", "") || "기본";
        console.log(`선택된 컬러: ${selectedColor}`);
      });
    });
  }

  // 4. 액션 버튼 그룹 기능
  const tryOnBtn = document.querySelector(".btn-try-on");
  const cartBtn = document.querySelector(".btn-cart");
  const buyBtn = document.querySelector(".btn-buy");
  const modal = document.querySelector("#tryon-modal");
  const closeModalBtn = document.querySelector(".close-modal");

  // 5. 장바구니 모달 관련 요소
  const cartConfirmModal = document.querySelector("#cart-confirm-modal");
  const goToCartBtn = document.querySelector("#go-to-cart");
  const closeCartModalBtn = document.querySelector("#close-cart-modal");

  tryOnBtn?.addEventListener("click", () => modal?.classList.add("open"));
  closeModalBtn?.addEventListener("click", () => modal?.classList.remove("open"));

  // 장바구니 버튼 (확인창 + 데이터 추출)
  cartBtn?.addEventListener("click", () => {
    // A. URL 파라미터에서 현재 상품 ID 추출 (형규님이 구현한 파라미터 활용)
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id") || "default-id"; // ID가 없으면 기본값

    // B. 상품 정보 추출
    const productName = document.querySelector(".product-title").textContent;
    const productPrice = document.querySelector(".current-price").textContent;
    const productImage = document.querySelector(".main-img").getAttribute("src");

    // C. 가격 정제 (숫자만 추출)
    const numericPrice = parseInt(productPrice.replace(/[^0-9]/g, ""), 10);

    // D. 저장할 데이터 객체 생성 (이제 동적 ID 사용!)
    const cartItem = {
      id: productId,
      name: productName,
      price: numericPrice,
      image: productImage,
      color: selectedColor,
      quantity: 1,
    };

    // 로컬스토리지 저장
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // 이미 담긴 상품인지 확인
    const existingItemIndex = cart.findIndex((item) => item.id === cartItem.id && item.color === cartItem.color);
    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;
    } else {
      cart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("장바구니에 담긴 데이터:", cartItem);

    // confirm 대신 모달 띄우기
    cartConfirmModal?.classList.add("open");
  });

  // 모달 제어 이벤트
  goToCartBtn?.addEventListener("click", () => {
    window.location.href = "cart.html";
  });

  closeCartModalBtn?.addEventListener("click", () => {
    cartConfirmModal?.classList.remove("open");
    showToast("장바구니에 상품이 담겼습니다.");
  });

  // 구매하기 버튼
  buyBtn?.addEventListener("click", () => {
    console.log("구매 페이지로 이동 로직 실행");
  });
}

// AI 가상 피팅 모달 취소 버튼 기능 강제 연결
const closeTryonBtn = document.getElementById("close-tryon-modal");
const tryonModal = document.getElementById("tryon-modal");

if (closeTryonBtn) {
  closeTryonBtn.addEventListener("click", () => {
    if (tryonModal) {
      tryonModal.classList.remove("open"); // 모달 닫기
    }
  });
}
document.addEventListener("DOMContentLoaded", initProductDetail);
