import getWeatherData from "./weather";
import getTimeAndDate from "./timeanddate";

window.onload = () => {
  getWeatherData();
  setInterval(getWeatherData, 1000 * 60 * 15);
  getTimeAndDate();
  setInterval(getTimeAndDate, 1000);
};

// * * * B O O K I N G    B O X * * *

// FOUR CARDS HANDLERS:
const departure = document.querySelector(".departure");
const destination = document.querySelector(".destination");
const date = document.querySelector(".date");
const passenger = document.querySelector(".passenger");
// SIX BUTTONS HANDLERS:
const nextButtonDeparture = document.getElementById("next-in-departure");
const backButtonDestination = document.getElementById("back-in-destination");
const nextButtonDestination = document.getElementById("next-in-destination");
const backButtonDate = document.getElementById("back-in-date");
const nextButtonDate = document.getElementById("next-in-date");
const backButtonPassenger = document.getElementById("back-in-passenger");
// <SELECT> AND <INPUT> TAGS:
const departureSelect = document.getElementById("departure-select");
departureSelect.addEventListener("change", () => {
  nextButtonDeparture.classList.add("active");
});
const destinationSelect = document.getElementById("destination-select");
destinationSelect.addEventListener("change", () => {
  nextButtonDestination.classList.add("active");
});
const returningDateSelect = document.getElementById("returning-date-select");
returningDateSelect.addEventListener("change", () => {
  nextButtonDate.classList.add("active");
});
// SIX BUTTONS ACTIONS
nextButtonDeparture.addEventListener("click", () => {
  departure.classList.remove("active");
  destination.classList.add("active");

  nextButtonDeparture.classList.remove("active");
  backButtonDestination.classList.add("active");
});

backButtonDestination.addEventListener("click", () => {
  departure.classList.add("active");
  destination.classList.remove("active");

  nextButtonDeparture.classList.add("active");
  backButtonDestination.classList.remove("active");
  nextButtonDestination.classList.remove("active");
});

nextButtonDestination.addEventListener("click", () => {
  destination.classList.remove("active");
  date.classList.add("active");

  backButtonDestination.classList.remove("active");
  nextButtonDestination.classList.remove("active");
  backButtonDate.classList.add("active");
});
backButtonDate.addEventListener("click", () => {
  date.classList.remove("active");
  destination.classList.add("active");

  backButtonDate.classList.remove("active");
  nextButtonDate.classList.remove("active");
  backButtonDestination.classList.add("active");
  nextButtonDestination.classList.add("active");
});
nextButtonDate.addEventListener("click", () => {
  date.classList.remove("active");
  passenger.classList.add("active");

  backButtonDate.classList.remove("active");
  nextButtonDate.classList.remove("active");
  backButtonPassenger.classList.add("active");
});
backButtonPassenger.addEventListener("click", () => {
  passenger.classList.remove("active");
  date.classList.add("active");

  backButtonPassenger.classList.remove("active");
  backButtonDate.classList.add("active");
  nextButtonDate.classList.add("active");
});

// * * * D E S T I N A T I O N S    A I R P O R T S * * *

let departureResult;
let destinationResult;
fetch(
  "https://raw.githubusercontent.com/jamie80/endpoints/main/airportsData.json"
)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function (data) {
    const airportsData = data.airportsData;
    // * * * * * * * N A I V E   S O R T I N G * * * * * * *

    // let count = 0;

    function sortByCity(airportsData) {
      return airportsData.slice().sort((a, b) => {
        // count += 1;
        return a.city.localeCompare(b.city);
      });
    }

    const airportsSortedByCity = sortByCity(airportsData);
    // console.log(airportsSortedByCity);
    // console.log(airportsData);
    // console.log(count);

    airportsSortedByCity.forEach((element) => {
      const city = document.createElement("option");
      city.innerHTML = `${element.city}`;
      city.setAttribute("value", element.city);
      document.getElementById("destination-select").appendChild(city);
    });
  });

