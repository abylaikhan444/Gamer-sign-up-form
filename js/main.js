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

passwordInput.addEventListener("input", () => {
  const score = calculateStrengthPassword(passwordInput.value);
  passwordBarList.forEach((bar, index) => {
    bar.classList.toggle("password-strength__bar--active", index < score);
  });
});

// ==========================================
// 4. ВАЛИДАЦИЯ NAME INPUT
// ==========================================
function updateFieldUI(input, hint, status, icon, error, defaultHint) {
  if (error === null) {
    // 🟢 ВСЁ ХОРОШО:
    status.textContent = "OK";
    status.classList.add("status-list__value--ok");

    hint.textContent = defaultHint;
    hint.classList.remove("form-group__paragraph--error");

    input.classList.remove("form-group__input--error");
    if (icon) icon.style.display = "none";
  } else {
    // 🔴 ОШИБКА:
    status.textContent = "PENDING";
    status.classList.remove("status-list__value--ok");

    hint.textContent = error;
    hint.classList.add("form-group__paragraph--error");

    input.classList.add("form-group__input--error");
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

inputName.addEventListener("input", () => {
  const error = getCallsignError(inputName.value);
  updateFieldUI(inputName, callsignHint, statusCallsign, alertIconCallsign, error, defaultCallsignHint);
});

// ==========================================
// 5. ВАЛИДАЦИЯ EMAIL INPUT
// ==========================================

const inputEmail = document.querySelector("#email");
const defaultCallsignHintEmail = "Enter your email";
const emailHint = 

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
  updateFieldUI(inputEmail, emailHint, statusEmail, alertIconEmail, error, defaultCallsignHintEmail);
});
