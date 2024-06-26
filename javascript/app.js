// ahhhhh so many lines to maintain

// All id confirmed
const buttons = document.querySelectorAll(".myButton");
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

// setting values
let totalValue = 0;
let anotherDivValue = 40;
let anotherDivValue2 = 0;
let selectedButtonsCount = 0;
let selectedSeats = [];
let couponApplied = false;

// btn add event
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const buttonName = this.textContent;

    if (this.classList.contains("bg-[#1DD100]")) {
      selectedSeats = selectedSeats.filter((seat) => seat.name !== buttonName);
      this.classList.remove("bg-[#1DD100]");
      totalValue -= 550;
      selectedButtonsCount--;
    } else if (totalValue < 2000 && selectedButtonsCount < 4) {
      selectedSeats.push({
        name: buttonName,
        type: "Economy",
        price: 550,
      });
      this.classList.add("bg-[#1DD100]");
      totalValue += 550;
      selectedButtonsCount++;
    } else {
      alert("Plese dont buy more than 4 seats");
    }

    updateSeatInfo();
    updateAnotherDiv();
    updateAnotherDiv2();
  });
});

applyCouponBtn.addEventListener("click", function () {
  const couponCode = couponCodeInput.value;

  if (
    couponCode === "Couple 20" &&
    selectedButtonsCount === 4 &&
    !couponApplied
  ) {
    applyCoupon(0.2);
    couponApplied = true;
  } else if (
    couponCode === "NEW15" &&
    selectedButtonsCount === 4 &&
    !couponApplied
  ) {
    applyCoupon(0.15);
    couponApplied = true;
  } else {
    alert("Invalid coupon code or not enough seats selected , please write them carefully");
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
  totalPriceElement.textContent = totalPrice;
}
updateTotalPrice();
// Function to apply coupon discounts
function applyCoupon(discountRate) {
  const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
  const discountedPrice = totalPrice * (1 - discountRate);

  totalPriceElement.textContent = discountedPrice;
  grandTotalPriceElement.textContent = discountedPrice;
}

// apply coupon funtion
function applyCoupon(discountRate) {
  const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
  const discountedPrice = totalPrice * (1 - discountRate);

  totalPriceElement.textContent = totalPrice;
  grandTotalPriceElement.textContent = discountedPrice;

  if (
    (couponCodeInput.value === "Couple 20" && discountRate === 0.2) ||
    (couponCodeInput.value === "NEW15" && discountRate === 0.15)
  ) {
    console.log("Correct coupon applied.");
    couponCodeInput.classList.add("hidden");
    couponDisplay.classList.add("hidden");

    // discounted price and append
    const totalPrice = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
    const discountedPrice = totalPrice * (1 - discountRate);

    const discountParagraph = document.createElement("p");
    discountParagraph.textContent = `Your total discount is ${
      totalPrice - discountedPrice
    } tk`;
    discountParagraph.classList.add("text-[#03071299]", "text-[20px]");

    const discountPriceDiv = document.getElementById("discountPrice");

    discountPriceDiv.appendChild(discountParagraph);
  } else {
    console.log("Invalid coupon , please use the right coupon");
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