// * * * departureResult
const departureSelectElement = document.getElementById("departure-select");
departureSelectElement.addEventListener("change", (event) => {
  departureResult = event.target.value;
  console.log(departureResult);
});
// * * * destinationResult
const destinationSelectElement = document.getElementById("destination-select");
destinationSelectElement.addEventListener("change", (event) => {
  destinationResult = event.target.value;
  console.log(destinationResult);
  // !!!

  // N B P    A P I
  let currencyEuroRating;
  fetch("http://api.nbp.pl/api/exchangerates/rates/a/eur/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.rates[0].mid);
      currencyEuroRating = data.rates[0].mid;

      // * * * T I M E & P R I C E    AND    B A G    AND    S E A T * * *
      let flightDetails;

      fetch(
        "https://raw.githubusercontent.com/jamie80/endpoints/main/airportsData.json"
      )
        .then((respond) => respond.json())
        .then((data) => {
          referrerPolicy: "unsafe_url";
          flightDetails = data.airportsData;
          console.log(flightDetails);

          flightDetails.forEach((element) => {
            if (destinationResult == element.city) {
              // *** P R I C E ***
              console.log("Price printed");
              document.getElementById("price-select").innerHTML = "";
              // please choose one option
              const pleaseChooseOneOptionPrice =
                document.createElement("option");
              pleaseChooseOneOptionPrice.innerHTML =
                "--Please choose an option--";
              pleaseChooseOneOptionPrice.setAttribute("value", "");
              document
                .getElementById("price-select")
                .appendChild(pleaseChooseOneOptionPrice);
              // morningTime
              const morningTimeDetails = document.createElement("option");
              morningTimeDetails.innerHTML = `Time: ${
                element.morningTime
              } --- PLN ${element.morningPrice} (EUR ${(
                element.morningPrice / currencyEuroRating
              ).toFixed(2)})`;
              morningTimeDetails.setAttribute("value", element.morningPrice);
              document
                .getElementById("price-select")
                .appendChild(morningTimeDetails);
              // afternoonTime
              const afternoonTimeDetails = document.createElement("option");
              afternoonTimeDetails.innerHTML = `Time: ${
                element.afternoonTime
              } --- PLN ${element.afternoonPrice} (EUR ${(
                element.afternoonPrice / currencyEuroRating
              ).toFixed(2)})`;
              afternoonTimeDetails.setAttribute(
                "value",
                element.afternoonPrice
              );
              document
                .getElementById("price-select")
                .appendChild(afternoonTimeDetails);
              // eveningTime
              const eveningTimeDetails = document.createElement("option");
              eveningTimeDetails.innerHTML = `Time: ${
                element.eveningTime
              } --- PLN ${element.eveningPrice} (EUR ${(
                element.eveningPrice / currencyEuroRating
              ).toFixed(2)})`;
              eveningTimeDetails.setAttribute("value", element.eveningPrice);
              document
                .getElementById("price-select")
                .appendChild(eveningTimeDetails);
              // *** B A G ***
              console.log("Bag printed");
              document.getElementById("bag-select").innerHTML = "";
              // please choose one option
              const pleaseChooseOneOptionBag = document.createElement("option");
              pleaseChooseOneOptionBag.innerHTML =
                "--Please choose an option--";
              pleaseChooseOneOptionBag.setAttribute("value", "");
              document
                .getElementById("bag-select")
                .appendChild(pleaseChooseOneOptionBag);
              // smallBag
              const smallBagDetails = document.createElement("option");
              smallBagDetails.innerHTML = `Small Bag --- PLN ${
                element.smallBag
              } (EUR ${(element.smallBag / currencyEuroRating).toFixed(2)})`;
              smallBagDetails.setAttribute("value", element.smallBag);
              document
                .getElementById("bag-select")
                .appendChild(smallBagDetails);
              // cabinBag
              const cabinBagDetails = document.createElement("option");
              cabinBagDetails.innerHTML = `Cabin Bag --- PLN ${
                element.cabinBag
              } (EUR ${(element.cabinBag / currencyEuroRating).toFixed(2)})`;
              cabinBagDetails.setAttribute("value", element.cabinBag);
              document
                .getElementById("bag-select")
                .appendChild(cabinBagDetails);
              // checkinBag
              const checkinBagDetails = document.createElement("option");
              checkinBagDetails.innerHTML = `Checkin Bag --- PLN ${
                element.checkinBag
              } (EUR ${(element.checkinBag / currencyEuroRating).toFixed(2)})`;
              checkinBagDetails.setAttribute("value", element.checkinBag);
              document
                .getElementById("bag-select")
                .appendChild(checkinBagDetails);
              // *** S E A T ***
              console.log("Seat printed");
              document.getElementById("seat-select").innerHTML = "";
              // please choose one option
              const pleaseChooseOneOptionSeat =
                document.createElement("option");
              pleaseChooseOneOptionSeat.innerHTML =
                "--Please choose an option--";
              pleaseChooseOneOptionSeat.setAttribute("value", "");
              document
                .getElementById("seat-select")
                .appendChild(pleaseChooseOneOptionSeat);
              // standardSeat
              const standardSeatDetails = document.createElement("option");
              standardSeatDetails.innerHTML = `Standard Seat --- PLN ${
                element.standardSeat
              } (EUR ${(element.standardSeat / currencyEuroRating).toFixed(
                2
              )})`;
              standardSeatDetails.setAttribute("value", element.standardSeat);
              document
                .getElementById("seat-select")
                .appendChild(standardSeatDetails);
              // frontSeat
              const frontSeatDetails = document.createElement("option");
              frontSeatDetails.innerHTML = `Front Seat --- PLN ${
                element.frontSeat
              } (EUR ${(element.frontSeat / currencyEuroRating).toFixed(2)})`;
              frontSeatDetails.setAttribute("value", element.frontSeat);
              document
                .getElementById("seat-select")
                .appendChild(frontSeatDetails);
              // extraLegroomSeat
              const extraLegroomSeatDetails = document.createElement("option");
              extraLegroomSeatDetails.innerHTML = `Extra Legroom Seat --- PLN ${
                element.extraLegroomSeat
              } (EUR ${(element.extraLegroomSeat / currencyEuroRating).toFixed(
                2
              )})`;
              extraLegroomSeatDetails.setAttribute(
                "value",
                element.extraLegroomSeat
              );
              document
                .getElementById("seat-select")
                .appendChild(extraLegroomSeatDetails);
            }
          });
        });
    });
  // !!!
});

