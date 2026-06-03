// topic0_files/ConstantDefinition.java
// Shows how to define and use constants (final variables)

public class ConstantDefinition {
    // Class-level constant (static final)
    public static final double PI = 3.14159265359;

    // Instance constant (final, initialized in constructor)
    private final int maxCapacity;

    public ConstantDefinition(int maxCapacity) {
        this.maxCapacity = maxCapacity; // blank final initialization
    }

    public static void main(String[] args) {
        // Local constant
        final int MAX_USERS = 100;

        // Using class constant
        System.out.println("PI value: " + PI);

        // Using local constant
        System.out.println("Max users allowed: " + MAX_USERS);

        // Uncommenting below would cause compilation error:
        // MAX_USERS = 200;

        ConstantDefinition obj = new ConstantDefinition(50);
        System.out.println("Object max capacity: " + obj.maxCapacity);
    }
}