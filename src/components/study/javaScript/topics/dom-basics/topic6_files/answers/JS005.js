// Attribute & Class Manipulator
// HTML: <div id="demo" class="box" data-info="initial">Demo Div</div>
// Buttons: Set Attribute, Get Attribute, Add Class, Remove Class, Toggle Class, Read Data

const demo = document.getElementById('demo');

// Get attribute
function showAttr() {
    const attr = demo.getAttribute('data-info');
    alert('data-info = ' + attr);
}

// Set attribute
function setAttr() {
    const newVal = prompt('Enter new value for data-info:');
    if (newVal) demo.setAttribute('data-info', newVal);
}

// Add class
function addClass() {
    demo.classList.add('highlight');
}

// Remove class
function removeClass() {
    demo.classList.remove('highlight');
}

// Toggle class
function toggleClass() {
    demo.classList.toggle('highlight');
}

// Read data attribute using dataset
function readData() {
    const info = demo.dataset.info;
    alert('Dataset info = ' + info);
}

// Attach to buttons (assuming they exist in HTML)
document.getElementById('getAttrBtn')?.addEventListener('click', showAttr);
document.getElementById('setAttrBtn')?.addEventListener('click', setAttr);
document.getElementById('addClassBtn')?.addEventListener('click', addClass);
document.getElementById('removeClassBtn')?.addEventListener('click', removeClass);
document.getElementById('toggleClassBtn')?.addEventListener('click', toggleClass);
document.getElementById('readDataBtn')?.addEventListener('click', readData);
