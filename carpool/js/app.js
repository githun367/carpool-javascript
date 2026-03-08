const form = document.querySelector("#ride-form");
const dateInput = document.querySelector("input[type='date']");
const fraSelect = document.querySelector("#fra");
const tilSelect = document.querySelector("#til");
const passagerRadio = document.querySelector("#passager");
const chaufforRadio = document.querySelector("#chauffør");
const summaryEl = document.querySelector("#summary");
const resultsEl = document.querySelector("#results");
const modal = document.querySelector("#tripModal");
const tripDetails = document.querySelector("#tripDetails");
const joinBtn = document.querySelector("#joinRide");
const closeModal = document.querySelector("#closeModal");

const state = {
    role: "",
    from: "",
    to: "",
    date: ""
};

let trips = [];
let selectedTrip = null;

function render() {
    renderSummary();
    renderTrips();
}

function renderSummary() {

    summaryEl.textContent =
        `${state.role} fra ${state.from} til ${state.to} den ${state.date}`;

}

function renderTrips() {

    resultsEl.innerHTML = "";

    const filteredTrips = trips.filter(trip =>
        trip.from === state.from && trip.to === state.to
    );

    if (filteredTrips.length === 0) {
        resultsEl.innerHTML = "<p>Ingen ture fundet</p>";
        return;
    }

    filteredTrips.forEach(trip => {

        const card = createTripCard(trip);

        resultsEl.appendChild(card);

    });
}

form.addEventListener("submit", (e) => {

    e.preventDefault();

    state.from = fraSelect.value;
    state.to = tilSelect.value;
    state.date = dateInput.value;

    console.log(state);

    render();

});

passagerRadio.addEventListener("change", () => {
    state.role = "Passager";
    renderSummary();
});

chaufforRadio.addEventListener("change", () => {
    state.role = "Chauffør";
    renderSummary();
});

joinBtn.addEventListener("click", () => {

    if (!selectedTrip) return;

    if (selectedTrip.seats > 0) {

        selectedTrip.seats--;

        renderTrips();

        tripDetails.innerHTML += "<br>Du har joined turen!";

        if (selectedTrip.seats === 0) {
            joinBtn.disabled = true;
            joinBtn.textContent = "FULL";
        }

    }

});

closeModal.addEventListener("click", () => {
    modal.style.display = "none";
});

function createTripCard(trip) {

    const card = document.createElement("div");

    card.className = "trip-card";

    card.innerHTML = `
        <h3>${trip.driver}</h3>
        <p>${trip.from} → ${trip.to}</p>
        <p>Tid: ${trip.time}</p>
        <p>Sæder: ${trip.seats}</p>
        <p>Pris: ${trip.price} kr</p>
    `;

    card.addEventListener("click", () => {
        openModal(trip);
    });

    return card;
}

function openModal(trip) {

    selectedTrip = trip;

    tripDetails.innerHTML = `
        Chauffør: ${trip.driver}<br>
        ${trip.from} → ${trip.to}<br>
        Tid: ${trip.time}<br>
        Pris: ${trip.price} kr<br>
        Sæder: ${trip.seats}
    `;

    joinBtn.disabled = false;
    joinBtn.textContent = "Join Ride";

    modal.style.display = "block";

}

function init() {

    trips = [
        { id: 1, from: "Hasle", to: "Gudhjem", time: "10:30", seats: 3, driver: "Maja", price: 50 },
        { id: 2, from: "Hasle", to: "Nexø", time: "12:15", seats: 1, driver: "Ali", price: 30 },
        { id: 3, from: "Gudhjem", to: "Nexø", time: "16:00", seats: 4, driver: "Sofie", price: 45 },
        { id: 4, from: "Nexø", to: "Hasle", time: "18:00", seats: 2, driver: "Jonas", price: 60 }
    ];

    renderSummary();

}

init();