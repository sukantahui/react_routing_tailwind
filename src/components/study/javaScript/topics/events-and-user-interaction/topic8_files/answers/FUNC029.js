// Error Handling in Functions (try/catch)
function safeParse(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.log('Parsing error:', error.message);
        return null;
    }
}

console.log(safeParse('{"name":"Alice"}')); // { name: 'Alice' }
console.log(safeParse('invalid json'));     // null
