// Add this as a new file: notifications.js
document.addEventListener('DOMContentLoaded', () => {
    // Create notification badges
    const createBadges = () => {
        const tabs = document.querySelectorAll('.sidebar button, .tab-button');
        tabs.forEach(tab => {
            if (!tab.querySelector('.notification-badge')) {
                const badge = document.createElement('span');
                badge.className = 'notification-badge';
                badge.style.cssText = `
                    background: #ff4757;
                    color: white;
                    border-radius: 10px;
                    padding: 2px 6px;
                    font-size: 0.8em;
                    margin-left: 5px;
                    display: none;
                `;
                tab.appendChild(badge);
            }
        });
    };

    // Update badge counts
    const updateBadges = () => {
        const counts = {
            pending: JSON.parse(localStorage.getItem('pendingSocieties') || []).length,
            events: JSON.parse(localStorage.getItem('eventQueue') || []).length,
            activity: JSON.parse(localStorage.getItem('activityLog') || []).length
        };

        document.querySelectorAll('.notification-badge').forEach((badge, index) => {
            const section = ['pending', 'events', 'activity'][index];
            const count = counts[section];
            badge.textContent = count;
            badge.style.display = count > 0 ? 'inline-block' : 'none';
        });
    };

    // Initialize
    createBadges();
    updateBadges();
    
    // Check for updates every 5 seconds
    setInterval(updateBadges, 5000);

    // Clear notifications when viewing a section
    const originalShowSection = window.showSection;
    window.showSection = function(section) {
        originalShowSection.apply(this, arguments);
        document.querySelectorAll('.notification-badge')[['pending','events','activity'].indexOf(section)].style.display = 'none';
    };
});