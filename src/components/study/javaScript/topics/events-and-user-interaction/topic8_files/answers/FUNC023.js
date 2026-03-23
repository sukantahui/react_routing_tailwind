// Async Functions (Promise basics)
async function fetchData() {
    return new Promise(resolve => {
        setTimeout(() => resolve('Data received'), 1000);
    });
}

async function displayData() {
    const data = await fetchData();
    console.log(data);
}

displayData(); // Data received after 1 second
