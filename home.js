document.addEventListener("DOMContentLoaded", function() {
    loadRegisteredSocieties();
    loadUpcomingEvents();
    loadFeaturedSocieties();
});


// Add this to the DOMContentLoaded event listener
document.addEventListener("DOMContentLoaded", function() {
    loadRegisteredSocieties();
    loadUpcomingEvents();
    loadFeaturedSocieties();
    // animateSocietyCount(); // Add this line
    setupScrollAnimation();
});


function setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (!entry.target.hasAnimated) {
                    animateSocietyCount();
                    entry.target.hasAnimated = true;
                }
            }
        });
    }, { threshold: 0.5 });

    const societyCountSection = document.getElementById('societyCount');
    observer.observe(societyCountSection);
}

// Update animateSocietyCount to reset counter if needed
function animateSocietyCount() {
    const counterElement = document.getElementById('societyCounter');
    const societies = JSON.parse(localStorage.getItem('societies')) || [];
    const targetNumber = societies.length;
    
    // Reset counter for animation
    counterElement.innerText = '0';
    
    // Rest of the animation code from previous answer
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    const easeOutQuad = t => t*(2-t);

    let frame = 0;
    const countTo = targetNumber;

    const counter = setInterval(() => {
        frame++;
        const progress = easeOutQuad(frame / totalFrames);
        const currentCount = Math.round(countTo * progress);

        if (parseInt(counterElement.innerText) !== currentCount) {
            counterElement.innerText = currentCount.toLocaleString();
        }

        if (frame === totalFrames) {
            clearInterval(counter);
        }
    }, frameDuration);
}


// Load Registered Societies
function loadRegisteredSocieties() {
    let societies = JSON.parse(localStorage.getItem("societies")) || [];
    const tableBody = document.getElementById("registeredSocietyTable");
    tableBody.innerHTML = "";

    societies.forEach(society => {
        let row = tableBody.insertRow();
        let websiteURL = `https://sites.google.com/view/${encodeURIComponent(society.societyName)}`;

        row.innerHTML = `
            <td>${society.societyName}</td>
            <td>${society.treasurerName}</td>
            <td>
                <button style= "background:white;" class="visit-button" onclick="window.open('${websiteURL}', '_blank', 'noopener,noreferrer')">
                    Visit Website
                </button>
            </td>
        `;
    });
}


// Load Upcoming Events
function loadUpcomingEvents() {
    const events = JSON.parse(localStorage.getItem("events")) || [];
    // let events = JSON.parse(localStorage.getItem("events")) || [];
    const eventContainer = document.getElementById("eventList");
    eventContainer.innerHTML = "";

    events.forEach(event => {
        let eventCard = document.createElement("div");
        eventCard.classList.add("event-card");
        eventCard.innerHTML = `
 
            <h1 style = "color:#800000;">${event.name}</h1>
            Organized by <h3>${event.society}</h3>
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

window.onscroll = function() {
    let upButton = document.getElementById("upButton");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        upButton.style.display = "block";
    } else {
        upButton.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}


//leaderBoard

