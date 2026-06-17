// 0. 토스트 메시지
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
  // 1. 하트 버튼 초기화 (상태 토글 및 아이콘 변경)
  const wishBtn = document.querySelector(".btn-wish");
  const heartIcon = wishBtn?.querySelector(".heart-icon");

  if (wishBtn) {
    wishBtn.addEventListener("click", () => {
      const isActive = wishBtn.classList.toggle("is-active");
      if (heartIcon) {
        heartIcon.textContent = isActive ? "favorite" : "favorite_border";
      }
      showToast(isActive ? "즐겨찾기에 추가되었습니다." : "즐겨찾기에서 해제되었습니다.");
    });
  }

  // 2. 갤러리 썸네일 기능 추가
  const mainImg = document.querySelector(".main-img");
  const thumbnails = document.querySelectorAll(".thumbnail-item");

  if (mainImg && thumbnails.length > 0) {
    thumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", () => {
        document.querySelector(".thumbnail-item.active")?.classList.remove("active");
        thumbnail.classList.add("active");
        const newImgSrc = thumbnail.querySelector("img").getAttribute("src");
        if (newImgSrc) {
          mainImg.setAttribute("src", newImgSrc);
        }
      });
    });
  }

  // 3. 컬러 칩 선택 기능
  const colorChips = document.querySelectorAll(".chip");
  if (colorChips.length > 0) {
    colorChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        document.querySelector(".chip.active")?.classList.remove("active");
        chip.classList.add("active");
        const colorName = chip.classList.contains("chip-grey")
          ? "그레이"
          : chip.classList.contains("chip-yellow")
            ? "옐로우"
            : "블랙";
        console.log(`선택된 컬러: ${colorName}`);
      });
    });
  }

  // 4. 액션 버튼 그룹 기능
  const tryOnBtn = document.querySelector(".btn-try-on");
  const cartBtn = document.querySelector(".btn-cart");
  const buyBtn = document.querySelector(".btn-buy");
  const modal = document.querySelector("#tryon-modal");
  const closeModalBtn = document.querySelector(".close-modal");

  // AI 피팅 버튼 (모달 열기)
  tryOnBtn?.addEventListener("click", () => {
    modal?.classList.add("open");
  });

  closeModalBtn?.addEventListener("click", () => {
    modal?.classList.remove("open");
  });

  // 장바구니 버튼 (토스트)
  cartBtn?.addEventListener("click", () => {
    showToast("장바구니에 상품이 담겼습니다.");
  });

  // 구매하기 버튼
  buyBtn?.addEventListener("click", () => {
    console.log("구매 페이지로 이동 로직 실행");
  });
}

document.addEventListener("DOMContentLoaded", initProductDetail);
