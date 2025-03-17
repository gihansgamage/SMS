document.addEventListener('DOMContentLoaded', () => {
    loadSocieties();
    loadPendingSocieties();
    loadUsers();
    loadActivityLog();
    fetchEmails();
    showSection('dashboard');
    loadPendingEvents();
    loadLeaderboard();
    loadDashboardStats();
    loadNotifications();
    loadSocietyProgressChart();
    loadNotificationSetting();
});


// Load Total Societies & Events
function loadDashboardStats() {
    let societies = JSON.parse(localStorage.getItem("societies")) || [];
    let events = JSON.parse(localStorage.getItem("events")) || [];

    document.getElementById("totalSocieties").innerText = societies.length;
    document.getElementById("totalEvents").innerText = events.length;
}


// Load Society Progress Chart
// function loadSocietyProgressChart() {
//     let societies = JSON.parse(localStorage.getItem("societies")) || [];
//     let events = JSON.parse(localStorage.getItem("events")) || [];

//     console.log("Societies:", societies);
//     console.log("Events:", events);

//     if (societies.length === 0 || events.length === 0) {
//         console.error("Error: No data available for chart.");
//         return; // Exit function if data is missing
//     }

//     let societyLabels = societies.map(s => s.societyName);
//     let eventCounts = societyLabels.map(label => 
//         events.filter(e => e.society === label).length
//     );

//     console.log("Society Labels:", societyLabels);
//     console.log("Event Counts:", eventCounts);

//     let ctx = document.getElementById("societyProgressChart");
//     if (!ctx) {
//         console.error("Error: Canvas element 'societyProgressChart' not found.");
//         return;
//     }

//     new Chart(ctx.getContext("2d"), {
//         type: "bar",
//         data: {
//             labels: societyLabels,
//             datasets: [{
//                 label: "Events Held",
//                 data: eventCounts,
//                 backgroundColor: "#ffcb43",
//                 borderColor: "#c78209",
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 y: { beginAtZero: true }
//             }
//         }
//     });
// }


// Load Notifications
function loadNotifications() {
    let notifications = [
        { message: "New society registration request", status: "new" },
        { message: "Upcoming event approval pending", status: "new" },
        { message: "Scholarship applications open" },
        { message: "Next meeting scheduled for Friday" }
    ];

    let notificationList = document.getElementById("notificationList");
    notificationList.innerHTML = "";
    notifications.forEach(notification => {
        let li = document.createElement("li");
        li.innerText = notification.message;
        if (notification.status === "new") li.classList.add("new");
        notificationList.appendChild(li);
    });
}


function loadSocieties() {
    let societies = JSON.parse(localStorage.getItem("societies")) || [];
    const tableBody = document.querySelector("#societyTable tbody");
    tableBody.innerHTML = "";

    societies.forEach((society, index) => {
        let row = tableBody.insertRow();
        row.innerHTML = `
            <td>${society.fileNumber}</td>
            <td>${society.societyName}</td>
            <td>${society.treasurerTitle} ${society.treasurerName}</td>
            <td>${society.bankAccount}</td>
            <td>
                <button onclick="editSociety(${index})">Edit</button>
                <button onclick="deleteSociety(${index})">Delete</button>
                <button onclick="viewSociety(${index})">View</button>
            </td>
        `;
    });
}

function editSociety(index) {
    let societies = JSON.parse(localStorage.getItem("societies"));
    let society = societies[index];
    let newName = prompt("Edit Society Name", society.societyName);
    if (newName) {
        societies[index].societyName = newName;
        localStorage.setItem("societies", JSON.stringify(societies));
        logActivity(`Edited Society: ${newName}`);
        loadSocieties();
    }
}

function deleteSociety(index) {
    if (confirm("Are you sure you want to delete this society?")) {
        let societies = JSON.parse(localStorage.getItem("societies"));
        logActivity(`Deleted Society: ${societies[index].societyName}`);
        societies.splice(index, 1);
        localStorage.setItem("societies", JSON.stringify(societies));
        loadSocieties();
    }
}

