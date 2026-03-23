// Project: Advanced: The This Keyword (Beginner-Level Understanding)
// Description: This project demonstrates advanced: the this keyword (beginner-level understanding) in JavaScript.


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

