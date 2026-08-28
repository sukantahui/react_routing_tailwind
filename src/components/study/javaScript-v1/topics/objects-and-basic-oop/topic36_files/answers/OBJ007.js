// Arrow vs Normal Functions: this
const counter = {
    count: 0,
    normalMethod() {
        this.count++;
        console.log('normalMethod count:', this.count);
    },
    arrowMethod: () => {
        // Arrow functions don't have their own this; they inherit from outer scope.
        // Here, outer scope is global (or module). So this.count is undefined.
        console.log('arrowMethod this:', this);
        // this.count would be undefined, so can't increment.
    }
};

counter.normalMethod(); // count becomes 1
counter.arrowMethod();   // logs global object (or undefined in strict mode)
