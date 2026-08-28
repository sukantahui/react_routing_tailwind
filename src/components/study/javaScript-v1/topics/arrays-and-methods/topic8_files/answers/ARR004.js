// Splice Practice
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
console.log('Original:', months);

// Remove two months starting at index 1
const removed = months.splice(1, 2);
console.log('After removal:', months);
console.log('Removed:', removed);

// Replace element at index 3 (original array is now ['Jan','Apr','May'] after removal)
months.splice(3, 1, 'Jun');
console.log('After replacement:', months);

// Insert two months at index 2 without deleting
months.splice(2, 0, 'New1', 'New2');
console.log('After insertion:', months);
