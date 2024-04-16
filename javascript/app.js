console.log("connected");
const buttons = document.querySelectorAll(".myButton");
// const totalSection = document.getElementById("totalSection");
const anotherDiv = document.getElementById("remainingSeat");
const anotherDiv2 = document.getElementById("seatSelected");
const seatName = document.getElementById("seatName");
const seatType = document.getElementById("seatType");
const seatPrice = document.getElementById("seatPrice");
const seatInfoContainer = document.getElementById("seatInfoContainer");
const totalPriceElement = document.getElementById("totalPrice");
const grandTotalPriceElement = document.getElementById("grandTotalPrice");
const applyCouponBtn = document.getElementById("applyCouponBtn");
const couponCodeInput = document.getElementById("couponCode");
const couponDisplay = document.getElementById("couponDisplay");

let totalValue = 0;
let anotherDivValue = 40;
let anotherDivValue2 = 0;
let selectedButtonsCount = 0;
let selectedSeats = [];
let couponApplied = false;

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

applyCouponBtn.addEventListener("click", function () {
  const couponCode = couponCodeInput.value;

  if (
    couponCode === "couple20" &&
    selectedButtonsCount === 4 &&
    !couponApplied
  ) {
    applyCoupon(0.2); // 20% discount
    couponApplied = true;
  } else if (
    couponCode === "new15" &&
    selectedButtonsCount === 4 &&
    !couponApplied
  ) {
    applyCoupon(0.15); // 15% discount
    couponApplied = true;
  } else {
    alert("Invalid coupon code or conditions not met.");
  }
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
<p class="text-[#03071299] text-[16px]">${seat.name}</p>
<p class="text-[#03071299] text-[16px]">${seat.type}</p>
<p class="text-[#03071299] text-[16px]">${seat.price}</p>
`;
    seatInfoContainer.appendChild(seatDiv);
  });

  // Calculate total price
  const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
  totalPriceElement.textContent = totalPrice;

  // Calculate grand total price
  grandTotalPriceElement.textContent = totalPrice;
}
// Function to update the total price without discounts
function updateTotalPrice() {
  const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
  totalPriceElement.textContent = totalPrice; // Update the total price element
}
updateTotalPrice();
// Function to apply coupon discounts
function applyCoupon(discountRate) {
  const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
  const discountedPrice = totalPrice * (1 - discountRate);

  totalPriceElement.textContent = discountedPrice; // Update the total price element with discounted price
  grandTotalPriceElement.textContent = discountedPrice; // Also update the grand total price
}

// Call updateTotalPrice initially to set the initial total price

function applyCoupon(discountRate) {
  const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
  const discountedPrice = totalPrice * (1 - discountRate);

  totalPriceElement.textContent = totalPrice;
  grandTotalPriceElement.textContent = discountedPrice;

  // Check if the correct coupon is applied
  if (
    (couponCodeInput.value === "couple20" && discountRate === 0.2) ||
    (couponCodeInput.value === "new15" && discountRate === 0.15)
  ) {
    console.log("Correct coupon applied.");
    couponCodeInput.classList.add("hidden"); // Add the 'hidden' class to hide the coupon code input
    couponDisplay.classList.add("hidden"); // Add the 'hidden' class to hide the coupon code input

    // Calculate the discounted price
    const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
    const discountedPrice = totalPrice * (1 - discountRate);

    // Create a paragraph element for displaying the discounted amount
    const discountParagraph = document.createElement("p");
    discountParagraph.textContent = `Your total discount is ${
      totalPrice - discountedPrice
    } tk`;
    discountParagraph.classList.add("text-[#03071299]" , "text-[20px]")

    // Get the div with the id "discountPrice"
    const discountPriceDiv = document.getElementById("discountPrice");

    // Append the discount paragraph inside the "discountPrice" div
    discountPriceDiv.appendChild(discountParagraph);
  } else {
    console.log("Invalid coupon or discount rate.");
  }
}
const phoneNumberInput = document.getElementById("phoneNumberInput");
const nextButton = document.getElementById("nextButton");

phoneNumberInput.addEventListener("input", function () {
  if (phoneNumberInput.value.trim() === "" || selectedButtonsCount === 0) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
});
