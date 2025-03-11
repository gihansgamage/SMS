document.addEventListener("DOMContentLoaded", function() {
    loadRegisteredSocieties();
    loadUpcomingEvents();
    loadFeaturedSocieties();
});

// Load Registered Societies
function loadRegisteredSocieties() {
    let societies = JSON.parse(localStorage.getItem("societies")) || [];
    const tableBody = document.getElementById("registeredSocietyTable");
    tableBody.innerHTML = "";

    societies.forEach(society => {
        let row = tableBody.insertRow();
        row.innerHTML = `
            <td>${society.societyName}</td>
            <td>${society.treasurerName}</td>
        `;
    });
}

// Load Upcoming Events
function loadUpcomingEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    const eventContainer = document.getElementById("eventList");
    eventContainer.innerHTML = "";

    events.forEach(event => {
        let eventCard = document.createElement("div");
        eventCard.classList.add("event-card");
        eventCard.innerHTML = `
            <img src="event-placeholder.jpg" alt="Event Image">
            <h3>${event.name}</h3>
            <p>${event.date}</p>
        `;
        eventContainer.appendChild(eventCard);
    });
}

// Load Featured Societies
function loadFeaturedSocieties() {
    let societies = JSON.parse(localStorage.getItem("societies")) || [];
    const featuredContainer = document.getElementById("featuredSocietyList");
    featuredContainer.innerHTML = "";

    let featured = societies.slice(0, 5);

    featured.forEach(society => {
        let societyCard = document.createElement("div");
        societyCard.classList.add("society-card");
        societyCard.innerHTML = `
            <h3>${society.societyName}</h3>
            <p>Senior Treasurer: ${society.treasurerName}</p>
        `;
        featuredContainer.appendChild(societyCard);
    });
}
