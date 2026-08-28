// Project: Selecting Elements: Getelementbyid, Queryselector, Queryselectorall
// Description: This project demonstrates selecting elements: getelementbyid, queryselector, queryselectorall in JavaScript.


// This script expects an element with id="app" in the HTML
const app = document.getElementById('app');
if (app) {
    app.innerHTML = '<p>Text changed by JavaScript!</p>';
} else {
    console.log('Element #app not found');
}

