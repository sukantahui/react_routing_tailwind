// Project: Selecting Elements and Changing Text
// Description: Use `querySelector` and `textContent` to modify a paragraph.


// This script expects an element with id="app" in the HTML
const app = document.getElementById('app');
if (app) {
    app.innerHTML = '<p>Text changed by JavaScript!</p>';
} else {
    console.log('Element #app not found');
}

