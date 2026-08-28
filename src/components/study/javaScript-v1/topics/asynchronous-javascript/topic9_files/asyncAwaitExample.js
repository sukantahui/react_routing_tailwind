// asyncAwaitExample.js – Using async/await
function getUser(id) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id, name: 'Abhronila' }), 100);
  });
}

function getPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(['Post X', 'Post Y']), 100);
  });
}

async function displayUserPosts(userId) {
  try {
    const user = await getUser(userId);
    const posts = await getPosts(user.id);
    console.log(`${user.name}'s posts:`, posts);
  } catch (error) {
    console.error('Failed:', error);
  }
}

displayUserPosts(3);