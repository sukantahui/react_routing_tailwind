// Storing Objects in LocalStorage
const user = {
    name: 'Alice',
    age: 30,
    preferences: { theme: 'dark', language: 'en' }
};

// Store
localStorage.setItem('user', JSON.stringify(user));

// Retrieve (after page reload, you can still get it)
const stored = localStorage.getItem('user');
if (stored) {
    const retrievedUser = JSON.parse(stored);
    console.log('Retrieved user:', retrievedUser);
    console.log('Same object?', retrievedUser === user); // false
} else {
    console.log('No user in localStorage');
}

// For demo, clear after showing
// localStorage.removeItem('user');
