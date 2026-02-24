// promiseIntro.js – Using Promises
function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (id > 0) resolve({ id, name: 'Tuhina' });
      else reject('Invalid ID');
    }, 100);
  });
}

function getPosts(userId) {
  return new Promise(resolve => {
    setTimeout(() => resolve(['Post A', 'Post B']), 100);
  });
}

// Chain with .then()
getUser(5)
  .then(user => getPosts(user.id))
  .then(posts => console.log('Posts:', posts))
  .catch(err => console.error('Error:', err));