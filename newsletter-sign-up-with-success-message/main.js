const heroModal = document.getElementById("hero-modal");
const successModal = document.getElementById("success-modal");
const emailForm = document.getElementById("email-form");
const dismissBtn = document.getElementById("dismiss-btn");
const errorText = document.getElementById("error-text");

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function clearErrorMessage(){
  emailForm.email.classList.remove('border-[#ff6257]')
  emailForm.email.classList.remove('text-[#ff6257]')
  emailForm.email.classList.remove('bg-[#ffc5c1]');
  emailForm.email.classList.add('bg-white');
  emailForm.email.classList.add('bg-[#242742]');
  errorText.classList.add('hidden')
};

document.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailForm.email.value;
  if (isValidEmail(email)) {
    heroModal.classList.add("hidden");
    successModal.classList.remove("hidden");
  } else {
    emailForm.email.classList.remove('bg-[#242742]')
    // emailForm.email.classList.remove('text-white')
    emailForm.email.classList.add('bg-[#ffc5c1]')
    emailForm.email.classList.add('border-[#ff6257]')
    emailForm.email.classList.add('text-[#ff6257]')
    errorText.classList.remove('hidden')
    setTimeout(clearErrorMessage, 2500)
  }
});

document.addEventListener("click", () => {
  successModal.classList.add("hidden");
  heroModal.classList.remove("hidden");
});
