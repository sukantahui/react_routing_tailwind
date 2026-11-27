// Topic 0: Math.pow(x, y) - Exponentiation in ICSE Class 9
// Demonstrates signature, return type (always double), edge cases, and casting

public class MathPowDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE Class 9: Math.pow(x, y) Demonstration ===");

        // 1. Basic power calculation
        double res1 = Math.pow(2.0, 3.0);
        System.out.println("Math.pow(2.0, 3.0) = " + res1); // 8.0

        // 2. Passing integer arguments (implicit widening to double)
        double res2 = Math.pow(5, 2);
        System.out.println("Math.pow(5, 2)     = " + res2); // 25.0 (Note: NOT integer 25)

        // 3. Negative base with even and odd powers
        double evenPower = Math.pow(-3, 2);
        double oddPower  = Math.pow(-3, 3);
        System.out.println("Math.pow(-3, 2)    = " + evenPower); // 9.0
        System.out.println("Math.pow(-3, 3)    = " + oddPower);  // -27.0

        // 4. Fractional and zero exponents
        double zeroExp   = Math.pow(7, 0);
        double fractional = Math.pow(16, 0.5); // Equivalent to square root
        System.out.println("Math.pow(7, 0)     = " + zeroExp);   // 1.0
        System.out.println("Math.pow(16, 0.5)  = " + fractional); // 4.0

        // 5. Negative exponent
        double negExp = Math.pow(2, -3);
        System.out.println("Math.pow(2, -3)    = " + negExp); // 0.125 (1 / 8.0)

        // 6. Mandatory explicit type casting to int
        // int p = Math.pow(2, 3); // COMPILE ERROR: possible loss of precision
        int intPower = (int) Math.pow(2, 3);
        System.out.println("(int) Math.pow(2, 3) = " + intPower); // 8
    }
}
