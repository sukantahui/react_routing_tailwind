/**
 * Fast Power Function (Exponentiation by Squaring)
 * Recurrence: T(n) = T(n/2) + O(1), T(0) = O(1)
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) — recursion stack depth = log₂(n)
 * 
 * This is significantly faster than naive power for large exponents.
 */
public class FastPower {
    private static int callCount = 0;

    public static void main(String[] args) {
        int base = 2;
        int exp = 10;

        callCount = 0;
        long result = fastPower(base, exp);

        System.out.println("Fast Power (Exponentiation by Squaring)");
        System.out.println(base + "^" + exp + " = " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Time: O(log n), Space: O(log n)");

        // Show steps for different exponents
        System.out.println("\nSteps for different exponents:");
        for (int e : new int[]{1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024}) {
            callCount = 0;
            fastPower(base, e);
            System.out.println("exp = " + e + " → " + callCount + " calls");
        }
        System.out.println("Notice: steps = floor(log₂(exp)) + 2 (logarithmic growth).");

        // Compare with naive power
        System.out.println("\nFor exp = 1,000,000:");
        System.out.println("Naive power: ~1,000,000 calls");
        System.out.println("Fast power: ~log₂(1,000,000) ≈ 20 calls");
        System.out.println("Fast power is ~50,000x faster!");
    }

    // Recursive fast power (exponentiation by squaring)
    public static long fastPower(int base, int exp) {
        callCount++;

        // Base case: any number to power 0 is 1
        if (exp == 0) {
            return 1;
        }

        // If exponent is even: (base^2)^(exp/2)
        if (exp % 2 == 0) {
            long half = fastPower(base, exp / 2);
            return half * half;
        }
        // If exponent is odd: base * (base^2)^((exp-1)/2)
        else {
            long half = fastPower(base, exp / 2);
            return base * half * half;
        }
    }

    // Iterative fast power (O(log n) time, O(1) space)
    public static long fastPowerIterative(int base, int exp) {
        long result = 1;
        long b = base;
        int e = exp;

        while (e > 0) {
            if ((e & 1) == 1) { // if e is odd
                result *= b;
            }
            b *= b; // square the base
            e >>= 1; // divide e by 2
        }
        return result;
    }
}