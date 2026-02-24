// Reusing the same promise‑returning functions from promise_chain.js
// (Assume validateUser, fetchPosts, countPosts are defined as above)

async function displayPostCount(userId) {
  try {
    const user = await validateUser(userId);
    const posts = await fetchPosts(user);
    const count = await countPosts(posts);
    console.log(`Total posts: ${count}`);
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

console.log("Calling async function...");
displayPostCount(101);
console.log("Async function is running in background.");