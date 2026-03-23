// Project: While Loop – Password Guesser
// Description: Simulate a simple password guesser using a while loop that breaks when correct.


// Simulated password guesser (using confirm to avoid prompt spam)
let password = 'secret';
let guess = '';
while (guess !== password) {
    guess = prompt('Enter password:');
    if (guess === null) break;
}
if (guess === password) alert('Access granted!');

