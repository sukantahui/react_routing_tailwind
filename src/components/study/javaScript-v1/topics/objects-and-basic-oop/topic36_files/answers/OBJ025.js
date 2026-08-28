// Class Inheritance using extends
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }

    area() {
        return this.width * this.height;
    }
}

class Square extends Rectangle {
    constructor(side) {
        super(side, side);
    }
}

const sq = new Square(4);
console.log('Square area:', sq.area()); // 16
console.log('sq instanceof Square:', sq instanceof Square);
console.log('sq instanceof Rectangle:', sq instanceof Rectangle);