// * * * D A T E S * * *
let startTrip;
let leavingResult;
let returningResult;

startTrip = new Date().toLocaleDateString("en-CA");
console.log(startTrip);
const leavingDateAttribute = document.getElementById("leaving-date-select");
leavingDateAttribute.min = startTrip;

const leavingDateSelectElement = document.getElementById("leaving-date-select");
const returningDateSelectElement = document.getElementById(
  "returning-date-select"
);

returningDateSelectElement.setAttribute("disabled", true);
leavingDateSelectElement.addEventListener("change", (event) => {
  returningDateSelectElement.removeAttribute("disabled");
  leavingResult = event.target.value;
  console.log(leavingResult);
  returningDateSelectElement.setAttribute("min", leavingResult);
});

returningDateSelectElement.addEventListener("change", (event) => {
  returningResult = event.target.value;
  console.log(returningResult);
});

// * * * P A S S E N G E R S * * *
let adultResult;
let childrenResult;

const adultPassengersSelectElement = document.getElementById(
  "adult-passengers-select"
);
adultPassengersSelectElement.addEventListener("change", (event) => {
  adultResult = event.target.value;
  console.log(adultResult);
});

const childrenPassengersSelectElement = document.getElementById(
  "children-passengers-select"
);
childrenPassengersSelectElement.addEventListener("change", (event) => {
  childrenResult = event.target.value;
  console.log(childrenResult);
});

