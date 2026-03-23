// Project: Advanced: The This Keyword Inside Objects (Beginner-Friendly)
// Description: This project demonstrates advanced: the this keyword inside objects (beginner-friendly) in JavaScript.


const obj = {
    name: 'Object',
    regularMethod() {
        console.log('regularMethod this:', this.name);
    },
    arrowMethod: () => {
        console.log('arrowMethod this:', this.name);
    }
};
obj.regularMethod(); // 'Object'
obj.arrowMethod();   // undefined (or window)

