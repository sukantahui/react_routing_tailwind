// promiseExample.js
function fetchUserData(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: 'Swadeep', city: 'Ichapur' });
      } else {
        reject('Invalid user ID');
      }
    }, 1000);
  });
}

fetchUserData(101)
  .then(user => console.log('User:', user))
  .catch(err => console.error('Error:', err));