/**
 * Naive Recursive Fibonacci
 * Recurrence: T(n) = T(n-1) + T(n-2) + O(1), T(0)=T(1)=O(1)
 * Time Complexity: O(2ⁿ)
 * Space Complexity: O(n) — recursion stack depth = n
 * 
 * This is the classic example of exponential time due to overlapping subproblems.
 */
public class RecursiveFibonacci {
    private static long callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int n = 10;

        callCount = 0;
        maxDepth = 0;
        long result = fib(n);

        System.out.println("Naive Recursive Fibonacci");
        System.out.println("fib(" + n + ") = " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Expected calls for n=10: " + (fibCalls(n)));
        System.out.println("Time: O(2ⁿ), Space: O(n)");

        // Show the explosion in calls
        System.out.println("\nCall counts for different n:");
        for (int i = 1; i <= 15; i++) {
            callCount = 0;
            fib(i);
            System.out.println("fib(" + i + ") → " + callCount + " calls (≈ 2^" + i + " = " + (int)Math.pow(2, i) + ")");
        }
        System.out.println("\nFor n=40, calls ≈ 2^40 = 1,099,511,627,776 — impossible!");
        System.out.println("This is why naive Fibonacci is O(2ⁿ) and impractical for large n.");
    }

    // Naive recursive Fibonacci
    public static long fib(int n) {
        callCount++;
        depth++;

        if (depth > maxDepth) maxDepth = depth;

        // Base cases
        if (n <= 1) {
            depth--;
            return n;
        }

        // Recursive case: two branches
        long result = fib(n - 1) + fib(n - 2);
        depth--;
        return result;
    }

    private static int depth = 0;

    // Calculate expected number of calls for fib(n)
    public static long fibCalls(int n) {
        if (n <= 1) return 1; // base case call
        return 1 + fibCalls(n - 1) + fibCalls(n - 2);
    }
}