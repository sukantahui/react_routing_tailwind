// Callback Functions
function processUserInput(callback) {
    const name = 'John';
    callback(name);
}

processUserInput(function(name) {
    console.log(`Hello, ${name}`);
});
