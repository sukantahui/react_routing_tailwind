// ConstructorChainDemo.java
class Vehicle {
    Vehicle() {
        System.out.println("Vehicle constructor - foundation");
    }
}

class Car extends Vehicle {
    Car() {
        // super() is automatically added here by compiler
        System.out.println("Car constructor - specific features");
    }
}

public class ConstructorChainDemo {
    public static void main(String[] args) {
        Car myCar = new Car();
        // Output:
        // Vehicle constructor - foundation
        // Car constructor - specific features
    }
}