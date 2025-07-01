let currentNum = "";
let previousNum = "";
const numBtns = document.querySelectorAll(".num-btn");
const evalBtn = document.getElementById("eval-btn");
const delBtn = document.getElementById("del-btn");
const resetBtn = document.getElementById("reset-btn");
const displayInput = document.getElementById("display-input");
const themeToggles = document.querySelectorAll(".theme-toggle");
const body = document.querySelector("body");
themeToggles.forEach((themeToggle) => {
  themeToggle.addEventListener("change", function () {
    themeToggles.forEach((themeTog) => {
      const theme = themeTog.dataset.theme;
      body.classList.remove(`${theme}-theme`);

      if (themeToggle.checked) {
        body.classList.add(`${this.dataset.theme}-theme`);
      }
    });
  });
});

function updateUI() {
  displayInput.value = currentNum;
}
numBtns.forEach((numBtn) => {
  numBtn.addEventListener("click", function () {
    currentNum += this.dataset.num;
    updateUI();
  });
});
delBtn.addEventListener("click", () => {
  currentNum = currentNum.toString().slice(0, -1);
  updateUI();
});
evalBtn.addEventListener("click", () => {
  !previousNum
    ? (currentNum = Number(previousNum) + eval(currentNum))
    : (currentNum = eval(currentNum));
  updateUI();
});
resetBtn.addEventListener("click", () => {
  currentNum = "";
  previousNum = "";
  updateUI();
});
displayInput.addEventListener("input", () => {
  currentNum = displayInput.value;
});
displayInput.addEventListener("keydown", (e) => {
  if (
    !isNaN(e.key) ||
    e.key === "Backspace" ||
    e.key === "ArrowLeft" ||
    e.key === "ArrowRight" ||
    e.key === "+" ||
    e.key === "-" ||
    e.key === "/" ||
    e.key === "*" ||
    e.key === "."
  ) {
    return true;
  } else if (e.key === "Enter") {
    !previousNum
      ? (currentNum = Number(previousNum) + eval(currentNum))
      : (currentNum = eval(currentNum));
    updateUI();
  } else {
    e.preventDefault();
  }
});
