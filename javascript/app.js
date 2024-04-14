console.log("connected");
const buttons = document.querySelectorAll(".myButton");
const totalSection = document.getElementById("totalSection");
const anotherDiv = document.getElementById("remainingSeat");
let totalValue = 0;
let anotherDivValue = 40;
let selectedButtonsCount = 0;

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    if (this.classList.contains("bg-[#1DD100]")) {
      this.classList.remove("bg-[#1DD100]");
      totalValue -= 50;
      selectedButtonsCount--;
    } else if (totalValue < 200 && selectedButtonsCount < 4) {
      this.classList.add("bg-[#1DD100]");
      totalValue += 50;
      selectedButtonsCount++;
    }
    // updateTotalSection();
    updateAnotherDiv();
  });
});

// function updateTotalSection() {
//   totalSection.textContent = "Total: $" + totalValue;
// }

function updateAnotherDiv() {
  anotherDivValue = 40 - selectedButtonsCount;
  anotherDiv.textContent = anotherDivValue;
}
