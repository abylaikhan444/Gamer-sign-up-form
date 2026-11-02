// ==========================================
// 1. ПЕРЕКЛЮЧЕНИЕ ПАРОЛЕЙ (SHOW / HIDE)
// ==========================================
const eyeButtons = document.querySelectorAll(".btn-toggle-pass");
eyeButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const parrent = btn.closest(".input-wrapper");
    const input = parrent.querySelector("input");
    if (input.type === "password") {
      input.setAttribute("type", "text");
    } else {
      input.setAttribute("type", "password");
    }
  });
});

// ==========================================
// 2. ЖИВОЙ ПОЗЫВНОЙ (CALLSIGN MIRROR)
// ==========================================
const userName = document.querySelector(".operator-panel__name");
const inputName = document.querySelector("#callsign");

inputName.addEventListener("input", () => {
  const cleanValue = inputName.value.trim();
  if (cleanValue === "") {
    userName.textContent = "UNASSIGNED";
  } else {
    userName.textContent = inputName.value;
  }
});

// ==========================================
// 3. ИНДИКАТОР СЛОЖНОСТИ ПАРОЛЯ
// ==========================================
const passwordInput = document.querySelector("#password");
const passwordBarList = document.querySelectorAll(".password-strength__bar");
const defaultPasswordHint = "At least 8 characters";
const passwordHint = document.querySelector(".form-group__hint");
const statusPassword = document.querySelector("#status-password");
const alertIconPassword = document.querySelector(".form-group__password-input .form-group__alert-icon");

function calculateStrengthPassword(password) {
  let count = 0;
  if (password.length === 0) {
    return 0;
  }
  if (password.length >= 8) {
    count++;
  }
  if (/[0-9]/.test(password)) {
    count++;
  }
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    count++;
  }
  if (/[^a-zA-Z0-9]/.test(password)) {
    count++;
  }
  return count;
}

function getPasswordError(value) {
  const trimmed = value.trim();
  if (trimmed === "") {
    return "Enter a password";
  }
  if (trimmed.length < 8) {
    return "Use at least 8 characters";
  }
  return null;
}

function getConfirmPasswordError(confirmVal, passVal) {
  if (confirmVal === "") {
    return "Confirm your password";
  }
  if (confirmVal !== passVal) {
    return "Passwords don't match";
  }

  return null;
}

passwordInput.addEventListener("input", () => {
  const score = calculateStrengthPassword(passwordInput.value);
  passwordBarList.forEach((bar, index) => {
    bar.classList.toggle("password-strength__bar--active", index < score);
  });

  const error = getPasswordError(passwordInput.value);
  updateFieldUI(passwordInput, passwordHint, statusPassword, alertIconPassword, error, defaultPasswordHint, null);

  if (inputConfirm.value !== "") {
    const confirmError = getConfirmPasswordError(confirmPasswordInput.value, passwordInput.value);
    updateFieldUI(confirmPasswordInput, confirmPasswordHint, statusConfirm, null, confirmError, "", null);
  }
});

// ==========================================
// 4. ВАЛИДАЦИЯ NAME INPUT
// ==========================================

function updateFieldUI(input, hint, status, icon, error, defaultHint, tickIcon) {
  if (error === null) {
    // 🟢 ВСЁ ХОРОШО:
    status.textContent = "OK";
    status.classList.add("status-list__value--ok");

    hint.textContent = defaultHint;
    hint.classList.remove("form-group__paragraph--error");

    input.classList.remove("form-group__input--error");

    if (tickIcon) tickIcon.style.display = "block";
    if (icon) icon.style.display = "none";
  } else {
    // 🔴 ОШИБКА:
    status.textContent = "PENDING";
    status.classList.remove("status-list__value--ok");

    hint.textContent = error;
    hint.classList.add("form-group__paragraph--error");

    input.classList.add("form-group__input--error");

    if (tickIcon) tickIcon.style.display = "none";
    if (icon) icon.style.display = "block";
  }
}

function getCallsignError(value) {
  const trimmed = value.trim();

  if (trimmed === "") {
    return "Enter a callsign";
  }

  if (trimmed.length < 3) {
    return "Use at least 3 characters";
  }
  if (trimmed.length > 20) {
    return "Use 20 characters or fewer";
  }

  if (/[^a-zA-Z0-9_-]/.test(trimmed)) {
    return "Use letters, numbers, _ or -";
  }

  return null;
}

const callsignHint = document.querySelector(".form-group__paragraph");
const statusCallsign = document.querySelector("#status-callsign");
const alertIconCallsign = document.querySelector(".form-group__name-input .form-group__alert-icon");
const defaultCallsignHint = "3–20 characters: letters, numbers, _ or -";
const tickIconName = document.querySelector(".form-group__tick-icon__name");

inputName.addEventListener("input", () => {
  const error = getCallsignError(inputName.value);
  updateFieldUI(inputName, callsignHint, statusCallsign, alertIconCallsign, error, defaultCallsignHint, tickIconName);
});

// ==========================================
// 5. ВАЛИДАЦИЯ EMAIL INPUT
// ==========================================

const inputEmail = document.querySelector("#email");
const defaultCallsignHintEmail = "Enter your email";
const emailHint = document.querySelector(".form-group__email-input .form-group__paragraph");
const alertIconEmail = document.querySelector(".form-group__email-input .form-group__alert-icon");
const statusEmail = document.querySelector("#status-email");
const tickIconEmail = document.querySelector(".form-group__tick-icon__email");

function getEmailError(value) {
  const trimmed = value.trim();

  if (trimmed === "") {
    return "Enter your email";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    return "Enter a valid email, like you@example.com";
  }

  return null;
}

inputEmail.addEventListener("input", () => {
  const error = getEmailError(inputEmail.value);
  updateFieldUI(inputEmail, emailHint, statusEmail, alertIconEmail, error, defaultCallsignHintEmail, tickIconEmail);
});

// ==========================================
// 6. ВАЛИДАЦИЯ CONFIRM INPUT
// ==========================================

const inputConfirm = document.querySelector("#password-confirm");
const statusConfirm = document.querySelector("#status-confirm");
const confirmHint = document.querySelector(".form-group__password-input .form-group__hint");
const confirmAlertIcon = document.querySelector(".form-group__alert-icon");

inputConfirm.addEventListener("input", () => {
  const error = getConfirmPasswordError(inputConfirm.value, passwordInput.value);
  updateFieldUI(inputConfirm, confirmHint, statusConfirm, confirmAlertIcon, error, "", null);
});

// ==========================================
// 7. НАСТРОЙКА CHECKBOX
// ==========================================

const statusTerms = document.querySelector("#status-terms");
const inputTerms = document.querySelector("#terms");

inputTerms.addEventListener("change", () => {
  if (inputTerms.checked) {
    statusTerms.textContent = "OK";
  } else {
    statusTerms.textContent = "REQUIRED";
  }
});

// ==========================================
// 8. ФУНКЦИЯ COUNT ДЛЯ ПОДСЧЕТА СТАТУСОВ
// ==========================================

