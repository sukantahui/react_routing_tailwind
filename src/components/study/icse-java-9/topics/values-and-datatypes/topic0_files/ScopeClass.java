// topic0_files/ScopeClass.java
// Demonstrates class (instance) and static variable scope

public class ScopeClass {
    // Instance variable - accessible throughout the class via 'this'
    private int instanceVar = 10;

    // Static variable - one copy shared across all instances
    private static int staticVar = 100;

    public void display() {
        // Can access both instance and static variables directly
        System.out.println("Instance var: " + instanceVar);
        System.out.println("Static var: " + staticVar);
    }

    public static void staticMethod() {
        // Static methods cannot access instance variables directly
        // System.out.println(instanceVar); // ERROR
        System.out.println("Static var inside static method: " + staticVar);
    }

    public static void main(String[] args) {
        ScopeClass obj1 = new ScopeClass();
        ScopeClass obj2 = new ScopeClass();

        obj1.instanceVar = 20;   // changes only for obj1
        staticVar = 200;          // changes for all instances

        obj1.display();  // instanceVar=20, staticVar=200
        obj2.display();  // instanceVar=10, staticVar=200
    }
}