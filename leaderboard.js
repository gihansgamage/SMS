async function submitEvent() {
    const societyName = document.getElementById("societyName").value;
    const eventName = document.getElementById("eventName").value;
    const venue = document.getElementById("venue").value;
    const time = document.getElementById("time").value;
    const files = document.getElementById("eventFiles").files;

    if (!societyName || !eventName || !venue || !time) {
        alert("Please fill all required fields");
        return;
    }

    const attachments = [];
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        
        await new Promise((resolve) => {
            reader.onload = () => {
                attachments.push({
                    name: file.name,
                    type: file.type,
                    data: reader.result.split(',')[1]
                });
                resolve();
            };
            reader.readAsDataURL(file);
        });
    }

    const eventQueue = JSON.parse(localStorage.getItem("eventQueue")) || [];
    eventQueue.push({
        societyName,
        eventName,
        venue,
        time,
        attachments,
        status: "pending"
    });

    localStorage.setItem("eventQueue", JSON.stringify(eventQueue));
    alert("Event submitted for approval!");
    
    // Clear form fields
    document.getElementById("societyName").value = "";
    document.getElementById("eventName").value = "";
    document.getElementById("venue").value = "";
    document.getElementById("time").value = "";
    document.getElementById("eventFiles").value = "";
}

let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || {};

// Initialize event queue from localStorage
let eventQueue = JSON.parse(localStorage.getItem("eventQueue")) || [];

function updateLeaderboard() {
    const leaderboardTable = document.getElementById('leaderboard');
    leaderboardTable.innerHTML = '';

    // Sort societies by points (descending)
    const sortedSocieties = Object.entries(leaderboard)
        .sort(([, a], [, b]) => b - a);

    sortedSocieties.forEach(([society, points], index) => {
        let badge = '';
        if (index === 0) badge = '<i class="fas fa-medal gold"></i>';
        else if (index === 1) badge = '<i class="fas fa-medal silver"></i>';
        else if (index === 2) badge = '<i class="fas fa-medal bronze"></i>';

        const row = `
            <tr>
                <td>#${index + 1}</td>
                <td>${society}</td>
                <td>${points}</td>
                <td>${badge}</td>
            </tr>
        `;
        leaderboardTable.innerHTML += row;
    });
}