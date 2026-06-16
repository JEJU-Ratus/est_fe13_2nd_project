document.addEventListener('DOMContentLoaded', () => {
  const form       = document.getElementById('login-form');
  const emailInput = document.getElementById('login-email');
  const pwInput    = document.getElementById('login-password');

  const showError  = (input, msg) => {
    input.parentNode.querySelector('.error-msg')?.remove();
    input.insertAdjacentHTML('afterend', `<p class="error-msg">${msg}</p>`);
    input.classList.add('input-error');
  };

  const clearError = (input) => {
    input.parentNode.querySelector('.error-msg')?.remove();
    input.classList.remove('input-error');
  };

  emailInput.addEventListener('input', () => clearError(emailInput));
  pwInput.addEventListener('input',    () => clearError(pwInput));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim());
    const isValidPw    = pwInput.value.trim() !== '';

    if (!isValidEmail) showError(emailInput, '이메일이 올바르지 않습니다.');
    if (!isValidPw)    showError(pwInput,    '비밀번호가 올바르지 않습니다.');

    if (isValidEmail && isValidPw) window.location.href = 'index.html';
  });
});