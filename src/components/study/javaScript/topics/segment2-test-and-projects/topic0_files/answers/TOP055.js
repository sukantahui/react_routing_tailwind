// Project: Find() And Findindex() – Locating Complex Objects
// Description: This project demonstrates find() and findindex() – locating complex objects in JavaScript.


const students = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];
const student = students.find(s => s.id === 2);
console.log('Found:', student);
const index = students.findIndex(s => s.name === 'Charlie');
console.log('Index of Charlie:', index);

