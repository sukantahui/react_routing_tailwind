// Function that may reject
function riskyOperation(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject("Operation failed: something went wrong");
      } else {
        resolve("Operation succeeded!");
      }
    }, 500);
  });
}

// Handling with .catch()
riskyOperation(true)
  .then((result) => console.log("Result:", result))
  .catch((error) => console.error("Caught with .catch():", error));

// Handling with async/await and try/catch
async function runRisky() {
  try {
    const result = await riskyOperation(true);
    console.log("Async result:", result);
  } catch (error) {
    console.error("Caught with try/catch:", error);
  }
}

runRisky();