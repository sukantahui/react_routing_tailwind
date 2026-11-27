// Topic 3: Math.ceil(x) - Ceiling Method in ICSE Class 9
// Demonstrates signature, return type (always double), rounding towards +Infinity

public class MathCeilDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE Class 9: Math.ceil(x) Demonstration ===");

        // 1. Positive numbers (rounds UP to next mathematical integer)
        double c1 = Math.ceil(4.2);
        double c2 = Math.ceil(4.8);
        double c3 = Math.ceil(4.0);
        System.out.println("Math.ceil(4.2) = " + c1); // 5.0 (NOT 5)
        System.out.println("Math.ceil(4.8) = " + c2); // 5.0
        System.out.println("Math.ceil(4.0) = " + c3); // 4.0 (Exact integer stays same)

        // 2. CRITICAL BOARD EXAM TRAP: Negative numbers!
        // Ceil rounds towards +Infinity (greater value, to the right on number line)
        double cNeg1 = Math.ceil(-4.2);
        double cNeg2 = Math.ceil(-4.8);
        double cNeg3 = Math.ceil(-4.0);
        System.out.println("Math.ceil(-4.2) = " + cNeg1); // -4.0 (NOT -5.0!)
        System.out.println("Math.ceil(-4.8) = " + cNeg2); // -4.0 (NOT -5.0!)
        System.out.println("Math.ceil(-4.0) = " + cNeg3); // -4.0

        // 3. Zero and fractions between 0 and 1
        System.out.println("Math.ceil(0.0)  = " + Math.ceil(0.0));  // 0.0
        System.out.println("Math.ceil(0.1)  = " + Math.ceil(0.1));  // 1.0
        System.out.println("Math.ceil(-0.8) = " + Math.ceil(-0.8)); // -0.0

        // 4. Practical ICSE Problem: Packaging items into boxes
        // If 25 students need cars carrying 4 each, how many cars are needed?
        int totalStudents = 25;
        int carCapacity = 4;
        int carsNeeded = (int) Math.ceil((double) totalStudents / carCapacity);
        System.out.println("Cars needed for 25 students = " + carsNeeded); // 7 cars
    }
}
