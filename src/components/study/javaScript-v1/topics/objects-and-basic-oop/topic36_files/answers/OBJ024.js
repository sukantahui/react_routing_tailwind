// ES6 Class Syntax
class Circle {
    constructor(radius) {
        this.radius = radius;
    }

    // Instance method
    area() {
        return Math.PI * this.radius ** 2;
    }

    // Static method
    static describe() {
        return 'A circle is a shape with all points equidistant from center.';
    }
}

const c = new Circle(5);
console.log('Radius:', c.radius);
console.log('Area:', c.area());
console.log('Static:', Circle.describe());

// Instance method not available on class
// Circle.area(); // TypeError
