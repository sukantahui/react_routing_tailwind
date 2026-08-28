// Comprehensive Object Practice: Library Manager
// HTML: <div id="library"></div>
// A simple library manager

let library = [];

function addBook(title, author, year) {
    library.push({ id: Date.now(), title, author, year });
    saveToLocalStorage();
    renderLibrary();
}

function removeBook(id) {
    library = library.filter(book => book.id !== id);
    saveToLocalStorage();
    renderLibrary();
}

function searchBooks(term) {
    return library.filter(book =>
        book.title.toLowerCase().includes(term.toLowerCase()) ||
        book.author.toLowerCase().includes(term.toLowerCase())
    );
}

function saveToLocalStorage() {
    localStorage.setItem('library', JSON.stringify(library));
}

function loadFromLocalStorage() {
    const stored = localStorage.getItem('library');
    if (stored) {
        library = JSON.parse(stored);
    }
    renderLibrary();
}

function renderLibrary(filteredBooks = null) {
    const container = document.getElementById('library');
    if (!container) return;

    const booksToShow = filteredBooks || library;
    container.innerHTML = booksToShow.map(book => `
        <div class="book">
            <strong>${book.title}</strong> by ${book.author} (${book.year})
            <button onclick="removeBook(${book.id})">Delete</button>
        </div>
    `).join('') || '<p>No books in library.</p>';
}

// For console testing
console.log('Library manager loaded. Use addBook(title, author, year), removeBook(id), searchBooks(term)');

// Uncomment to test in console:
// addBook('1984', 'George Orwell', 1949);
// addBook('Brave New World', 'Aldous Huxley', 1932);
// console.log(searchBooks('world'));

// If you want to attach to HTML buttons, you'd need to expose functions globally.
window.addBook = addBook;
window.removeBook = removeBook;
window.searchBooks = searchBooks;

loadFromLocalStorage();
