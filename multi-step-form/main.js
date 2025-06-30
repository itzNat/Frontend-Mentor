const addOns = [
  {
    name: "Online Services",
    description: "Access to multiplayer games",
    perMo: 1,
  },
  {
    name: "Larger Storage",
    description: "Extra 1TB of cloud save",
    perMo: 2,
  },
  {
    name: "Customizable profile",
    description: "Custom theme on your profile",
    perMo: 2,
  },
];

const plans = [
  {
    name: "Arcade",
    perMo: 9,
  },
  {
    name: "Advanced",
    perMo: 12,
  },
  {
    name: "Pro",
    perMo: 15,
  },
];

let currentStep = 1;
let userPeriod = "month";
let selectedPeriod = "month";
let selectedAddOn = ""
let selectedPlan = ""
let userPlan = "";
let userPlanPrice = "";
let userAddOn = [];

const checkSwitch = document.getElementById("check-switch");

const multiForm = document.getElementById("multi-form");

const goBack = document.getElementById("go-back");
const nextStep = document.getElementById("next-step");
const confirmBtn = document.getElementById("confirm-btn");
const planBox = document.getElementById("plan-box");
const addOnsBox = document.getElementById("add-ons-box");
const finishingUpBox = document.getElementById("finishing-up-box");

const stepBtns = document.querySelectorAll(".step-btn");

checkSwitch.addEventListener("change", () => {
  checkSwitch.checked ? (userPeriod = "year") : (userPeriod = "month");
  updateUI();
  userAddOn = [];
});

function renderUI() {

  stepBtns.forEach(stepBtn => {
    currentStep == Number(stepBtn.dataset.stepNum) ? stepBtn.classList.add('active') : stepBtn.classList.remove('active')
  })

  currentStep <= 1
    ? goBack.classList.add("hidden")
    : goBack.classList.remove("hidden");
  currentStep == 4
    ? (nextStep.classList.add("hidden"), confirmBtn.classList.remove("hidden"))
    : (nextStep.classList.remove("hidden"), confirmBtn.classList.add("hidden"));
  currentStep == 5
    ? (nextStep.classList.add("hidden"),
      confirmBtn.classList.add("hidden"),
      goBack.classList.add("hidden"))
    : "";

  document
    .querySelectorAll(".step")
    .forEach((step) => step.classList.remove("active"));
  const currentStepElement = document.querySelector(
    `.step[data-step="${currentStep}"]`
  );
  currentStepElement ? currentStepElement.classList.add("active") : "";

}

function checkPersonalInfo(){
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = emailRegex.test(multiForm.userEmail.value);
  !isEmail ? multiForm.userEmail.value = '' : ''

  const telRegex = /^\+?(\d{1,3})?[-. ]?\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;
  const isTel = telRegex.test(multiForm.userTel.value);
  !isTel ? multiForm.userTel.value = '' : ''

  if (multiForm.userName.value && isEmail && isTel){
    return true;
  } else {
    currentStep = 1;
    errorPersonalInfo();
    return false;
  }
}

function errorPersonalInfo(){
  document.querySelectorAll('.personal-input').forEach(personalInput => {
    const parentElement = personalInput.closest('.input-box')
    personalInput.addEventListener('input', ()=>{
      personalInput.value ? parentElement.classList.remove('error') : parentElement.classList.add('error')
    })
    personalInput.value ? parentElement.classList.remove('error') : parentElement.classList.add('error')
  })
}

function renderPlan() {
  planBox.innerHTML = "";
  plans.forEach((plan) => {
    const newDiv = document.createElement("label"); // Use label instead of button
    newDiv.classList.add(
      "plan-label",
      "flex",
      "gap-4",
      "my-4",
      "p-3",
      "w-full",
      "md:w-1/3",
      "md:flex-col",
      "border-2",
      "rounded-md",
      "cursor-pointer",
      "hover:border-purple-500",
      "transition-colors",
      `${(selectedPlan == plan.name && selectedPeriod == userPeriod) ? 'selected' : 'unSelected'}`
  );

    // Add radio input and button content
    newDiv.innerHTML = `
  <input type="radio" name="plan" value="${
    plan.name
  }" class="hidden peer" data-price = "$${
      userPeriod == "month" ? plan.perMo + "/mo" : plan.perMo * 10 + "/yr"
    }">
  <div class="flex gap-4 md:flex-col md:items-start items-center rounded p-2 w-full">
    <img src="images/icon-${plan.name.toLowerCase()}.svg" alt="${
      plan.name
    }" class="w-10 md:mb-6">
    <div class="text-left">
      <p class="font-semibold">${plan.name}</p>
      <p>$${
        userPeriod == "month" ? plan.perMo + "/mo" : plan.perMo * 10 + "/yr"
      }</p>
      ${
        userPeriod == "year"
          ? "<p class='font-semibold text-sm'>2 months free</p>"
          : ""
      } 
    </div>
  </div>
`;
    planBox.appendChild(newDiv);

    // Add event listener to handle selection
    newDiv.addEventListener("click", function () {
      // Unselect all other plan buttons
      document.querySelectorAll(".plan-label").forEach((btn) => {
        btn.classList.remove("selected");
        btn.querySelector('input[type="radio"]').checked = false;
      });

      // Select this one
      const thisPlan = this.querySelector('input[type="radio"]');
      this.classList.add("selected");
      thisPlan.checked = true;
      selectedPlan = thisPlan.value;
      userPlanPrice = thisPlan.dataset.price;
      selectedPeriod = userPeriod;
    });
  });
}