function searchSocieties() {
    let searchText = document.getElementById("searchBox").value.toLowerCase();
    let rows = document.querySelectorAll("#societyTable tbody tr");
    rows.forEach(row => {
        let societyName = row.cells[1].textContent.toLowerCase();
        row.style.display = societyName.includes(searchText) ? "" : "none";
    });
}

function downloadExcel() {
    let societies = JSON.parse(localStorage.getItem("societies")) || [];
    let ws = XLSX.utils.json_to_sheet(societies);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Societies");
    XLSX.writeFile(wb, "societies.xlsx");
}

function downloadPDF() {
    let societies = JSON.parse(localStorage.getItem("societies")) || [];
    const doc = new jspdf.jsPDF();
    doc.text("Society Details", 10, 10);
    doc.autoTable({
        head: [['File Number', 'Society Name', 'Treasurer', 'Bank Account']],
        body: societies.map(s => [s.fileNumber, s.societyName, s.treasurerTitle + ' ' + s.treasurerName, s.bankAccount]),
    });
    doc.save("societies.pdf");
}

function toggleSidebar() {
    document.querySelector(".sidebar").classList.toggle("collapsed");
    document.querySelector(".main-content").classList.toggle("expanded");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    logActivity("Toggled Dark Mode");
}

// function logActivity(message) {
//     let logList = JSON.parse(localStorage.getItem("activityLog")) || [];
//     logList.unshift(`${new Date().toLocaleString()}: ${message}`);
//     localStorage.setItem("activityLog", JSON.stringify(logList));
//     loadActivityLog();
// }

// function loadActivityLog() {
//     let logList = JSON.parse(localStorage.getItem("activityLog")) || [];
//     const logContainer = document.getElementById("logList");
//     logContainer.innerHTML = "";
//     logList.forEach(log => {
//         let listItem = document.createElement("li");
//         listItem.textContent = log;
//         logContainer.appendChild(listItem);
//     });
// }



// function logActivity(action) {
//     let adminUsername = localStorage.getItem("currentAdmin") || "Unknown Admin";
//     let activityLogs = JSON.parse(localStorage.getItem("activityLogs")) || [];
    
//     let logEntry = `${new Date().toLocaleString()} - ${adminUsername}: ${action}`;
//     activityLogs.push(logEntry);
    
//     localStorage.setItem("activityLogs", JSON.stringify(activityLogs));
//     loadActivityLog();
// }

// function loadActivityLog() {
//     let activityLogs = JSON.parse(localStorage.getItem("activityLogs")) || [];
//     const logList = document.querySelector("#logList");
//     logList.innerHTML = "";
    
//     activityLogs.forEach(log => {
//         let listItem = document.createElement("li");
//         listItem.textContent = log;
//         logList.appendChild(listItem);
//     });
// }

// Add this at the bottom of the file
(function() {
    // Store original showSection function
    const originalShowSection = window.showSection;
    
    // Create wrapped version
    window.showSection = function(section) {
        // Call original function
        originalShowSection.apply(this, arguments);
        
        // Additional logic for activity log
        if(section === 'activity') {
            loadActivityLog();
        }
    };
})();

function logActivity(message) {
    let logList = JSON.parse(localStorage.getItem("activityLog")) || [];
    logList.unshift(`${new Date().toLocaleString()}: ${message}`);
    localStorage.setItem("activityLog", JSON.stringify(logList));
    loadActivityLog();
}

function loadActivityLog() {
    let logList = JSON.parse(localStorage.getItem("activityLog")) || [];
    const logContainer = document.getElementById("logList");
    logContainer.innerHTML = "";
    logList.forEach(log => {
        let listItem = document.createElement("li");
        listItem.textContent = log;
        logContainer.appendChild(listItem);
    });
}

