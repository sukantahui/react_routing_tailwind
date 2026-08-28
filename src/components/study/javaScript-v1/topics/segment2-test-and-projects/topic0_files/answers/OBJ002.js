// Project: `this` in Methods
// Description: Define a method inside an object that uses `this` to access other properties.


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

