// Topic 2: Math.cbrt(x) - Cube Root Calculation in ICSE Class 9
// Demonstrates signature, return type (double), handling of negative values, and casting

public class MathCbrtDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE Class 9: Math.cbrt(x) Demonstration ===");

        // 1. Cube root of perfect positive cubes
        double c1 = Math.cbrt(27.0);
        double c2 = Math.cbrt(125);
        System.out.println("Math.cbrt(27.0) = " + c1); // 3.0
        System.out.println("Math.cbrt(125)  = " + c2); // 5.0 (Note: NOT integer 5)

        // 2. CRUCIAL ICSE DISTINCTION FROM Math.sqrt():
        // Cube root of negative numbers is VALID and REAL! It does NOT return NaN!
        double cNeg1 = Math.cbrt(-8.0);
        double cNeg2 = Math.cbrt(-64);
        System.out.println("Math.cbrt(-8.0) = " + cNeg1); // -2.0 (NOT NaN!)
        System.out.println("Math.cbrt(-64)  = " + cNeg2); // -4.0

        // 3. Cube root of zero and one
        System.out.println("Math.cbrt(0)    = " + Math.cbrt(0)); // 0.0
        System.out.println("Math.cbrt(1)    = " + Math.cbrt(1)); // 1.0

        // 4. Calculating side of a cube from volume V
        double volume = 216.0;
        double side = Math.cbrt(volume);
        System.out.println("Cube Side for Volume 216 = " + side); // 6.0

        // 5. Explicit casting to int
        int intCbrt = (int) Math.cbrt(1000);
        System.out.println("(int) Math.cbrt(1000)   = " + intCbrt); // 10
    }
}
