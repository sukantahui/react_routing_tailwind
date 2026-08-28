// callbackHell.js – The Pyramid of Doom
function getUser(id, callback) {
  setTimeout(() => {
    callback(null, { id, name: 'Swadeep' });
  }, 100);
}

function getPosts(userId, callback) {
  setTimeout(() => {
    callback(null, ['Post1', 'Post2']);
  }, 100);
}

function getComments(postId, callback) {
  setTimeout(() => {
    callback(null, ['Great!', 'Nice post']);
  }, 100);
}

// Nested callbacks – hard to read and maintain
getUser(1, (err, user) => {
  if (err) console.error(err);
  else {
    getPosts(user.id, (err, posts) => {
      if (err) console.error(err);
      else {
        getComments(posts[0], (err, comments) => {
          if (err) console.error(err);
          else {
            console.log('Comments:', comments);
          }
        });
      }
    });
  }
});