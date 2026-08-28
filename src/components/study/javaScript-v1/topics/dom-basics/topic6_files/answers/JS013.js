// Local Storage Notes App
// HTML: <div class="notes-app">
//   <input id="noteInput" type="text" placeholder="Add a note">
//   <button id="addNoteBtn">Add</button>
//   <ul id="notesList"></ul>
// </div>

const noteInput = document.getElementById('noteInput');
const addBtn = document.getElementById('addNoteBtn');
const notesList = document.getElementById('notesList');

let notes = [];

function loadNotes() {
    const stored = localStorage.getItem('notes');
    if (stored) {
        notes = JSON.parse(stored);
        renderNotes();
    }
}

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes() {
    notesList.innerHTML = '';
    notes.forEach((note, index) => {
        const li = document.createElement('li');
        li.textContent = note;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => {
            notes.splice(index, 1);
            saveNotes();
            renderNotes();
        });
        li.appendChild(deleteBtn);
        notesList.appendChild(li);
    });
}

addBtn.addEventListener('click', () => {
    const text = noteInput.value.trim();
    if (text) {
        notes.push(text);
        saveNotes();
        renderNotes();
        noteInput.value = '';
    }
});

loadNotes();
