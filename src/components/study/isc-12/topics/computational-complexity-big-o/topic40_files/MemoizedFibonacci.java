/**
 * Memoized Recursive Fibonacci
 * Time Complexity: O(n) — each value computed once
 * Space Complexity: O(n) — memo array + recursion stack
 * 
 * Memoization eliminates overlapping subproblems, reducing exponential to linear.
 */
public class MemoizedFibonacci {
    private static long callCount = 0;
    private static int maxDepth = 0;

    public static void main(String[] args) {
        int n = 40;

        callCount = 0;
        maxDepth = 0;
        long[] memo = new long[n + 1];
        // Initialize memo with -1 (since Fibonacci numbers are non-negative)
        for (int i = 0; i <= n; i++) memo[i] = -1;
        long result = fibMemo(n, memo);

        System.out.println("Memoized Recursive Fibonacci");
        System.out.println("fib(" + n + ") = " + result);
        System.out.println("Number of recursive calls: " + callCount);
        System.out.println("Maximum recursion depth: " + maxDepth);
        System.out.println("Expected calls for n=" + n + ": " + (n + 1) + " (each value once)");
        System.out.println("Time: O(n), Space: O(n)");

        // Compare with naive
        System.out.println("\nComparison for n=30:");
        int n2 = 30;
        long[] memo2 = new long[n2 + 1];
        for (int i = 0; i <= n2; i++) memo2[i] = -1;
        callCount = 0;
        fibMemo(n2, memo2);
        System.out.println("Memoized calls: " + callCount);
        System.out.println("Naive calls would be ≈ " + (int)Math.pow(2, n2) + " (which is impossible to run)");
        System.out.println("Memoization reduces O(2ⁿ) to O(n)!");
    }

    // Memoized recursive Fibonacci
    public static long fibMemo(int n, long[] memo) {
        callCount++;
        depth++;

        if (depth > maxDepth) maxDepth = depth;

        // Check if already computed
        if (memo[n] != -1) {
            depth--;
            return memo[n];
        }

        // Base cases
        if (n <= 1) {
            memo[n] = n;
            depth--;
            return n;
        }

        // Compute and store in memo
        memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
        depth--;
        return memo[n];
    }

    private static int depth = 0;
}