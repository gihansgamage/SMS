// Replace generatePDF function with:
function submitPermissionRequest() {
    const formData = {
        societyName: document.getElementById('societyName').value,
        eventName: document.getElementById('eventName').value,
        eventDate: document.getElementById('eventDate').value,
        location: document.getElementById('location').value,
        budget: document.getElementById('budget').value
    };

    const pending = JSON.parse(localStorage.getItem("pendingEventPermissions")) || [];
    pending.push(formData);
    localStorage.setItem("pendingEventPermissions", JSON.stringify(pending));
    
    alert('Permission request submitted!');
    window.location.href = 'home.html';
}