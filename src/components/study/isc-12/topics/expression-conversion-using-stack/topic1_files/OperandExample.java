// OperandExample.java
// Demonstrates different kinds of operands in Java.

public class OperandExample {
    public static void main(String[] args) {
        // Literal operands
        int a = 10;
        double b = 3.5;

        // Variable operands
        int sum = a + 15;        // 'a' and 15 are operands
        double product = b * 2.0; // 'b' and 2.0 are operands

        // Sub-expression as operand
        int result = (a + 5) * 2; // (a + 5) is an operand for the multiplication

        // Boolean operand (literal)
        boolean isAdult = true;
        boolean canVote = isAdult && (a >= 18); // 'isAdult' and (a >= 18) are operands

        // Method call as operand
        double max = Math.max(a, 20); // Math.max(a,20) is an expression that returns a value

        System.out.println("Sum: " + sum);
        System.out.println("Product: " + product);
        System.out.println("Result: " + result);
        System.out.println("Can vote? " + canVote);
        System.out.println("Max: " + max);
    }
}