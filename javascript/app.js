const buttons = document.querySelectorAll(".myButton");
const totalSection = document.getElementById("totalSection");
const anotherDiv = document.getElementById("remainingSeat");
const anotherDiv2 = document.getElementById("seatSelected");
const seatName = document.getElementById("seatName");
const seatType = document.getElementById("seatType");
const seatPrice = document.getElementById("seatPrice");
const seatInfoContainer = document.getElementById("seatInfoContainer");
const totalPriceElement = document.getElementById("totalPrice");
const grandTotalPriceElement = document.getElementById("grandTotalPrice");

let totalValue = 0;
let anotherDivValue = 40;
let anotherDivValue2 = 0;
let selectedButtonsCount = 0;
let selectedSeats = [];

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const buttonName = this.textContent;

    if (this.classList.contains("bg-[#1DD100]")) {
      // Remove seat from selected seats
      selectedSeats = selectedSeats.filter((seat) => seat.name !== buttonName);
      this.classList.remove("bg-[#1DD100]");
      totalValue -= 550;
      selectedButtonsCount--;
    } else if (totalValue < 2000 && selectedButtonsCount < 4) {
      // Check if less than 4 seats are already selected
      // Add seat to selected seats
      selectedSeats.push({
        name: buttonName,
        type: "Economy",
        price: 550, // Assuming each seat price is 550
      });
      this.classList.add("bg-[#1DD100]");
      totalValue += 550;
      selectedButtonsCount++;
    } else {
      alert("You can only select up to 4 seats.");
    }

    updateSeatInfo();
    updateAnotherDiv();
    updateAnotherDiv2();
  });
});

function updateAnotherDiv() {
  anotherDivValue = 40 - selectedButtonsCount;
  anotherDiv.textContent = anotherDivValue;
}

function updateAnotherDiv2() {
  anotherDivValue2 = selectedButtonsCount;
  anotherDiv2.textContent = anotherDivValue2;
}

function updateSeatInfo() {
  // Clear previous seat info
  seatInfoContainer.innerHTML = "";

  // Append seat info for each selected seat
  selectedSeats.forEach((seat) => {
    const seatDiv = document.createElement("div");
    seatDiv.classList = "flex justify-between";
    seatDiv.innerHTML = `
      <p>${seat.name}</p>
      <p>${seat.type}</p>
      <p>${seat.price}</p>
    `;
    seatInfoContainer.appendChild(seatDiv);
  });

  // Calculate total price
  const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
  totalPriceElement.textContent = totalPrice;

  // Calculate grand total price
  grandTotalPriceElement.textContent = totalPrice;
}
