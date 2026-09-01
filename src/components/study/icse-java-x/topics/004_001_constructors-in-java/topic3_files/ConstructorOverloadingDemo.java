/**
 * ICSE Class 10 Computer Applications - Module 004_001 Topic 3
 * Constructor Overloading (Compile-Time Polymorphism)
 *
 * Demonstrates:
 * 1. Defining multiple constructors in the same class with different parameter signatures.
 * 2. Creating a Rectangle class with:
 *    - Non-parameterized constructor (Default 0x0)
 *    - 1-parameter constructor (Square)
 *    - 2-parameter constructor (Custom Rectangle)
 *
 * @author Sukanta Hui - Coder & AccoTax
 */
public class ConstructorOverloadingDemo {

    private double length;
    private double breadth;

    // Constructor 1: Default / Non-parameterized
    public ConstructorOverloadingDemo() {
        System.out.println(">>> [Constructor 1] Default 0x0 Shape Created");
        this.length = 0.0;
        this.breadth = 0.0;
    }

    // Constructor 2: Overloaded (1 Parameter - Square)
    public ConstructorOverloadingDemo(double side) {
        System.out.println(">>> [Constructor 2] Square (" + side + " x " + side + ") Created");
        this.length = side;
        this.breadth = side;
    }

    // Constructor 3: Overloaded (2 Parameters - Custom Rectangle)
    public ConstructorOverloadingDemo(double length, double breadth) {
        System.out.println(">>> [Constructor 3] Rectangle (" + length + " x " + breadth + ") Created");
        this.length = length;
        this.breadth = breadth;
    }

    // Calculate Area
    public double calculateArea() {
        return this.length * this.breadth;
    }

    public static void main(String[] args) {
        System.out.println("--- Instantiating Overloaded Constructors ---");

        // Invokes Constructor 1
        ConstructorOverloadingDemo shape1 = new ConstructorOverloadingDemo();
        System.out.println("Shape 1 Area: " + shape1.calculateArea());

        // Invokes Constructor 2
        ConstructorOverloadingDemo shape2 = new ConstructorOverloadingDemo(5.0);
        System.out.println("Shape 2 Area: " + shape2.calculateArea());

        // Invokes Constructor 3
        ConstructorOverloadingDemo shape3 = new ConstructorOverloadingDemo(8.0, 4.0);
        System.out.println("Shape 3 Area: " + shape3.calculateArea());
    }
}
