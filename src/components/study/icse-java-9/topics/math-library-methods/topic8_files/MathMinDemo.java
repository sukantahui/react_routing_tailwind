// Topic 8: Math.min(a, b) - Minimum Value Method in ICSE Class 9
// Demonstrates method overloading, nested calls for 3 numbers, and mixed-type promotion

public class MathMinDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE Class 9: Math.min(a, b) Demonstration ===");

        // 1. Two integer values (returns INT)
        int min1 = Math.min(15, 28);
        System.out.println("Math.min(15, 28)     = " + min1); // 15 (type int)

        // 2. Negative numbers (smaller number is more negative)
        int minNeg = Math.min(-15, -28);
        System.out.println("Math.min(-15, -28)   = " + minNeg); // -28 (type int)

        // 3. Two double values (returns DOUBLE)
        double dMin = Math.min(12.75, 12.85);
        System.out.println("Math.min(12.75, 12.85)= " + dMin); // 12.75 (type double)

        // 4. Mixed types: int and double (widens to DOUBLE)
        double mixedMin = Math.min(10, 8.5);
        System.out.println("Math.min(10, 8.5)    = " + mixedMin); // 8.5 (type double)

        // 5. Classic ICSE Program: Finding minimum of THREE numbers using nested calls
        int a = 45, b = 18, c = 63;
        int minOfThree = Math.min(a, Math.min(b, c));
        System.out.println("Min of 45, 18, 63    = " + minOfThree); // 18

        // 6. Minimum of FOUR numbers
        int minOfFour = Math.min(Math.min(a, b), Math.min(c, 7));
        System.out.println("Min of 45, 18, 63, 7 = " + minOfFour); // 7
    }
}
