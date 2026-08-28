// Step 1: Validate user
function validateUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("1. User validated");
      resolve({ id: userId, name: "Swadeep" });
    }, 500);
  });
}

// Step 2: Fetch user's posts
function fetchPosts(user) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("2. Posts fetched for", user.name);
      resolve(["Post1", "Post2"]);
    }, 500);
  });
}

// Step 3: Count posts
function countPosts(posts) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("3. Counting posts...");
      resolve(posts.length);
    }, 500);
  });
}

// Chain them
validateUser(101)
  .then((user) => fetchPosts(user))
  .then((posts) => countPosts(posts))
  .then((count) => {
    console.log(`Total posts: ${count}`);
  })
  .catch((err) => console.error("Error:", err));