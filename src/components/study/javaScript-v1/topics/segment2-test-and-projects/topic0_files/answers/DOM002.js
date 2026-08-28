// Project: Creating and Appending Elements
// Description: Create a new list item and append it to an unordered list.


const app = document.getElementById('app');
if (app) {
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    li.textContent = 'New list item';
    ul.appendChild(li);
    app.appendChild(ul);
}

