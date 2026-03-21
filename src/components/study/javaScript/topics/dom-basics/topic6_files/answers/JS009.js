// Modal Dialog
// HTML: <button id="openModalBtn">Open Modal</button>
// <div id="modal" class="modal">
//   <div class="modal-content">
//     <span class="close">&times;</span>
//     <p>Modal content goes here!</p>
//   </div>
// </div>

const modal = document.getElementById('modal');
const openBtn = document.getElementById('openModalBtn');
const closeSpan = document.querySelector('.close');

openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeSpan.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
