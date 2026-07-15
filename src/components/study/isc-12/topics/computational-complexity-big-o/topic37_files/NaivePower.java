/**
 * Naive Power Function
 * Recurrence: T(n) = T(n-1) + O(1), T(0) = O(1)
 * Time Complexity: O(n)
 * Space Complexity: O(n) — recursion stack depth = n
 * 
 * Note: This is the simplest but slowest implementation.
 * For large exponents, use fast power (O(log n)).
 */
public class NaivePower {
    private static int callCount = 0;

    public static void main(String[] args) {
        int base = 2;
        int exp = 10;

        callCount = 0;
        long result = naivePower(base, exp);

        System.out.println("Naive Power");
        System.out.println(base + "^" + exp + " = " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Time: O(n), Space: O(n)");

        // Show steps for different exponents
        System.out.println("\nSteps for different exponents:");
        for (int e : new int[]{1, 2, 4, 8, 16, 32}) {
            callCount = 0;
            naivePower(base, e);
            System.out.println("exp = " + e + " → " + callCount + " calls");
        }
        System.out.println("Notice: steps = exp + 1 (linear growth).");
    }

    public static long naivePower(int base, int exp) {
        callCount++;

        // Base case: any number to power 0 is 1
        if (exp == 0) {
            return 1;
        }

        // Recursive case: T(n) = T(n-1) + O(1)
        return base * naivePower(base, exp - 1);
    }
}