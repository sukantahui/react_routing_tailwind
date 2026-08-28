// Project: find() and findIndex()
// Description: Locate a student by ID using find, and find the index of a task by title.


const students = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' }
];
const student = students.find(s => s.id === 2);
console.log('Found:', student);
const index = students.findIndex(s => s.name === 'Charlie');
console.log('Index of Charlie:', index);