function viewSociety(index) {
    let societies = JSON.parse(localStorage.getItem("societies")) || [];
    let society = societies[index];

    let detailsHTML = `
        <strong>File Number:</strong> ${society.fileNumber}<br>
        <strong>Society Name:</strong> ${society.societyName}<br>
        <strong>Senior Treasurer:</strong> ${society.treasurerTitle} ${society.treasurerName}<br>
        <strong>Bank Account:</strong> ${society.bankAccount}<br>
        <strong>Contact Email:</strong> ${society.contactEmail || 'N/A'}<br>
        <strong>Phone Number:</strong> ${society.phoneNumber || 'N/A'}<br>
        <strong>Address:</strong> ${society.address || 'N/A'}<br>
        <strong>Additional Info:</strong> ${society.additionalInfo || 'N/A'}
    `;

    document.getElementById("societyDetails").innerHTML = detailsHTML;
    document.getElementById("viewSocietyModal").style.display = "block"
}

function closeModal() {
    document.getElementById("viewSocietyModal").style.display = "block";
}

// function downloadSocietyPDF() {
//     let societyDetails = document.getElementById("societyDetails").innerHTML;
//     const doc = new jsPDF();
//     doc.text("Society Details", 10, 10);
//     doc.text(societyDetails.replace(/<br>/g, "\n"), 20, 10);
//     doc.save("society_details.pdf");
// }

function downloadSocietyPDF() {
    let societyDetails = document.getElementById("societyDetails").innerHTML;
    const doc = new jsPDF();
    
    // Set initial positions
    let x = 10;
    let y = 20;
    
    // Add title
    doc.setFontSize(18);
    doc.text("Society Details", x, 10);
    
    // Process details
    doc.setFontSize(12);
    societyDetails.split(/<br\s*\/?>/).forEach(line => {
        // Extract label and value using regex
        const match = line.match(/<strong>(.*?)<\/strong>\s*(.*)/);
        if(match) {
            const formattedLine = `${match[1].trim()}: ${match[2].trim()}`;
            doc.text(formattedLine, x, y);
            y += 10; // Move down for next line
        }
    });

    doc.save("society_details.pdf");
}

// document.addEventListener('DOMContentLoaded', () => {
//     loadPendingSocieties();
//     loadSocieties();
//     loadUsers();
//     loadActivityLog();
//     showSection('dashboard');
// });



function loadPendingSocieties() {
    let pendingSocieties = JSON.parse(localStorage.getItem("pendingSocieties")) || [];
    const tableBody = document.querySelector("#pendingSocietyTable tbody");
    tableBody.innerHTML = "";

    if (pendingSocieties.length === 0) {
        tableBody.innerHTML = "<tr><td colspan='5'>No pending societies</td></tr>";
        return;
    }

    pendingSocieties.forEach((society, index) => {
        let row = tableBody.insertRow();
        row.innerHTML = `
            <td>${society.fileNumber}</td>
            <td>${society.societyName}</td>
            <td>${society.treasurerTitle} ${society.treasurerName}</td>
            <td>${society.bankAccount}</td>
            <td>
                <button onclick="approveSociety(${index})">Approve</button>
                <button onclick="declineSociety(${index})">Decline</button>
            </td>
        `;
    });
}



function approveSociety(index) {
    let pendingSocieties = JSON.parse(localStorage.getItem("pendingSocieties")) || [];
    let societies = JSON.parse(localStorage.getItem("societies")) || [];
    
    let approvedSociety = pendingSocieties.splice(index, 1)[0];
    societies.push(approvedSociety);

    localStorage.setItem("societies", JSON.stringify(societies));
    localStorage.setItem("pendingSocieties", JSON.stringify(pendingSocieties));
    logActivity(`Approved Society: ${approvedSociety.societyName}`);

    loadPendingSocieties();
    loadSocieties();
}



