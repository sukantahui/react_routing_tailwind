// Event Handling Demo
// HTML: <button id="clickBtn">Click me</button>
// <div id="hoverDiv" style="width:200px; height:100px; background:gray;">Hover over me</div>
// <input id="keyInput" placeholder="Type something">

const clickBtn = document.getElementById('clickBtn');
const hoverDiv = document.getElementById('hoverDiv');
const keyInput = document.getElementById('keyInput');

clickBtn.addEventListener('click', () => {
    console.log('Button clicked!');
    alert('Button clicked!');
});

hoverDiv.addEventListener('mouseenter', () => {
    console.log('Mouse entered the div');
    hoverDiv.style.backgroundColor = 'lightblue';
});
hoverDiv.addEventListener('mouseleave', () => {
    console.log('Mouse left the div');
    hoverDiv.style.backgroundColor = 'gray';
});

keyInput.addEventListener('keypress', (e) => {
    console.log(`Key pressed: ${e.key}`);
    // Optional: display on page
});
