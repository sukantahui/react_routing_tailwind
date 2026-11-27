// Topic 5: Math.round(x) - Nearest Integer Rounding in ICSE Class 9
// Demonstrates overloaded signatures (int for float, long for double), half-round rules

public class MathRoundDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE Class 9: Math.round(x) Demonstration ===");

        // 1. FUNDAMENTAL BOARD EXAM RULE: Return type is INTEGER (int or long)!
        // Math.round does NOT return a double!
        long r1 = Math.round(5.4); // 5 (type long)
        long r2 = Math.round(5.5); // 6 (type long)
        long r3 = Math.round(5.6); // 6 (type long)
        System.out.println("Math.round(5.4) = " + r1); // 5
        System.out.println("Math.round(5.5) = " + r2); // 6
        System.out.println("Math.round(5.6) = " + r3); // 6

        // 2. Overloaded signature for float input returns INT:
        float fVal = 8.5f;
        int rFloat = Math.round(fVal); // returns int
        System.out.println("Math.round(8.5f) = " + rFloat); // 9

        // 3. CRITICAL ICSE TRAP: Rounding Negative Numbers!
        // Formula: floor(x + 0.5)
        // For -5.5: floor(-5.5 + 0.5) = floor(-5.0) = -5!
        // For -5.6: floor(-5.6 + 0.5) = floor(-5.1) = -6!
        long rNeg1 = Math.round(-5.4);
        long rNeg2 = Math.round(-5.5);
        long rNeg3 = Math.round(-5.6);
        System.out.println("Math.round(-5.4) = " + rNeg1); // -5
        System.out.println("Math.round(-5.5) = " + rNeg2); // -5 (NOT -6!)
        System.out.println("Math.round(-5.6) = " + rNeg3); // -6

        // 4. Comparison summary on -4.5:
        System.out.println("--- Summary for -4.5 ---");
        System.out.println("Math.ceil(-4.5)  = " + Math.ceil(-4.5));  // -4.0 (double)
        System.out.println("Math.floor(-4.5) = " + Math.floor(-4.5)); // -5.0 (double)
        System.out.println("Math.round(-4.5) = " + Math.round(-4.5)); // -4   (long)
    }
}
