// OperatorExample.java
// Demonstrates different categories of operators in Java.

public class OperatorExample {
    public static void main(String[] args) {
        // Arithmetic operators
        int a = 10, b = 3;
        int sum = a + b;
        int diff = a - b;
        int product = a * b;
        int quotient = a / b;      // integer division: 10/3 = 3
        int remainder = a % b;     // 10 % 3 = 1

        System.out.println("Arithmetic:");
        System.out.println("sum = " + sum + ", diff = " + diff + ", product = " + product);
        System.out.println("quotient = " + quotient + ", remainder = " + remainder);

        // Relational (comparison) operators
        boolean isGreater = a > b;
        boolean isEqual = a == b;
        boolean isNotEqual = a != b;

        System.out.println("\nRelational:");
        System.out.println("a > b? " + isGreater + ", a == b? " + isEqual + ", a != b? " + isNotEqual);

        // Logical operators
        boolean x = true, y = false;
        boolean andResult = x && y;
        boolean orResult = x || y;
        boolean notResult = !x;

        System.out.println("\nLogical:");
        System.out.println("x && y = " + andResult + ", x || y = " + orResult + ", !x = " + notResult);

        // Assignment operators
        int c = 5;
        c += 3;  // c = c + 3 → 8
        c *= 2;  // c = c * 2 → 16
        System.out.println("\nAssignment:");
        System.out.println("c after += and *= : " + c);

        // Unary operators
        int d = 5;
        int preIncrement = ++d;  // d becomes 6, preIncrement = 6
        int postIncrement = d++; // postIncrement = 6, d becomes 7
        System.out.println("\nUnary:");
        System.out.println("preIncrement = " + preIncrement + ", postIncrement = " + postIncrement + ", d = " + d);

        // Ternary operator
        int max = (a > b) ? a : b;
        System.out.println("\nTernary:");
        System.out.println("Max of a and b = " + max);
    }
}