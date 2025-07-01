let loadedData = [];
let currentPeriod = "daily";
const bgColors = [
  "#ff8c66",
  "#56c2e6",
  "#ff5c7c",
  "#4acf81",
  "#7536d3",
  "#f1c65b",
];

const reportBox = document.querySelector(".report-box");
const timeFramesBtns = document.querySelectorAll(".time-frame-btn");

document.addEventListener("DOMContentLoaded", async () => {
  loadedData = await fetch("data.json").then((response) => response.json());
  renderData();
});

function renderData() {
  reportBox.innerHTML = "";
  loadedData.forEach((data, index) => {
    const newDiv = document.createElement("div");
    newDiv.classList.add(
      "rounded-2xl",
      "relative",
      "h-[12.9rem]",
      `bg-[${bgColors[index]}]`,
      "flex",
      "items-end",
      "overflow-hidden"
    );
    newDiv.innerHTML = `
          <img src="images/icon-${data.title
            .toLowerCase()
            .split(" ")
            .join("-")}.svg" class="absolute right-4 -top-1 z-1">
          <div class="bg-[#1c1f4a] rounded-2xl p-5 relative w-full z-2">
            <div class="flex items-center justify-between text-white">
              <p>${data.title}</p>
              <img src="images/icon-ellipsis.svg" alt="icon-ellipsis" class="">
            </div>
            <h1 class="text-4xl text-white mt-3 mb-1">
              ${data["timeframes"][currentPeriod]["current"]}hrs
            </h1>
            <p>
              ${
                currentPeriod == "daily"
                  ? "yesterday"
                  : currentPeriod == "weekly"
                  ? "Last Week"
                  : "Last Month"
              } - ${data["timeframes"][currentPeriod]["previous"]}hrs
            </p>
          </div>
        `;
    reportBox.appendChild(newDiv);
  });
}

timeFramesBtns.forEach((timeFramesBtn) => {
  timeFramesBtn.addEventListener("click", function () {
    timeFramesBtns.forEach((tfBtn) => {
      tfBtn.classList.remove("text-white");
    });
    this.classList.add("text-white");
    currentPeriod = this.dataset.timeFrame;
    renderData();
  });
});
