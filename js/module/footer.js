// footer 송민혁 모듈화를 위한 정리
export function renderFooter() {
  const footer = document.querySelector("#footer");

  footer.innerHTML = `
      <div class="footer-wrapper">
        <h2>
          <a href="/">
            <img src="./img/LOGO-img.png" alt="ROUNZ" />
            <span class="blind">ROUNZ 로고</span>
          </a>
        </h2>
        <div class="footer-info">
          <address class="company-info">
            <dl>
              <dt>회사명</dt>
              <dd>주식회사 라운즈</dd>
              <dt>대표자</dt>
              <dd>김라운</dd>
              <dt>사업자등록번호</dt>
              <dd>123-45-67890</dd>
              <dt>주소</dt>
              <dd>서울 특별시 강남구 테헤란로 123, 라운즈빌딩 7층</dd>
              <dt>대표전화</dt>
              <dd>1588-0000</dd>
              <dt>이메일</dt>
              <dd>hello@rounz.com</dd>
            </dl>
          </address>

          <nav class="footer-menus">
            <div class="menu-group">
              <h3 class="menu-title">고객지원</h3>
              <ul>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">문의하기</a></li>
                <li><a href="#">이용가이드</a></li>
              </ul>
            </div>
            <div class="menu-group">
              <h3 class="menu-title">정책</h3>
              <ul>
                <li><a href="#">이용약관</a></li>
                <li><a href="#">개인정보처리방침</a></li>
              </ul>
            </div>
          </nav>
        </div>

        <ul class="social-links">
          <li>
            <a href="#" aria-label="인스타그램">
              <img src="img/instagram.png" alt="인스타그램 로고" />
            </a>
          </li>
          <li>
            <a href="#" aria-label="페이스북">
              <img src="img/facebook.png" alt="페이스북 로고" />
            </a>
          </li>
          <li>
            <a href="#" aria-label="유튜브">
              <img src="img/youtube.png" alt="유튜브 로고" />
            </a>
          </li>
          <li>
            <a href="#" aria-label="링크드인">
              <img src="img/linkedin.png" alt="링크드인 로고" />
            </a>
          </li>
        </ul>
        <small class="copyright">
          <p>© 2026 ROUNZ Inc. All Rights Reserved.</p>
          <p>Designed with care in Seoul, Korea</p>
        </small>
      </div>
  `;
}
