// Simulate an asynchronous operation, like fetching data
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true; // change to false to test rejection
    if (success) {
      resolve("Data received from server");
    } else {
      reject("Network error");
    }
  }, 1000);
});

console.log("Start: requesting data...");

fetchData
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

console.log("End: request initiated (non-blocking)");