// Optional Chaining and Nullish Coalescing
const user = {
    profile: {
        name: 'Alice'
        // address is missing
    }
};

// Without optional chaining would throw error
// const city = user.profile.address.city; // Error!

// With optional chaining
const city = user.profile?.address?.city ?? 'Unknown';
console.log('City:', city); // 'Unknown'

// With existing property
const name = user.profile?.name ?? 'Anonymous';
console.log('Name:', name); // 'Alice'

// Nullish coalescing only for null/undefined
const score = 0 ?? 100;
console.log('Score:', score); // 0 (not replaced)
