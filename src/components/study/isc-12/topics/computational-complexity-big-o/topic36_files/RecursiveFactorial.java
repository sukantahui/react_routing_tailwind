/**
 * Recursive Factorial
 * Recurrence: T(n) = T(n-1) + O(1), T(0) = O(1)
 * Time Complexity: O(n)
 * Space Complexity: O(n) — recursion stack depth = n
 */
public class RecursiveFactorial {
    private static int callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int n = 10;

        callCount = 0;
        maxDepth = 0;
        long result = factorial(n);

        System.out.println("Recursive Factorial");
        System.out.println("n = " + n);
        System.out.println("n! = " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Time: O(n), Space: O(n)");

        // Show overflow
        System.out.println("\nFactorial values (long):");
        for (int i = 1; i <= 25; i++) {
            callCount = 0;
            maxDepth = 0;
            long val = factorial(i);
            System.out.println(i + "! = " + val);
            if (val < 0) {
                System.out.println("  Overflow at " + i + "! (long overflow)");
                break;
            }
        }
        System.out.println("\nNotice the overflow after 20! (2^63-1 ≈ 9.22e18).");
        System.out.println("Use BigInteger for larger values.");
    }

    public static long factorial(int n) {
        callCount++;
        depth++;

        if (depth > maxDepth) maxDepth = depth;

        // Base case
        if (n <= 1) {
            depth--;
            return 1;
        }

        // Recursive case: T(n) = T(n-1) + O(1)
        long result = n * factorial(n - 1);
        depth--;
        return result;
    }

    private static int depth = 0;
}