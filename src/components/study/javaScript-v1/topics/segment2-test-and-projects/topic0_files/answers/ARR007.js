// Project: some() and every()
// Description: Check if any product has rating > 4.5 and if all tasks are completed.


const tasks = [
    { title: 'Task 1', completed: true },
    { title: 'Task 2', completed: false },
    { title: 'Task 3', completed: true }
];
const allDone = tasks.every(t => t.completed);
const anyDone = tasks.some(t => t.completed);
console.log('All completed?', allDone);
console.log('Any completed?', anyDone);

