// Project: Optional Chaining and Nullish Coalescing
// Description: Access nested properties safely and provide default values.


const user = {
    name: 'Alice',
    address: {
        city: 'New York'
    }
};
console.log(user?.address?.city); // 'New York'
console.log(user?.contact?.phone); // undefined
// Nullish coalescing
const phone = user?.contact?.phone ?? 'No phone';
console.log(phone);