function renderAddOn() {
  addOnsBox.innerHTML = "";
  addOns.forEach((addOn) => {
    const newDiv = document.createElement("div");
    // newDiv.classList.add('')
    newDiv.innerHTML = `
      <div class="add-on-content flex justify-between items-center my-4 p-4 border-2 rounded-md">
        <div class="flex items-center gap-4"> 
          <label class="add-on-label">
            <input type="checkbox" class="add-on-check hidden-checkbox" value="${
              addOn.name
            }" data-add-on-price="${
      userPeriod == "month" ? addOn.perMo + "/mo" : addOn.perMo * 10 + "/yr"
    }" ${
      userAddOn.some(
              (item) => item["name"] == addOn.name
            ) ? 'checked' : 'unchecked'
    }>
            <span class="checkmark"></span>
          </label>
          <div>
            <p class="font-semibold text-xl text-[#02295a]">${addOn.name}</p>
            <p>${addOn.description}</p>
          </div>
        </div>
        <p class="text-[#473dff]">+$${
          userPeriod == "month" ? addOn.perMo + "/mo" : addOn.perMo * 10 + "/yr"
        }
      </div>
    `;
    addOnsBox.appendChild(newDiv);

    document.querySelectorAll(".add-on-check").forEach((addOn) => {
      addOn.addEventListener("change", function () {
        document.querySelectorAll(".add-on-check").forEach((el) => {
          const parentAddOn = addOn.closest(".add-on-content");
          userAddOnObj = {
            name: addOn.value,
            price: addOn.dataset.addOnPrice,
          };
          if (addOn.checked == true) {
            parentAddOn.classList.add("active");
            const exists = userAddOn.some(
              (item) => item["name"] === userAddOnObj["name"]
            );

            if (!exists) {
              userAddOn.push(userAddOnObj);
            }
          } else {
            userAddOn = userAddOn.filter(
              (item) => item["name"] !== userAddOnObj["name"]
            );
            parentAddOn.classList.remove("active");
          }
        });
      });
    });
  });
}

function renderFinishingUp() {
  finishingUpBox.innerHTML = "";
  const newDiv = `
      <div>
        <div class="bg-[#f0f6ff] p-4">
          <p class="font-semibold">${selectedPlan}(${selectedPeriod})</p>
          <div class="flex justify-between">
            <button class="underline">Change</button>
            <p class="font-semibold ml-auto">+${userPlanPrice}</p>
          </div>
          <hr class="my-3">
          ${userAddOn.length >= 1 ? userAddOn
            .map(
              (addOn) =>
                `
                <div class="flex justify-between mb-3">
                  <p>${addOn.name}</p>
                  <p class="ml-auto">+$${addOn.price}</p>
                </div>
              `
            )
            .join(" ") : ''}
        </div>
        <div class="flex justify-between p-4 my-3">
          <p>Total(per ${userPeriod})</p>
          <p class="text-[#473dff] text-xl font-semibold">
            +$${
              userAddOn.length >= 1 ? userAddOn.reduce((total, item) => {
                const totalPrice = parseFloat(item.price.split("/")[0]);
                const period = "/" + item.price.split("/");
                return (total += totalPrice);
              }, 0) +
              parseFloat(userPlanPrice.match(/\d+(\.\d+)?/)[0]) +
              "/" +
              userAddOn[0].price.split("/")[1] : parseFloat(userPlanPrice.match(/\d+(\.\d+)?/)[0]) +
              "/" +
              userPlanPrice.split("/")[1]
            }  
          </p>
  
        </div>
      </div>
    `;

  finishingUpBox.innerHTML = newDiv;
}

function updateUI() {
  !checkPersonalInfo() ? currentStep = 1 : !selectedPlan ? currentStep = 2 : ''
  renderUI()
  renderPlan();
  renderAddOn();
  renderFinishingUp();
}

multiForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

stepBtns.forEach((stepBtn) => {
  stepBtn.addEventListener("click", () => {
    currentStep = Number(stepBtn.dataset.stepNum);
    // stepBtns[currentStep-1].classList.add('selected')
    updateUI();
  });
});

confirmBtn.addEventListener("click", () => {
  currentStep++;
  updateUI();
});

nextStep.addEventListener("click", () => {
  checkPersonalInfo() ? currentStep++ : errorPersonalInfo();
  updateUI();
});

goBack.addEventListener("click", () => {
  currentStep--;
  updateUI();
});

renderUI()