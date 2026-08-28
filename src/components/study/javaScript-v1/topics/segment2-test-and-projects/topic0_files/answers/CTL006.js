// Project: Do‑While – Menu
// Description: Display a menu at least once and repeat until user selects exit.


// Menu simulation using confirm
let choice;
do {
    choice = confirm('Click OK to continue, Cancel to exit.');
} while (choice);
console.log('Exited.');

