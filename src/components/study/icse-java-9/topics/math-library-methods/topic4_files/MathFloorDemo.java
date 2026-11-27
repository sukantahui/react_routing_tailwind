// Topic 4: Math.floor(x) - Floor Method in ICSE Class 9
// Demonstrates signature, return type (always double), rounding towards -Infinity

public class MathFloorDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE Class 9: Math.floor(x) Demonstration ===");

        // 1. Positive numbers (rounds DOWN to previous mathematical integer)
        double f1 = Math.floor(4.8);
        double f2 = Math.floor(4.2);
        double f3 = Math.floor(4.0);
        System.out.println("Math.floor(4.8) = " + f1); // 4.0 (NOT 4)
        System.out.println("Math.floor(4.2) = " + f2); // 4.0
        System.out.println("Math.floor(4.0) = " + f3); // 4.0 (Exact integer stays same)

        // 2. CRITICAL BOARD EXAM TRAP: Negative numbers!
        // Floor rounds towards -Infinity (smaller value, to the left on number line)
        double fNeg1 = Math.floor(-4.2);
        double fNeg2 = Math.floor(-4.8);
        double fNeg3 = Math.floor(-4.0);
        System.out.println("Math.floor(-4.2) = " + fNeg1); // -5.0 (NOT -4.0!)
        System.out.println("Math.floor(-4.8) = " + fNeg2); // -5.0 (NOT -4.0!)
        System.out.println("Math.floor(-4.0) = " + fNeg3); // -4.0

        // 3. Comparison of ceil and floor on the same negative input
        double num = -6.4;
        System.out.println("Math.ceil(" + num + ")  = " + Math.ceil(num));  // -6.0
        System.out.println("Math.floor(" + num + ") = " + Math.floor(num)); // -7.0

        // 4. Fractions between 0 and 1
        System.out.println("Math.floor(0.9)  = " + Math.floor(0.9));  // 0.0
        System.out.println("Math.floor(-0.1) = " + Math.floor(-0.1)); // -1.0
    }
}
