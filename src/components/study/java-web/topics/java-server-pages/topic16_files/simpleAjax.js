// Modern fetch API example
async function fetchData() {
    try {
        const response = await fetch('DataServlet?name=Swadeep');
        const data = await response.text();
        document.getElementById('result').innerHTML = data;
    } catch (error) {
        console.error('Error:', error);
    }
}