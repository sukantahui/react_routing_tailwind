// Search Filter
// HTML: <input id="searchInput" type="text" placeholder="Search...">
// <ul id="itemList">
//   <li>Apple</li><li>Banana</li><li>Orange</li><li>Grapes</li>
// </ul>

const searchInput = document.getElementById('searchInput');
const items = document.querySelectorAll('#itemList li');

searchInput.addEventListener('input', () => {
    const term = searchInput.value.toLowerCase();
    items.forEach(item => {
        if (item.textContent.toLowerCase().includes(term)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});