/* * * * P O P    U P * * * */
let loginFlag = false;
console.log(loginFlag);
document.querySelector("#log-in").addEventListener("click", function () {
  if (loginFlag === false) {
    document.querySelector(".popup").classList.add("active-popup");
  } else if (loginFlag === true) {
    document.getElementById("additional-box").classList.add("show");
    document.getElementById("error").classList.remove("show");

    document.getElementById("confirmation-departure").value = departureResult;
    document.getElementById("confirmation-destination").value =
      destinationResult;
    document.getElementById("confirmation-departing-date").value =
      leavingResult;
    document.getElementById("confirmation-returning-date").value =
      returningResult;
    document.getElementById("confirmation-adult").value = adultResult;
    document.getElementById("confirmation-children").value = childrenResult;
  }
});

document
  .querySelector(".popup .close-btn")
  .addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active-popup");
  });

// * * * L O G I N S * * *
const email = document.getElementById("email");
const password = document.getElementById("password");
const signInBtn = document.getElementById("sign-in");

fetch(
  "https://raw.githubusercontent.com/jamie80/endpoints/main/loginsData.json"
)
  .then((resp) => resp.json()) // Transform the data into json
  .then(function (data) {
    const loginsData = data.loginsData;

    signInBtn.addEventListener("click", () => {
      // console.log(email.value);
      // console.log(password.value);
      let obj = "";
      obj = loginsData.find(
        (o) => o.email === email.value && o.password === password.value
      );
      // console.log(obj);
      if (obj) {
        alert("You have successfully logged in.");
        document.getElementById("popup").classList.remove("active-popup");
        loginFlag = true;
        // * * * C O N F I R M A T I O N * * *
        document.getElementById("additional-box").classList.add("show");

        document.getElementById("confirmation-departure").value =
          departureResult;
        document.getElementById("confirmation-destination").value =
          destinationResult;
        document.getElementById("confirmation-departing-date").value =
          leavingResult;
        document.getElementById("confirmation-returning-date").value =
          returningResult;
        document.getElementById("confirmation-adult").value = adultResult;
        document.getElementById("confirmation-children").value = childrenResult;
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "smooth",
        });
        // console.log("Jesteś zalogowany");
      } else {
        alert("The email address or password is incorrect. Please try again.");
        // console.log("Nie powiodło się!");
      }
      // console.log(loginsData[0].email);
    });
  });

// * * * C O N F I R M A T I O N   B T N * * *
const bookingBox = document.getElementById("booking-box");
const bookingBox2 = document.getElementById("booking-box2");
const confirmationButton = document.getElementById("confirmation-btn");
confirmationButton.addEventListener("click", () => {
  if (
    adultResult === undefined ||
    adultResult === "" ||
    adultResult == 0 ||
    childrenResult === undefined ||
    childrenResult === ""
  ) {
    document.getElementById("error").classList.add("show");
  } else {
    // window.scrollTo({ top: 0, behavior: "smooth" });
    document.getElementById("error").classList.remove("show");
    document.getElementById("additional-box").classList.remove("show");
    bookingBox.classList.add("hide-display");
    bookingBox2.classList.remove("hide-display");
    bookingBox2.classList.add("show-display");
  }
});

// * * * B O O K I N G    B O X    2   NAVIGATION * * *

// FOUR CARDS HANDLERS:
const price = document.querySelector(".price");
const bag = document.querySelector(".bag");
const seat = document.querySelector(".seat");
const summary = document.querySelector(".summary");
// SIX BUTTONS HANDLERS:
const nextButtonPrice = document.getElementById("next-in-price");
const backButtonBag = document.getElementById("back-in-bag");
const nextButtonBag = document.getElementById("next-in-bag");
const backButtonSeat = document.getElementById("back-in-seat");
const nextButtonSeat = document.getElementById("next-in-seat");
const backButtonSummary = document.getElementById("back-in-summary");
// VALUES:
let flyTimeItem;
let bagItem;
let seatItem;
// <SELECT> AND <INPUT> TAGS:
const priceSelect = document.getElementById("price-select");
priceSelect.addEventListener("change", (event) => {
  flyTimeItem = event.target.value;
  console.log(flyTimeItem);
  nextButtonPrice.classList.add("active");
});

