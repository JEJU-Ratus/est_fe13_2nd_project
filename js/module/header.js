export function renderHeader() {
  const header = document.querySelector("#header");

  header.innerHTML = `
    <div class="header-wrapper">
        <div class="header-left">
          <h1 class="logo">
            <a href="/">
              <img src="./img/LOGO-img.png" alt="ROUNZ" />
              <span class="blind">ROUNZ 로고</span>
            </a>
          </h1>
          <nav class="gnb">
            <ul class="gnb-list">
              <li><a href="#">안경</a></li>
              <li><a href="#">선글라스</a></li>
              <li><a href="#">AI TRY-ON</a></li>
              <li><a href="#">고객센터</a></li>
            </ul>
          </nav>
        </div>

        <div class="header-actions">
          <button class="icon-btn search-btn">
            <span class="material-symbols-outlined">search</span>
            <span class="blind">검색</span>
          </button>
          <button class="icon-btn user-btn">
            <span class="material-symbols-outlined">person</span>
            <span class="blind">마이페이지</span>
          </button>
          <button class="icon-btn cart-btn">
            <span class="material-symbols-outlined">local_mall</span>
            <span class="blind">장바구니</span>
          </button>
        </div>
      </div>
  `;
}
