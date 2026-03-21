// Accessing Deeply Nested Values
const data = {
    user: {
        profile: {
            name: 'Alice'
        }
    }
};

// Traditional way (throws error if missing)
try {
    console.log('Traditional:', data.user.profile.name);
} catch (e) {
    console.log('Traditional error:', e.message);
}

// Using optional chaining (safe)
console.log('Optional chaining:', data.user?.profile?.name);
console.log('Optional chaining missing:', data.user?.address?.city); // undefined