const bagSelect = document.getElementById("bag-select");
bagSelect.addEventListener("change", (event) => {
  bagItem = event.target.value;
  console.log(bagItem);
  nextButtonBag.classList.add("active");
});

const seatSelect = document.getElementById("seat-select");
seatSelect.addEventListener("change", (event) => {
  seatItem = event.target.value;
  console.log(seatItem);
  nextButtonSeat.classList.add("active");

  fetch("http://api.nbp.pl/api/exchangerates/rates/a/eur/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.rates[0].mid);
      const currencyEuroRating2 = data.rates[0].mid;

      // * * * S U M M A R Y * * *
      console.log("Summery printed");
      document.getElementById("summary-result").innerHTML = "";

      const priceParagraph = document.createElement("p");
      priceParagraph.innerHTML = `Ticket price: PLN ${flyTimeItem} --- (EUR ${(
        flyTimeItem / currencyEuroRating2
      ).toFixed(2)})`;
      document.getElementById("summary-result").appendChild(priceParagraph);

      const bagParagraph = document.createElement("p");
      bagParagraph.innerHTML = `Bag price: PLN ${bagItem} --- (EUR ${(
        bagItem / currencyEuroRating2
      ).toFixed(2)})`;
      document.getElementById("summary-result").appendChild(bagParagraph);

      const seatParagraph = document.createElement("p");
      seatParagraph.innerHTML = `Seat price: PLN ${seatItem} --- (EUR ${(
        seatItem / currencyEuroRating2
      ).toFixed(2)})`;
      document.getElementById("summary-result").appendChild(seatParagraph);

      const horizontalLine = document.createElement("hr");
      document.getElementById("summary-result").appendChild(horizontalLine);

      const totalParagraph = document.createElement("p");
      totalParagraph.innerHTML = `Total price: PLN ${(
        Number(seatItem) +
        Number(bagItem) +
        Number(flyTimeItem)
      ).toFixed(2)} --- (EUR ${(
        (Number(seatItem) + Number(bagItem) + Number(flyTimeItem)) /
        currencyEuroRating2
      ).toFixed(2)})`;
      document.getElementById("summary-result").appendChild(totalParagraph);
    });
});
// SIX BUTTONS ACTIONS
nextButtonPrice.addEventListener("click", () => {
  price.classList.remove("active");
  bag.classList.add("active");

  nextButtonPrice.classList.remove("active");
  backButtonBag.classList.add("active");
});

backButtonBag.addEventListener("click", () => {
  price.classList.add("active");
  bag.classList.remove("active");

  nextButtonPrice.classList.add("active");
  backButtonBag.classList.remove("active");
  nextButtonBag.classList.remove("active");
});

nextButtonBag.addEventListener("click", () => {
  bag.classList.remove("active");
  seat.classList.add("active");

  backButtonBag.classList.remove("active");
  nextButtonBag.classList.remove("active");
  backButtonSeat.classList.add("active");
});

backButtonSeat.addEventListener("click", () => {
  seat.classList.remove("active");
  bag.classList.add("active");

  backButtonSeat.classList.remove("active");
  nextButtonSeat.classList.remove("active");
  backButtonBag.classList.add("active");
  nextButtonBag.classList.add("active");
});

nextButtonSeat.addEventListener("click", () => {
  seat.classList.remove("active");
  summary.classList.add("active");

  backButtonSeat.classList.remove("active");
  nextButtonSeat.classList.remove("active");
  backButtonSummary.classList.add("active");
});

backButtonSummary.addEventListener("click", () => {
  summary.classList.remove("active");
  seat.classList.add("active");

  backButtonSummary.classList.remove("active");
  backButtonSeat.classList.add("active");
  nextButtonSeat.classList.add("active");
});
