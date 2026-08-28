// super Keyword and Method Overriding
class Vehicle {
    constructor(brand) {
        this.brand = brand;
    }

    start() {
        return `${this.brand} vehicle started.`;
    }
}

class Car extends Vehicle {
    constructor(brand, model) {
        super(brand); // call parent constructor
        this.model = model;
    }

    start() {
        // Override method but also call parent
        return super.start() + ` It's a ${this.model}.`;
    }
}

const myCar = new Car('Toyota', 'Camry');
console.log(myCar.start()); // Toyota vehicle started. It's a Camry.
