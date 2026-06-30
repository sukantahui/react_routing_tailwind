// AssociativityExample.java
// Demonstrates operator associativity in Java.

public class AssociativityExample {
    public static void main(String[] args) {
        // Example 1: Left‑associative subtraction
        int a = 10, b = 3, c = 2;
        int leftAssoc = a - b - c; // (10 - 3) - 2 = 5
        int withParens = (a - b) - c; // same
        int rightAssoc = a - (b - c); // 10 - (3 - 2) = 9
        System.out.println("a - b - c = " + leftAssoc);
        System.out.println("(a - b) - c = " + withParens);
        System.out.println("a - (b - c) = " + rightAssoc);

        // Example 2: Left‑associative division and multiplication
        int d = 16, e = 4, f = 2;
        int chain = d / e * f; // (16 / 4) * 2 = 8
        int chainParens = (d / e) * f; // same
        int chainRight = d / (e * f); // 16 / (4 * 2) = 2
        System.out.println("\nd / e * f = " + chain);
        System.out.println("(d / e) * f = " + chainParens);
        System.out.println("d / (e * f) = " + chainRight);

        // Example 3: Right‑associative assignment
        int x, y, z;
        x = y = z = 5; // right‑associative: z=5, y=z, x=y
        System.out.println("\nAfter x = y = z = 5:");
        System.out.println("x = " + x + ", y = " + y + ", z = " + z);

        // Example 4: Right‑associative ternary
        int age = 20;
        String result = age > 18 ? "Adult" : age > 12 ? "Teen" : "Child";
        // Is parsed as: age > 18 ? "Adult" : (age > 12 ? "Teen" : "Child")
        System.out.println("\nTernary result: " + result);
    }
}