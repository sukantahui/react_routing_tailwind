// Topic 1: Math.sqrt(x) - Square Root Calculation in ICSE Class 9
// Demonstrates signature, return type (always double), NaN for negative values, and casting

public class MathSqrtDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE Class 9: Math.sqrt(x) Demonstration ===");

        // 1. Basic square root of perfect squares
        double s1 = Math.sqrt(25.0);
        double s2 = Math.sqrt(49);
        System.out.println("Math.sqrt(25.0) = " + s1); // 5.0
        System.out.println("Math.sqrt(49)   = " + s2); // 7.0 (Note: NOT integer 7)

        // 2. Non-perfect square (irrational result)
        double s3 = Math.sqrt(2);
        System.out.println("Math.sqrt(2)    = " + s3); // 1.4142135623730951

        // 3. Square root of zero and one
        System.out.println("Math.sqrt(0)    = " + Math.sqrt(0)); // 0.0
        System.out.println("Math.sqrt(1)    = " + Math.sqrt(1)); // 1.0

        // 4. CRITICAL ICSE TRAP: Square root of a negative number
        // Does NOT throw ArithmeticException! Returns Double.NaN
        double negRoot = Math.sqrt(-16);
        System.out.println("Math.sqrt(-16)  = " + negRoot); // NaN

        // 5. Pythagorean Theorem: Hypotenuse c = sqrt(a^2 + b^2)
        double a = 3.0, b = 4.0;
        double hyp = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
        System.out.println("Hypotenuse (3, 4) = " + hyp); // 5.0

        // 6. Explicit casting to store in integer
        int intRoot = (int) Math.sqrt(64);
        System.out.println("(int) Math.sqrt(64) = " + intRoot); // 8
    }
}