function declineSociety(index) {
    let pendingSocieties = JSON.parse(localStorage.getItem("pendingSocieties")) || [];
    pendingSocieties.splice(index, 1);

    localStorage.setItem("pendingSocieties", JSON.stringify(pendingSocieties));

    logActivity("A society application was declined.");

    loadPendingSocieties();
}


function loadUsers() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const tableBody = document.querySelector("#userTable tbody");
    tableBody.innerHTML = "";

    users.forEach((user, index) => {
        let row = tableBody.insertRow();
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="deleteAdmin(${index})">Delete Admin</button>
            </td>
        `;
    });
}


function deleteAdmin(index) {
    const password = prompt("Enter deletion password:");
    if (password !== "uop-sms") {
        alert("Incorrect password. Deletion canceled.");
        return;
    }

    if (confirm("Are you sure you want to delete this admin?")) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        const deletedUser = users.splice(index, 1)[0];
        localStorage.setItem("users", JSON.stringify(users));
        logActivity(`Admin deleted: ${deletedUser.username} (${deletedUser.email})`);
        loadUsers();
        alert("Admin successfully deleted.");
    }
}

function addAdmin() {
    let username = prompt("Enter new admin username:");
    let email = prompt("Enter new admin email:");

    if (username && email) {
        let users = JSON.parse(localStorage.getItem("users")) || [];
        users.push({ username, email });

        localStorage.setItem("users", JSON.stringify(users));
        alert("New admin added successfully!");
        loadUsers();
    } else {
        alert("Both username and email are required!");
    }
}


// function checkAdminAccess() {
//     let storedAdmins = JSON.parse(localStorage.getItem("users")) || [];

//     let username = prompt("Enter your username:");
//     let email = prompt("Enter your email:");

//     let isAdmin = storedAdmins.some(user => user.username === username && user.email === email);

//     if (!isAdmin) {
//         alert("Access Denied! You are not an admin.");
//         window.location.href = "home.html"; // Redirect to user panel
//     } else {
//         alert("Welcome, " + username + "!");
//     }
// }

function checkAdminAccess() {
    document.getElementById("adminLoginPopup").style.display = "flex";
}

function validateAdmin() {
    let storedAdmins = JSON.parse(localStorage.getItem("users")) || [];
    let username = document.getElementById("adminUsername").value.trim();
    let email = document.getElementById("adminEmail").value.trim();

    // Check if fields are empty
    if (!username || !email) {
        alert("Please enter both username and email.");
        return;
    }

    // Check admin access
    let isAdmin = storedAdmins.some(user => user.username === username && user.email === email);

    if (!isAdmin) {
        alert("Access Denied! You are not an admin.");
        window.location.href = "home.html"; // Redirect to user panel
    } else {
        // alert("Welcome, " + username + "!");
        document.getElementById("adminLoginPopup").style.display = "none"; // Close popup
          // Add login activity log
        // logActivity(`Admin login: ${username} (${new Date().toLocaleString()})`);
        // Inside validateAdmin() function
        logActivity(`Admin login: ${username} (${new Date().toLocaleString()}) [Password Verified]`);
    }
}


// let eventQueue = [];
// let leaderboard = {};

// function submitEvent() {
//     let eventName = document.getElementById('eventName').value;
//     let venue = document.getElementById('venue').value;
//     let time = document.getElementById('time').value;
//     let societyName = document.getElementById('societyName').value;
    
//     if (eventName && venue && time && societyName) {
//         eventQueue.push({ eventName, venue, time, societyName });
//         updateEventPanel();
//     }
// }

// function updateEventPanel() {
//     let adminTableBody = document.getElementById('adminTableBody');
//     adminTableBody.innerHTML = '';
//     eventQueue.forEach((event, index) => {
//         let row = `<tr>
//             <td>${event.eventName}</td>
//             <td>${event.venue}</td>
//             <td>${event.time}</td>
//             <td>${event.societyName}</td>
//             <td>
//                 <select id="score-${index}">
//                     ${Array.from({ length: 10 }, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
//                 </select>
//             </td>
//             <td><button onclick="approveEvent(${index})">Add Points</button></td>
//         </tr>`;
//         adminTableBody.innerHTML += row;
//     });
// }

// function approveEvent(index) {
//     let selectedScore = document.getElementById(`score-${index}`).value;
//     let societyName = eventQueue[index].societyName;
//     leaderboard[societyName] = (leaderboard[societyName] || 0) + parseInt(selectedScore);
//     eventQueue.splice(index, 1);
//     updateEventPanel();
//     updateLeaderboard();
// }

// function updateLeaderboard() {
//     let leaderboardTable = document.getElementById('leaderboard');
//     leaderboardTable.innerHTML = '';
//     Object.keys(leaderboard).forEach(society => {
//         let row = `<tr>
//             <td>${society}</td>
//             <td>${leaderboard[society]}</td>
//         </tr>`;
//         leaderboardTable.innerHTML += row;
//     });
// }

// document.addEventListener('DOMContentLoaded', () => {
//     loadPendingEvents();
//     loadLeaderboard();
// });

// // Store events and leaderboard data
// let eventQueue = JSON.parse(localStorage.getItem("eventQueue")) || [];
// let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || {};

// // Load pending events into the admin panel
// function loadPendingEvents() {
//     const adminTableBody = document.querySelector("#adminTableBody");
//     adminTableBody.innerHTML = '';

//     if (eventQueue.length === 0) {
//         adminTableBody.innerHTML = "<tr><td colspan='6'>No pending events</td></tr>";
//         return;
//     }

//     eventQueue.forEach((event, index) => {
//         let row = `<tr>
//             <td>${event.eventName}</td>
//             <td>${event.venue}</td>
//             <td>${event.time}</td>
//             <td>${event.societyName}</td>
//             <td>
//                 <select id="score-${index}">
//                     ${Array.from({ length: 10 }, (_, i) => `<option value="${i+1}">${i+1}</option>`).join('')}
//                 </select>
//             </td>
//             <td><button onclick="approveEvent(${index})">Add Points</button></td>
//         </tr>`;
//         adminTableBody.innerHTML += row;
//     });
// }

// // Approve event and add points to the leaderboard
// function approveEvent(index) {
//     let selectedScore = document.getElementById(`score-${index}`).value;
//     let societyName = eventQueue[index].societyName;
    
//     // Update leaderboard score
//     leaderboard[societyName] = (leaderboard[societyName] || 0) + parseInt(selectedScore);
    
//     // Remove approved event from the queue
//     eventQueue.splice(index, 1);

//     // Save changes to local storage
//     localStorage.setItem("eventQueue", JSON.stringify(eventQueue));
//     localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

//     // Update UI
//     loadPendingEvents();
//     loadLeaderboard();
// }

// // Load leaderboard data
// function loadLeaderboard() {
//     const leaderboardTable = document.getElementById('leaderboard');
//     leaderboardTable.innerHTML = '';

//     if (Object.keys(leaderboard).length === 0) {
//         leaderboardTable.innerHTML = "<tr><td colspan='2'>No scores available</td></tr>";
//         return;
//     }

//     Object.keys(leaderboard).forEach(society => {
//         let row = `<tr>
//             <td>${society}</td>
//             <td>${leaderboard[society]}</td>
//         </tr>`;
//         leaderboardTable.innerHTML += row;
//     });
// }



// document.addEventListener('DOMContentLoaded', () => {
//     loadPendingEvents();
//     loadLeaderboard();
// });

// Store events and leaderboard data
let eventQueue = JSON.parse(localStorage.getItem("eventQueue")) || [];
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || {};

// Load pending events into the admin panel
// admin.js updates
function loadPendingEvents() {
    const adminTableBody = document.querySelector("#adminTableBody");
    adminTableBody.innerHTML = '';

    const eventQueue = JSON.parse(localStorage.getItem("eventQueue")) || [];

    if (eventQueue.length === 0) {
        adminTableBody.innerHTML = "<tr><td colspan='8'>No pending events</td></tr>";
        return;
    }

    eventQueue.forEach((event, index) => {
        const row = `
            <tr>
                <td>${event.eventName}</td>
                <td>${event.venue}</td>
                <td>${new Date(event.time).toLocaleString()}</td>
                <td>${event.societyName}</td>
                <td>
                    ${event.attachments.map(file => `
                        <a href="data:${file.type};base64,${file.data}" 
                           download="${file.name}">
                           ${file.name}
                        </a>
                    `).join('<br>')}
                </td>
                <td>
                    <select id="score-${index}">
                        ${Array.from({length: 10}, (_, i) => 
                            `<option value="${i+1}">${i+1}</option>`).join('')}
                    </select>
                </td>
                <td>
                    <button onclick="approveEvent(${index})">Approve</button>
                    <button onclick="declineEvent(${index})">Decline</button>
                </td>
            </tr>`;
        adminTableBody.innerHTML += row;
    });
}

function loadLeaderboard() {
    const leaderboardTable = document.getElementById('leaderboard');
    leaderboardTable.innerHTML = '';
    
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || {};
    const societies = JSON.parse(localStorage.getItem("societies")) || [];

    const sortedLeaderboard = Object.entries(leaderboard)
        .sort((a, b) => b[1] - a[1]);

    sortedLeaderboard.forEach(([society, points]) => {
        const societyData = societies.find(s => s.societyName === society);
        const row = `
            <tr>
                <td>${society}</td>
                <td>${points}</td>
                <td>
                    ${societyData?.badge ? 
                        `<img src="${societyData.badge}" alt="Society Badge" height="50">` : 
                        'No badge'}
                </td>
            </tr>`;
        leaderboardTable.innerHTML += row;
    });
}

// Approve event and add points to the leaderboard
function approveEvent(index) {
    let selectedScore = document.getElementById(`score-${index}`).value;
    let societyName = eventQueue[index].societyName;
    
    // Update leaderboard score
    leaderboard[societyName] = (leaderboard[societyName] || 0) + parseInt(selectedScore);
    
    // Remove approved event from the queue
    eventQueue.splice(index, 1);

    // Save changes to local storage
    localStorage.setItem("eventQueue", JSON.stringify(eventQueue));
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    // Update UI
    loadPendingEvents();
    loadLeaderboard();
}

function declineEvent(index) {
    // Remove declined event from the queue
    const declinedEvent = eventQueue.splice(index, 1)[0];
    
    // Save changes to local storage
    localStorage.setItem("eventQueue", JSON.stringify(eventQueue));
    
    // Log the activity
    logActivity(`Declined event: ${declinedEvent.eventName} from ${declinedEvent.societyName}`);
    
    // Update UI
    loadPendingEvents();
}
// Load leaderboard data
// function loadLeaderboard() {
//     const leaderboardTable = document.getElementById('leaderboard');
//     leaderboardTable.innerHTML = '';

//     if (Object.keys(leaderboard).length === 0) {
//         leaderboardTable.innerHTML = "<tr><td colspan='2'>No scores available</td></tr>";
//         return;
//     }

//     Object.keys(leaderboard).forEach(society => {
//         let row = `<tr>
//             <td>${society}</td>
//             <td>${leaderboard[society]}</td>
//         </tr>`;
//         leaderboardTable.innerHTML += row;
//     });
// }
// function loadLeaderboard() {
//     const leaderboardTable = document.getElementById('leaderboard');
//     leaderboardTable.innerHTML = '';

//     let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || {};

//     if (Object.keys(leaderboard).length === 0) {
//         leaderboardTable.innerHTML = "<tr><td colspan='2'>No scores available</td></tr>";
//         return;
//     }

//     // Convert leaderboard object to an array and sort it in descending order
//     let sortedLeaderboard = Object.entries(leaderboard)
//         .sort((a, b) => b[1] - a[1]); // Sort by score in descending order

//     sortedLeaderboard.forEach(([society, points]) => {
//         let row = `<tr>
//             <td>${society}</td>
//             <td>${points}</td>
//         </tr>`;
//         leaderboardTable.innerHTML += row;
//     });
// }


// Admin-specific event submission
function submitAdminEvent() {
    const societyName = document.getElementById("adminSocietySelect").value;
    const eventName = document.getElementById("adminEventName").value;
    const venue = document.getElementById("adminEventVenue").value;
    const time = document.getElementById("adminEventTime").value;
    const files = document.getElementById("adminEventFiles").files;

    if (!societyName || !eventName || !venue || !time) {
        alert("Please fill all required fields");
        return;
    }

    // Similar file handling as user submission
    // ...

    const eventQueue = JSON.parse(localStorage.getItem("eventQueue")) || [];
    eventQueue.push({
        societyName,
        eventName,
        venue,
        time,
        attachments: [],
        status: "approved",
        adminSubmitted: true
    });

    localStorage.setItem("eventQueue", JSON.stringify(eventQueue));
    loadPendingEvents();
    alert("Event created successfully!");
}


function submitEvent() {
    let eventName = document.getElementById('eventName').value;
    let venue = document.getElementById('venue').value;
    let time = document.getElementById('time').value;
    let societyName = document.getElementById('societyName').value;

    if (eventName && venue && time && societyName) {
        // Retrieve the existing eventQueue from localStorage
        let eventQueue = JSON.parse(localStorage.getItem("eventQueue")) || [];
        
        // Add new event to the queue
        eventQueue.push({ eventName, venue, time, societyName });

        // Save updated queue back to localStorage
        localStorage.setItem("eventQueue", JSON.stringify(eventQueue));

        alert("Event submitted successfully!");

        // Clear input fields
        document.getElementById('eventName').value = "";
        document.getElementById('venue').value = "";
        document.getElementById('time').value = "";
        document.getElementById('societyName').value = "";
    } else {
        alert("Please fill all fields.");
    }
}


//communication center

async function fetchEmails() {
    const response = await fetch("/get_emails");
    const data = await response.json();
    document.getElementById("secretary_count").innerText = `(${data.secretary.length})`;
    document.getElementById("president_count").innerText = `(${data.president.length})`;
    document.getElementById("treasurer_count").innerText = `(${data.treasurer.length})`;
}

async function sendEmail() {
    let senderEmail = document.getElementById("sender_email").value;
    let subject = document.getElementById("subject").value;
    let message = document.getElementById("message").value;
    let selectedRoles = [];

    document.querySelectorAll('input[name="role"]:checked').forEach(checkbox => {
        selectedRoles.push(checkbox.value);
    });

    if (!senderEmail || !subject || !message || selectedRoles.length === 0) {
        alert("Please fill in all fields and select at least one recipient group.");
        return;
    }

    const emailData = await fetch("/get_emails").then(res => res.json());
    let recipients = [];
    selectedRoles.forEach(role => {
        recipients = recipients.concat(emailData[role]);
    });

    if (recipients.length === 0) {
        alert("No valid recipients found.");
        return;
    }

    const response = await fetch("/send_email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            sender_email: senderEmail,
            recipients: recipients,
            subject: subject,
            message: message
        }),
    });

    const result = await response.json();
    alert(result.message);
}


