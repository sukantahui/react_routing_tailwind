// Topic 7: Math.max(a, b) - Maximum Value Method in ICSE Class 9
// Demonstrates method overloading, nested calls for 3 numbers, and mixed-type promotion

public class MathMaxDemo {
    public static void main(String[] args) {
        System.out.println("=== ICSE Class 9: Math.max(a, b) Demonstration ===");

        // 1. Two integer values (returns INT)
        int m1 = Math.max(15, 28);
        System.out.println("Math.max(15, 28)     = " + m1); // 28 (type int)

        // 2. Negative numbers (greater number is less negative)
        int mNeg = Math.max(-15, -28);
        System.out.println("Math.max(-15, -28)   = " + mNeg); // -15 (type int)

        // 3. Two double values (returns DOUBLE)
        double d1 = Math.max(12.75, 12.85);
        System.out.println("Math.max(12.75, 12.85)= " + d1); // 12.85 (type double)

        // 4. Mixed types: int and double (widens to DOUBLE)
        double mixed = Math.max(10, 8.5);
        System.out.println("Math.max(10, 8.5)    = " + mixed); // 10.0 (Note: double 10.0!)

        // 5. Classic ICSE Program: Finding maximum of THREE numbers using nested calls
        int a = 45, b = 82, c = 63;
        int maxOfThree = Math.max(a, Math.max(b, c));
        System.out.println("Max of 45, 82, 63    = " + maxOfThree); // 82

        // 6. Finding maximum of FOUR numbers
        int maxOfFour = Math.max(Math.max(a, b), Math.max(c, 99));
        System.out.println("Max of 45, 82, 63, 99= " + maxOfFour); // 99
    }
}
