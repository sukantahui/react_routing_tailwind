// Form Input Tracker
// HTML: <input id="trackInput" type="text" placeholder="Type something">
// <p id="displayText">Your text will appear here</p>

const trackInput = document.getElementById('trackInput');
const displayText = document.getElementById('displayText');

trackInput.addEventListener('input', () => {
    displayText.textContent = trackInput.value || 'Your text will appear here';
});
