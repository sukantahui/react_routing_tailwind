// Topic 6: Math.abs(a) - Absolute Value Method in ICSE Class 9
// Demonstrates method overloading for int, long, float, double, and Integer.MIN_VALUE overflow

public class MathAbsDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE Class 9: Math.abs(a) Demonstration ===");

        // 1. Integer arguments (returns INT, no decimal point!)
        int a1 = Math.abs(-25);
        int a2 = Math.abs(25);
        System.out.println("Math.abs(-25)   = " + a1); // 25 (type int)
        System.out.println("Math.abs(25)    = " + a2); // 25

        // 2. Double arguments (returns DOUBLE with decimal point!)
        double d1 = Math.abs(-49.75);
        double d2 = Math.abs(49.75);
        System.out.println("Math.abs(-49.75)= " + d1); // 49.75 (type double)
        System.out.println("Math.abs(49.75) = " + d2); // 49.75

        // 3. Float and Long overloads
        float fVal = Math.abs(-3.14f);
        long lVal = Math.abs(-9876543210L);
        System.out.println("Math.abs(-3.14f)= " + fVal); // 3.14
        System.out.println("Math.abs(-long) = " + lVal); // 9876543210

        // 4. Zero input
        System.out.println("Math.abs(0)     = " + Math.abs(0));     // 0
        System.out.println("Math.abs(-0.0)  = " + Math.abs(-0.0));  // 0.0

        // 5. Practical ICSE use case: Distance between points |x1 - x2|
        int x1 = 12, x2 = 27;
        int distance = Math.abs(x1 - x2);
        System.out.println("Distance between 12 and 27 = " + distance); // 15

        // 6. ADVANCED BOARD TRAP: Integer.MIN_VALUE overflow
        // In 32-bit two's complement, -2147483648 has no positive int counterpart!
        System.out.println("Math.abs(Integer.MIN_VALUE) = " + Math.abs(Integer.MIN_VALUE)); // -2147483648
    }
}
