let validity = true;

const clearBtn = document.getElementById("clear-btn");
const mortgageForm = document.getElementById("mortgage-form");
const radioContainer = document.querySelector(".radio-container");
const previewModal = document.getElementById("preview-modal");
const resultModal = document.getElementById("result-modal");
const monthlyPaymentBox = document.getElementById("monthly-payment-box");
const totalPaymentBox = document.getElementById("total-payment-box");

document.querySelectorAll('input[type="text"]').forEach((input) => {
  input.addEventListener("input", function () {
    validateInput(this);
  });
});

function validateInput(input) {
  const value = input.value.trim();
  const parentInput = input.closest(`.input-container`);
  parentInput.classList.remove("error");
  parentInput.classList.remove("invalid");
  if (!value) {
    parentInput.classList.add("error");
    validity = false;
  } else if (!Number(value)) {
    validity = false;
    parentInput.classList.add("invalid");
  }

  value
    ? (validity = true)
    : validity == false
    ? (validity = false)
    : (validity = true);
}

function renderResults() {
  if (validity) {
    resultModal.classList.remove("hidden");
    previewModal.classList.add("hidden");

    ma = Number(mortgageForm.mortgageAmount.value);
    mt = Number(mortgageForm.mortgageTerm.value);
    mi = Number(mortgageForm.mortgageInterest.value);

    totalPayment = (ma * mt * mi) / 100 + ma;
    monthlyPayment = totalPayment / (mt * 12);

    monthlyPaymentBox.textContent = monthlyPayment.toFixed(2);
    totalPaymentBox.textContent = totalPayment.toFixed(2);

    if (ma == 0 || mt == 0 || mi == 0){
      resultModal.classList.add("hidden");
      previewModal.classList.remove("hidden");
    } else {
        resultModal.classList.remove("hidden");
  previewModal.classList.add("hidden");
    }
  }
}

mortgageForm.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelectorAll('input[type="number"]').forEach((input) => {
    validateInput(input);
  });
  const radioInput = document.querySelector(
    'input[name="mortgageType"]:checked'
  );
  if (!radioInput) {
    radioContainer.classList.add("error");
    validity = false
  } else {
    radioContainer.classList.remove("error");
    validity == false ? (validity = false) : (validity = true);
  }

  renderResults();
});

clearBtn.addEventListener("click", () => {
  resultModal.classList.add("hidden");
  previewModal.classList.remove("hidden");
});