// Function to filter the Society List
function searchSocieties() {
    let searchText = document.getElementById("searchSocieties").value.toLowerCase();
    let rows = document.querySelectorAll("#societyTable tbody tr");
    rows.forEach(row => {
        let societyName = row.cells[1].textContent.toLowerCase(); // Society Name column
        row.style.display = societyName.includes(searchText) ? "" : "none";
    });
}

// Function to filter the Leaderboard
function searchLeaderboard() {
    let searchText = document.getElementById("searchLeaderboard").value.toLowerCase();
    let rows = document.querySelectorAll("#leaderboard tr");
    rows.forEach((row, index) => {
        if (index === 0) return; // Skip table header
        let societyName = row.cells[0].textContent.toLowerCase(); // Society Name column
        row.style.display = societyName.includes(searchText) ? "" : "none";
    });
}


// Add to DOMContentLoaded
loadEventPermissions();

// New functions
function loadEventPermissions() {
    const pending = JSON.parse(localStorage.getItem("pendingEventPermissions")) || [];
    const accepted = JSON.parse(localStorage.getItem("acceptedEvents")) || [];
    
    // Load pending
    const pendingBody = document.querySelector("#pendingPermissions");
    pendingBody.innerHTML = pending.map((event, index) => `
        <tr>
            <td>${event.societyName}</td>
            <td>${event.eventName}</td>
            <td>${event.eventDate}</td>
            <td>${event.location}</td>
            <td>Rs.${event.budget}</td>
            <td>
                <button onclick="handlePermission(${index}, true)">Accept</button>
                <button onclick="handlePermission(${index}, false)">Reject</button>
            </td>
        </tr>
    `).join('');

    // Load accepted
    const acceptedBody = document.querySelector("#acceptedEvents");
    acceptedBody.innerHTML = accepted.map(event => `
        <tr>
            <td>${event.societyName}</td>
            <td>${event.eventName}</td>
            <td>${event.eventDate}</td>
            <td>${event.location}</td>
        </tr>
    `).join('');
}

