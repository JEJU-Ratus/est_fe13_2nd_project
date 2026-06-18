document.addEventListener('DOMContentLoaded', () => {
  const form            = document.getElementById('signup-form');
  const usernameInput   = document.getElementById('signup-username');
  const nameInput       = document.getElementById('signup-name');
  const emailInput      = document.getElementById('signup-email');
  const telInput        = document.getElementById('signup-tel');
  const pwInput         = document.getElementById('signup-password');
  const pwConfirmInput  = document.getElementById('signup-password-confirm');
  const submitBtn       = document.querySelector('.btn-signup');

  // 에러 표시/제거
  const showError  = (input, msg) => {
    input.parentNode.querySelector('.error-msg')?.remove();
    input.insertAdjacentHTML('afterend', `<p class="error-msg">${msg}</p>`);
    input.classList.add('input-error');
  };
  const clearError = (input) => {
    input.parentNode.querySelector('.error-msg')?.remove();
    input.classList.remove('input-error');
  };

  // 버튼 활성화/비활성화
  const updateBtn = () => {
    const allFilled =
      usernameInput.value.trim() &&
      nameInput.value.trim() &&
      emailInput.value.trim() &&
      telInput.value.trim() &&
      pwInput.value.trim() &&
      pwConfirmInput.value.trim();

    submitBtn.disabled = !allFilled;
  };

  // 버튼 초기 비활성화
  submitBtn.disabled = true;

  // 입력 시 버튼 활성화 체크
  [usernameInput, nameInput, emailInput, telInput, pwInput, pwConfirmInput]
    .forEach(input => input.addEventListener('input', updateBtn));

  // blur 시 유효성 검사
  usernameInput.addEventListener('blur', () => {
    if (!usernameInput.value.trim()) showError(usernameInput, '사용자명을 입력해주세요.');
    else clearError(usernameInput);
  });

  nameInput.addEventListener('blur', () => {
    if (!nameInput.value.trim()) showError(nameInput, '이름을 입력해주세요.');
    else clearError(nameInput);
  });

  emailInput.addEventListener('blur', () => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    if (!isValid) showError(emailInput, '올바른 이메일 형식이 아닙니다.');
    else clearError(emailInput);
  });

  telInput.addEventListener('blur', () => {
    const isValid = /^01[0-9]-\d{3,4}-\d{4}$/.test(telInput.value.trim());
    if (!isValid) showError(telInput, '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)');
    else clearError(telInput);
  });

  pwInput.addEventListener('blur', () => {
    if (!pwInput.value.trim()) showError(pwInput, '비밀번호를 입력해주세요.');
    else clearError(pwInput);
  });

  pwConfirmInput.addEventListener('blur', () => {
    if (pwInput.value !== pwConfirmInput.value) showError(pwConfirmInput, '비밀번호가 일치하지 않습니다.');
    else clearError(pwConfirmInput);
  });

  // submit 최종 검사
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    const isValidTel   = /^01[0-9]-\d{3,4}-\d{4}$/.test(telInput.value.trim());
    const isPwMatch    = pwInput.value === pwConfirmInput.value;
    let isValid        = true;

    if (!usernameInput.value.trim()) { showError(usernameInput, '사용자명을 입력해주세요.'); isValid = false; }
    if (!nameInput.value.trim()) { showError(nameInput, '이름을 입력해주세요.'); isValid = false; }
    if (!isValidEmail) { showError(emailInput, '올바른 이메일 형식이 아닙니다.'); isValid = false; }
    if (!isValidTel) { showError(telInput, '올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)'); isValid = false; }
    if (!pwInput.value.trim()) { showError(pwInput, '비밀번호를 입력해주세요.'); isValid = false; }
    if (!isPwMatch) { showError(pwConfirmInput, '비밀번호가 일치하지 않습니다.'); isValid = false; }

    if (isValid) window.location.href = 'index.html';
  });
});