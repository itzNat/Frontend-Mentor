const heroModal = document.getElementById("hero-modal");
const successModal = document.getElementById("success-modal");
const emailForm = document.getElementById("email-form");
const dismissBtn = document.getElementById("dismiss-btn");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function clearErrorMessage(){
  emailForm.classList.remove('error')
};

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailForm.email.value;
  if (isValidEmail(email)) {
    heroModal.classList.add("hidden");
    successModal.classList.remove("hidden");
  } else {
    emailForm.classList.add('error')
    setTimeout(clearErrorMessage, 2500)
  }
});

dismissBtn.addEventListener("click", () => {
  successModal.classList.add("hidden");
  heroModal.classList.remove("hidden");
});