function handlePermission(index, isAccepted) {
    const pending = JSON.parse(localStorage.getItem("pendingEventPermissions")) || [];
    const accepted = JSON.parse(localStorage.getItem("acceptedEvents")) || [];
    
    const event = pending[index];
    
    if(isAccepted) {
        accepted.push(event);
        // Add to upcoming events
        const events = JSON.parse(localStorage.getItem("events")) || [];
        events.push({
            name: event.eventName,
            date: event.eventDate,
            society: event.societyName
        });
        localStorage.setItem("events", JSON.stringify(events));
    }
    
    pending.splice(index, 1);
    
    localStorage.setItem("pendingEventPermissions", JSON.stringify(pending));
    localStorage.setItem("acceptedEvents", JSON.stringify(accepted));
    
    loadEventPermissions();
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
}

function loadDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
}

function changeAdminPassword() {
    let currentPass = document.getElementById("currentPassword").value;
    let newPass = document.getElementById("newPassword").value;
    let storedPass = localStorage.getItem("adminPassword");

    if (currentPass !== storedPass) {
        alert("Incorrect current password");
        return;
    }

    localStorage.setItem("adminPassword", newPass);
    alert("Password changed successfully!");
}

document.addEventListener("DOMContentLoaded", loadDarkMode);

function toggleNotifications() {
    let notificationsEnabled = localStorage.getItem("notificationsEnabled") === "true";
    localStorage.setItem("notificationsEnabled", !notificationsEnabled);
}

function loadNotificationSetting() {
    if (localStorage.getItem("notificationsEnabled") === "false") {
        clearInterval(notificationInterval);
    }
}

// Show Logout Confirmation Popup
function showLogoutPopup() {
    document.getElementById("logoutPopup").style.display = "flex";
}

// Close Logout Popup
function closeLogoutPopup() {
    document.getElementById("logoutPopup").style.display = "none";
}

// Confirm Logout and Refresh Page
function confirmLogout() {
    localStorage.removeItem("currentAdmin"); // Clear admin session (optional)
    location.reload(); // Refresh the page
}
