// Dynamic Content Changer
// HTML: <div id="target">Original text</div>
// <button id="changeBtn">Change Me</button>

const target = document.getElementById('target');
const button = document.getElementById('changeBtn');

button.addEventListener('click', () => {
    // Change text
    target.textContent = 'Text has been changed!';
    
    // Change HTML (add an emoji)
    target.innerHTML = '<strong>New!</strong> ✨';
    
    // Change style
    target.style.backgroundColor = 'lightblue';
    target.style.padding = '10px';
    target.style.borderRadius = '5px';
    
    // Toggle a class for fun
    target.classList.toggle('highlight');
});
